const COLOR_MAP = {
  marvel: {
    badge: "bg-red-600",
    title: "text-red-500",
    bar: "bg-red-600",
  },
  dc: {
    badge: "bg-blue-600",
    title: "text-blue-500",
    bar: "bg-blue-600",
  },
};

export const openHeroModal = (hero, universe = null) => {
  console.log("openHeroModal called with:", hero.name, universe);
  
  const modal = document.getElementById("heroModal");
  const modalContent = modal?.querySelector(".modal-hero-content");
  if (!modal || !modalContent) {
    console.error("Modal or modal content not found");
    return;
  }

  // Determinar universo si no se proporciona
  if (!universe) {
    const publisher = hero.biography?.publisher?.toLowerCase() || "";
    universe = publisher.includes("marvel") ? "marvel" : 
               publisher.includes("dc") ? "dc" : "marvel";
  }
  
  const colors = COLOR_MAP[universe] || COLOR_MAP.marvel;

  // Asegurar que tenemos una imagen válida
  const imageUrl = hero.images?.lg || hero.images?.md || hero.images?.sm || 
                 "https://via.placeholder.com/400x300?text=No+Image";

modalContent.innerHTML = `
<div class="grid overflow-hidden rounded-xl bg-neutral-900 lg:grid-cols-[280px_1fr]">

  <!-- LEFT COLUMN -->
  <div
    class="relative flex flex-col justify-between bg-cover bg-center"
    style="background-image:url('${imageUrl}')"
  >
    <!-- overlay -->
    <div class="absolute inset-0 bg-neutral-900/70"></div>

    <!-- AVATAR -->
    <div class="relative flex flex-col items-center pt-6">
      <img
        src="${imageUrl}"
        class="h-24 w-24 rounded-full border-2 border-neutral-800 object-cover"
        onerror="this.src='https://via.placeholder.com/100?text=No+Image'"
      />
      <h2 class="mt-2 text-lg font-bold text-white">
        ${hero.name || "Unknown Hero"}
      </h2>
      <p class="text-md text-neutral-400 text-center">
        ${hero.biography?.fullName || hero.biography?.aliases?.[0] || "No full name available"}
      </p>
      <span class="mt-1 rounded-full px-2 py-0.5 text-sm font-semibold text-white ${colors.badge}">
        ${universe.toUpperCase()}
      </span>
    </div>
  </div>

  <!-- RIGHT COLUMN -->
  <div class="space-y-4 p-4 overflow-y-auto max-h-[500px]">
    
    <!-- CHARACTERISTICS / APPEARANCE -->
    <section>
      <h4 class="mb-1 text-md font-semibold ${colors.title}">Characteristics / Appearance</h4>
      <ul class="text-sm text-neutral-300 space-y-1">
        <li><strong>Gender:</strong> ${hero.appearance?.gender || "-"}</li>
        <li><strong>Race:</strong> ${hero.appearance?.race || "-"}</li>
        <li><strong>Height:</strong> ${hero.appearance?.height?.join(" / ") || "-"}</li>
        <li><strong>Weight:</strong> ${hero.appearance?.weight?.join(" / ") || "-"}</li>
        <li><strong>Eye Color:</strong> ${hero.appearance?.eyeColor || "-"}</li>
        <li><strong>Hair Color:</strong> ${hero.appearance?.hairColor || "-"}</li>
      </ul>
    </section>

    <!-- CONNECTIONS -->
    <section>
      <h4 class="mb-1 text-md font-semibold ${colors.title}">Connections</h4>
      <ul class="text-sm text-neutral-300 space-y-1">
        <li><strong>Group:</strong> ${hero.connections?.groupAffiliation || "-"}</li>
        <li><strong>Relatives:</strong> ${hero.connections?.relatives || "-"}</li>
      </ul>
    </section>

    <!-- WORK / BASE -->
    <section>
      <h4 class="mb-1 text-md font-semibold ${colors.title}">Work / Base</h4>
      <ul class="text-sm text-neutral-300 space-y-1">
        <li><strong>Occupation:</strong> ${hero.work?.occupation || "-"}</li>
        <li><strong>Base:</strong> ${hero.work?.base || "-"}</li>
      </ul>
    </section>

    <!-- STATS -->
    <section>
      <h4 class="mb-2 text-md font-semibold ${colors.title}">Stats - Powerstats</h4>
      <div class="space-y-2">
        ${createStatItem("Strength", hero.powerstats?.strength, colors.bar)}
        ${createStatItem("Speed", hero.powerstats?.speed, colors.bar)}
        ${createStatItem("Durability", hero.powerstats?.durability, colors.bar)}
        ${createStatItem("Intelligence", hero.powerstats?.intelligence, colors.bar)}
        ${createStatItem("Power", hero.powerstats?.power, colors.bar)}
        ${createStatItem("Combat", hero.powerstats?.combat, colors.bar)}
      </div>
    </section>

  </div>
</div>
`;


  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
};


const createStatItem = (label, value = 0, barClass) => {
  const v = Math.min(100, Math.max(0, parseInt(value) || 0));

  return `
    <div>
      <div class="mb-0.5 flex justify-between text-sm text-neutral-400">
        <span>${label}</span>
        <span>${v}</span>
      </div>
      <div class="h-1.5 w-full rounded bg-neutral-700">
        <div
          class="h-1.5 rounded ${barClass}"
          style="width:${v}%"
        ></div>
      </div>
    </div>
  `;
};


export const closeHeroModal = () => {
    const modal = document.getElementById('heroModal');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
};

export const setupModal = () => {
  const modal = document.getElementById("heroModal");
  if (!modal) {
    console.warn("Modal element not found");
    return;
  }

  const closeBtn = modal.querySelector(".close-btn");

  // Botón X
  closeBtn?.addEventListener("click", closeHeroModal);

  // Click fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeHeroModal();
    }
  });

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeHeroModal();
    }
  });
};