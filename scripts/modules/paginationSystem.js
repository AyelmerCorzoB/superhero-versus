/**
 * Sets up pagination controls
 * @param {Number} currentPage Current page number
 * @param {Number} totalPages Total number of pages
 * @param {Function} onPageChange Callback function when page changes
 */
export const setupPagination = (currentPage, totalPages, onPageChange) => {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';
    
    // No need for pagination if there's only one page
    if (totalPages <= 1) {
        return;
    }
    
    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-btn';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    });
    
    // Create page indicator
    const pageIndicator = document.createElement('div');
    pageIndicator.className = 'page-indicator';
    
    const currentPageSpan = document.createElement('span');
    currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
    pageIndicator.appendChild(currentPageSpan);
    
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-btn';
    nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    });
    
    // Add all elements to the pagination container
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageIndicator);
    paginationContainer.appendChild(nextButton);
};