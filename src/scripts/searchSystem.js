import { fetchData, searchHeroes } from './dataManager.js';
import { displayHeroes } from './displayHeroes.js';

let searchTimeout = null;
let isSearchOpen = false;

/**
 * Sets up the search functionality
 */
export const setupSearch = () => {
    const searchInput = document.getElementById('searchHero');
    const searchToggle = document.getElementById('searchToggle');

    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }

    // Observar cuando el input se abre/cierra para actualizar el estado
    const observer = new MutationObserver(() => {
        const hasOpacity100 = searchInput.classList.contains('opacity-100');
        const hasW64 = searchInput.classList.contains('w-64');
        isSearchOpen = hasOpacity100 && hasW64;
    });

    observer.observe(searchInput, { 
        attributes: true, 
        attributeFilter: ['class'] 
    });

    // Estado inicial
    isSearchOpen = searchInput.classList.contains('opacity-100') && 
                   searchInput.classList.contains('w-64');

    // Escuchar tecla Enter en TODO el documento cuando el buscador está abierto
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && isSearchOpen) {
            event.preventDefault();
            performSearch();
        }
    });

    // Live search con debounce - solo cuando el input está abierto
    searchInput.addEventListener('input', () => {
        if (!isSearchOpen) return;
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch();
        }, 400);
    });

    // Forzar el focus cuando se abre el input
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            setTimeout(() => {
                if (isSearchOpen) {
                    searchInput.focus();
                    // Seleccionar texto existente si lo hay
                    if (searchInput.value) {
                        searchInput.select();
                    }
                }
            }, 10);
        });
    }

    console.log('Search system initialized');
};

/**
 * Performs the search operation across all heroes
 */
const performSearch = async () => {
    const searchInput = document.getElementById('searchHero');
    if (!searchInput) return;

    const searchQuery = searchInput.value.trim();
    console.log('Searching for:', searchQuery);

    try {
        const allHeroes = await fetchData();
        const matchingHeroes = searchHeroes(allHeroes, searchQuery);

        console.log(`Found ${matchingHeroes.length} heroes matching "${searchQuery}"`);
        
        // CORRECCIÓN AQUÍ: displayHeroes es una función, no un objeto
        displayHeroes(matchingHeroes, 'all');
        
        // Actualizar el botón de búsqueda para mostrar resultados
        const searchToggle = document.getElementById('searchToggle');
        if (searchToggle && searchQuery) {
            const icon = searchToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-times pointer-events-none';
                searchToggle.setAttribute('title', 'Clear search');
                
                // Cambiar comportamiento del botón para limpiar búsqueda
                searchToggle.onclick = () => {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                    icon.className = 'fas fa-search pointer-events-none';
                    searchToggle.setAttribute('title', 'Search');
                    
                    // Restaurar comportamiento original
                    setTimeout(() => {
                        searchToggle.onclick = null;
                    }, 100);
                };
            }
        }
    } catch (error) {
        console.error('Error fetching or searching heroes:', error);
    }
};