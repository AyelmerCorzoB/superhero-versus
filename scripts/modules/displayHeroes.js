import { setupPagination } from './paginationSystem.js';
import { openHeroModal } from './modalSystem.js';

// Heroes per page
const HEROES_PER_PAGE = 8;
let currentHeroes = [];
let currentUniverse = '';

/**
 * Displays heroes with pagination
 * @param {Array} heroes Array of hero objects
 * @param {String} universe 'marvel' or 'dc'
 * @param {Number} page Page number to display (default: 1)
 */
export const displayHeroes = (heroes, universe, page = 1) => {
    // Hide battle arena if visible
    document.getElementById('battleArena').classList.add('hidden');
    document.getElementById('heroContainer').classList.remove('hidden');
    
    currentHeroes = heroes;
    currentUniverse = universe;
    
    // Calculate pagination values
    const totalPages = Math.ceil(heroes.length / HEROES_PER_PAGE);
    const startIndex = (page - 1) * HEROES_PER_PAGE;
    const endIndex = startIndex + HEROES_PER_PAGE;
    const heroesOnPage = heroes.slice(startIndex, endIndex);
    
    // Clear existing heroes
    const heroContainer = document.getElementById('contenedorSuperHeroes');
    heroContainer.innerHTML = '';
    
    // Display heroes for the current page
    heroesOnPage.forEach(hero => {
        const heroCard = createHeroCard(hero, universe);
        heroContainer.appendChild(heroCard);
    });
    
    // Set up pagination
    setupPagination(page, totalPages, (newPage) => {
        displayHeroes(heroes, universe, newPage);
    });
    
    // Add animation to hero container
    heroContainer.classList.add('fade-in');
    setTimeout(() => {
        heroContainer.classList.remove('fade-in');
    }, 500);
};

/**
 * Creates a hero card element
 * @param {Object} hero Hero object
 * @param {String} universe 'marvel' or 'dc'
 * @returns {HTMLElement} Hero card element
 */
const createHeroCard = (hero, universe) => {
    const heroCard = document.createElement('div');
    heroCard.className = `hero-card ${universe}`;
    heroCard.setAttribute('data-hero-id', hero.id || Math.random().toString(36).substr(2, 9));
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-image-container';
    
    const heroImage = document.createElement('img');
    heroImage.src = hero.img;
    heroImage.alt = hero.nombreFicticio;
    heroImage.className = 'hero-image';
    imageContainer.appendChild(heroImage);
    
    const universeTag = document.createElement('div');
    universeTag.className = `hero-universe ${universe}`;
    universeTag.textContent = universe === 'marvel' ? 'MARVEL' : 'DC';
    imageContainer.appendChild(universeTag);
    
    const heroDetails = document.createElement('div');
    heroDetails.className = 'hero-details';
    
    const heroName = document.createElement('h3');
    heroName.className = 'hero-name';
    heroName.textContent = hero.nombreFicticio;
    heroDetails.appendChild(heroName);
    
    const viewDetailsBtn = document.createElement('button');
    viewDetailsBtn.className = 'view-details-btn';
    viewDetailsBtn.textContent = 'View Details';
    viewDetailsBtn.addEventListener('click', () => {
        openHeroModal(hero, universe);
    });
    heroDetails.appendChild(viewDetailsBtn);
    
    heroCard.appendChild(imageContainer);
    heroCard.appendChild(heroDetails);
    
    return heroCard;
};

/**
 * Gets the current heroes data
 * @returns {Object} Object with current heroes and universe
 */
export const getCurrentHeroesData = () => {
    return {
        heroes: currentHeroes,
        universe: currentUniverse
    };
};