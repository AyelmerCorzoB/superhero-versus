import { fetchData, searchHeroes } from './dataManager.js';
import { displayHeroes, getCurrentHeroesData } from './displayHeroes.js';

/**
 * Sets up the search functionality
 */
export const setupSearch = () => {
    const searchInput = document.getElementById('searchHero');
    const searchBtn = document.getElementById('searchBtn');
    
    // Search when button is clicked
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
    
    // Search when Enter key is pressed
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Live search as user types (with debounce)
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch();
        }, 500); // 500ms debounce delay
    });
};

/**
 * Performs the search operation
 */
const performSearch = () => {
    const searchInput = document.getElementById('searchHero');
    const searchQuery = searchInput.value;
    
    // Get current heroes data
    const { heroes, universe } = getCurrentHeroesData();
    
    if (heroes && heroes.length > 0) {
        // Filter heroes based on search query
        const filteredHeroes = searchHeroes(heroes, searchQuery);
        
        // Display filtered heroes
        displayHeroes(filteredHeroes, universe);
    } else {
        // If no heroes are currently displayed, search both universes
        fetchData().then(data => {
            const dcHeroes = searchHeroes(data.DC_Comics, searchQuery);
            const marvelHeroes = searchHeroes(data.Marvel, searchQuery);
            
            // Combine and display all matching heroes
            const allMatchingHeroes = [...dcHeroes, ...marvelHeroes];
            
            // Use 'all' as universe to indicate mixed results
            displayHeroes(allMatchingHeroes, allMatchingHeroes.length > 0 ? 'all' : 'marvel');
        });
    }
};