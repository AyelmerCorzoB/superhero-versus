/**
 * Sets up pagination controls (Tailwind only)
 * Fixed at bottom of viewport
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Function} onPageChange
 */
export const setupPagination = (currentPage, totalPages, onPageChange) => {
  const paginationContainer = document.getElementById("paginationContainer");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";

  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) {
    paginationContainer.className = "hidden";
    return;
  }

  /* ---------- CONTENEDOR FIJO ---------- */
  paginationContainer.className = `
    fixed bottom-10 left-0 right-0 z-50
    flex justify-center
    pointer-events-none
  `;

  /* ---------- BOTÓN ANTERIOR ---------- */
  const prevButton = document.createElement("button");
  prevButton.innerHTML = `
    <i class="fas fa-chevron-left"></i>
    <span class="hidden sm:inline">Anterior</span>
  `;

  prevButton.disabled = currentPage === 1;

  prevButton.className = `
    pointer-events-auto
    flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium
    transition-colors backdrop-blur
    ${
      currentPage === 1
        ? "cursor-not-allowed border-neutral-700 text-neutral-500"
        : "border-neutral-600 text-neutral-200 hover:bg-neutral-700/80"
    }
  `;

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  });

  /* ---------- INDICADOR ---------- */
  const pageIndicator = document.createElement("div");
  pageIndicator.className = `
    pointer-events-auto
    rounded-lg bg-neutral-800/90 px-4 py-2 text-sm
    text-neutral-300 backdrop-blur
  `;

  pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;

  /* ---------- BOTÓN SIGUIENTE ---------- */
  const nextButton = document.createElement("button");
  nextButton.innerHTML = `
    <span class="hidden sm:inline">Siguiente</span>
    <i class="fas fa-chevron-right"></i>
  `;

  nextButton.disabled = currentPage === totalPages;

  nextButton.className = `
    pointer-events-auto
    flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium
    transition-colors backdrop-blur
    ${
      currentPage === totalPages
        ? "cursor-not-allowed border-neutral-700 text-neutral-500"
        : "border-neutral-600 text-neutral-200 hover:bg-neutral-700/80"
    }
  `;

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  });

  /* ---------- WRAPPER VISUAL ---------- */
  const wrapper = document.createElement("div");
  wrapper.className = "flex items-center gap-4 rounded-xl bg-neutral-900/70 px-4 py-3 shadow-lg backdrop-blur";

  wrapper.appendChild(prevButton);
  wrapper.appendChild(pageIndicator);
  wrapper.appendChild(nextButton);

  paginationContainer.appendChild(wrapper);
};
