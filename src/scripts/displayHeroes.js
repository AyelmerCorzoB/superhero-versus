import { setupPagination } from "./paginationSystem.js";
import { openHeroModal } from "./modalSystem.js";

const HEROES_PER_PAGE = 8;
let currentHeroes = [];
let currentUniverse = "";

/**
 * Display heroes with pagination
 */
export const displayHeroes = (heroes, universeFilter = "", page = 1) => {
    console.log("Displaying heroes:", heroes.length, "for universe:", universeFilter);
    
    const battleArena = document.getElementById("battleArena");
    const heroContainer = document.getElementById("heroContainer");
    
    if (battleArena) battleArena.classList.add("hidden");
    if (heroContainer) heroContainer.classList.remove("hidden");

    // Si es búsqueda (universeFilter === 'all'), no filtrar
    const filteredHeroes = universeFilter && universeFilter !== "all"
        ? heroes.filter(hero => {
            const publisher = hero.biography?.publisher?.toLowerCase() || "";
            return publisher.includes(universeFilter.toLowerCase());
        })
        : heroes;

    console.log("Filtered heroes:", filteredHeroes.length);

    if (filteredHeroes.length === 0) {
        const heroContainerEl = document.getElementById("contenedorSuperHeroes");
        heroContainerEl.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-neutral-400 text-lg">No heroes found</p>
                <p class="text-neutral-500 text-sm mt-2">Try another search or universe</p>
            </div>
        `;
        setupPagination(1, 1, () => {});
        return;
    }

    currentHeroes = filteredHeroes;
    currentUniverse = universeFilter;

    const totalPages = Math.ceil(filteredHeroes.length / HEROES_PER_PAGE);
    const startIndex = (page - 1) * HEROES_PER_PAGE;
    const heroesOnPage = filteredHeroes.slice(startIndex, startIndex + HEROES_PER_PAGE);

    const heroContainerEl = document.getElementById("contenedorSuperHeroes");
    heroContainerEl.innerHTML = "";
    
    // Si no tiene las clases, añadirlas
    const classesToAdd = ["grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-3", "md:gap-4"];
    classesToAdd.forEach(className => {
        if (!heroContainerEl.classList.contains(className)) {
            heroContainerEl.classList.add(className);
        }
    });

    heroesOnPage.forEach(hero => {
        const card = createHeroCard(hero, universeFilter);
        if (card) heroContainerEl.appendChild(card);
    });

    setupPagination(page, totalPages, (newPage) => {
        displayHeroes(heroes, universeFilter, newPage);
    });

    // Animación
    heroContainerEl.classList.add("opacity-0");
    requestAnimationFrame(() => {
        heroContainerEl.classList.remove("opacity-0");
        heroContainerEl.classList.add("transition-opacity", "duration-300");
    });
};

/**
 * Create hero card (Tailwind)
 */
const createHeroCard = (hero, universe) => {
    if (!hero) return null;
    
    try {
        const publisher = hero.biography?.publisher?.toLowerCase() || "";
        const isMarvel = publisher.includes("marvel");
        const isDC = publisher.includes("dc");
        
        // Determinar universo basado en publisher si no se especifica
        const cardUniverse = universe || (isMarvel ? "marvel" : isDC ? "dc" : "marvel");
        
        const card = document.createElement("div");
        card.dataset.heroId = hero.id;

        card.className = `
            group relative overflow-hidden rounded-lg bg-neutral-800/80
            shadow-md transition-all duration-200
            hover:-translate-y-1 hover:shadow-lg
            border-t-2
            ${isMarvel ? "border-red-600" : "border-blue-600"}
            flex flex-col h-full
        `;

        // Asegurar que tenemos una imagen válida
        const imageUrl = hero.images?.lg || hero.images?.md || hero.images?.sm || 
                        "https://via.placeholder.com/400x300?text=No+Image";

        card.innerHTML = `
            <div class="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <img
                    src="${imageUrl}"
                    alt="${hero.name || 'Hero'}"
                    loading="lazy"
                    class="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'"
                />
                <span
                    class="absolute right-1.5 top-1.5 rounded px-1.5 py-0.5 text-[8px] font-bold text-white uppercase tracking-tight
                    ${isMarvel ? "bg-red-600" : "bg-blue-600"}"
                >
                    ${isMarvel ? "M" : "DC"}
                </span>
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div class="flex flex-col gap-1.5 p-2.5 flex-grow">
                <h3 class="line-clamp-1 text-md font-semibold leading-tight text-white mb-1">${hero.name || 'Unknown Hero'}</h3>
                ${hero.biography?.fullName ? `<p class="line-clamp-1 text-sm text-neutral-400 mb-1.5">${hero.biography.fullName}</p>` : ""}
                <button
                    class="modal-btn mt-auto w-full rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all duration-200
                    ${isMarvel ? "bg-red-600/90 text-white hover:bg-red-600 active:scale-95" : "bg-blue-600/90 text-white hover:bg-blue-600 active:scale-95"}"
                    data-hero-id="${hero.id}"
                >
                    View Details
                </button>
            </div>
        `;

        // Agregar event listener al botón
        const button = card.querySelector(".modal-btn");
        if (button) {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                console.log("Opening modal for:", hero.name, "universe:", cardUniverse);
                openHeroModal(hero, cardUniverse);
            });
        }

        return card;
    } catch (error) {
        console.error("Error creating hero card:", error, hero);
        return null;
    }
};

/**
 * Current heroes helper
 */
export const getCurrentHeroesData = () => ({
    heroes: currentHeroes,
    universe: currentUniverse,
});