import { displayHeroes } from './modules/displayHeroes.js';
import { initializeBattle } from './modules/battleSystem.js';
import { setupSearch } from './modules/searchSystem.js';
import { fetchData } from './modules/dataManager.js';
import { setupModal } from './modules/modalSystem.js';

// Initialize hero modal
setupModal();

// Initialize search functionality
setupSearch();

// Event listeners for main buttons
document.getElementById('mostrarDc').addEventListener('click', () => {
    fetchData().then(data => {
        const dcHeroes = data.DC_Comics;
        displayHeroes(dcHeroes, 'dc');
    });
});

document.getElementById('mostrarMarvel').addEventListener('click', () => {
    fetchData().then(data => {
        const marvelHeroes = data.Marvel;
        displayHeroes(marvelHeroes, 'marvel');
    });
});

document.getElementById('contra').addEventListener('click', () => {
    fetchData().then(data => {
        const dcHeroes = data.DC_Comics;
        const marvelHeroes = data.Marvel;
        initializeBattle(dcHeroes, marvelHeroes);
    });
});

// Event listener for new battle button
document.getElementById('newBattle').addEventListener('click', () => {
    fetchData().then(data => {
        const dcHeroes = data.DC_Comics;
        const marvelHeroes = data.Marvel;
        initializeBattle(dcHeroes, marvelHeroes);
    });
});

// Initialize the app by showing Marvel heroes by default
document.addEventListener('DOMContentLoaded', () => {
    fetchData().then(data => {
        const marvelHeroes = data.Marvel;
        displayHeroes(marvelHeroes, 'marvel');
    });
});