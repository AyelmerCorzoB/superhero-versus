/**
 * Sets up the hero modal system
 */
export const setupModal = () => {
    const modal = document.getElementById('heroModal');
    const closeBtn = modal.querySelector('.close-btn');
    
    // Close the modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        closeHeroModal();
    });
    
    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeHeroModal();
        }
    });
    
    // Close the modal when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeHeroModal();
        }
    });
};

/**
 * Opens the hero modal with detailed information
 * @param {Object} hero Hero object
 * @param {String} universe 'marvel' or 'dc'
 */
export const openHeroModal = (hero, universe) => {
    const modal = document.getElementById('heroModal');
    const modalContent = modal.querySelector('.modal-hero-content');
    
    // Format powers as array
    const powers = hero.poderes.split(',').map(power => power.trim());
    
    // Create HTML for modal content
    modalContent.innerHTML = `
        <div class="modal-hero-header">
            <div class="modal-hero-banner" style="background-image: url('${hero.img}')"></div>
            <div class="modal-hero-info">
                <img src="${hero.img}" alt="${hero.nombreFicticio}" class="modal-hero-image">
                <div class="modal-hero-text">
                    <h2>${hero.nombreFicticio}</h2>
                    <h3>${hero.nombreReal}</h3>
                    <div class="universe-badge ${universe}">${universe === 'marvel' ? 'MARVEL' : 'DC COMICS'}</div>
                </div>
            </div>
        </div>
        <div class="modal-hero-body">
            <div class="modal-hero-section ${universe}">
                <h4>Biography</h4>
                <p>${hero.Biografia || 'No biography information available.'}</p>
            </div>
            <div class="modal-hero-section ${universe}">
                <h4>Powers & Abilities</h4>
                <div class="powers-list">
                    ${powers.map(power => `<div class="power-tag">${power}</div>`).join('')}
                </div>
            </div>
            <div class="modal-hero-section ${universe}">
                <h4>Stats</h4>
                <div class="stats-container">
                    ${createStatItem('Physical Strength', hero.atributos?.fuerza_fisica || 0, universe)}
                    ${createStatItem('Speed', hero.atributos?.velocidad || 0, universe)}
                    ${createStatItem('Resistance', hero.atributos?.resistencia || 0, universe)}
                    ${createStatItem('Intelligence', hero.atributos?.inteligencia || 0, universe)}
                    ${createStatItem('Special Abilities', hero.atributos?.habilidades_especiales || 0, universe)}
                </div>
            </div>
        </div>
    `;
    
    // Show the modal with animation
    modal.style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
};

/**
 * Creates a stat item HTML
 * @param {String} label Stat label
 * @param {Number} value Stat value (0-10)
 * @param {String} universe 'marvel' or 'dc'
 * @returns {String} HTML for stat item
 */
const createStatItem = (label, value, universe) => {
    // Ensure value is between 0-10
    const safeValue = Math.min(10, Math.max(0, value));
    const percentage = (safeValue / 10) * 100;
    
    return `
        <div class="stat-item">
            <div class="stat-label">${label}</div>
            <div class="stat-bar">
                <div class="stat-bar-fill ${universe}" style="width: ${percentage}%"></div>
            </div>
            <div class="stat-value">${safeValue}/10</div>
        </div>
    `;
};

/**
 * Closes the hero modal
 */
export const closeHeroModal = () => {
    const modal = document.getElementById('heroModal');
    modal.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
};