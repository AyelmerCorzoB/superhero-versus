// showDc.js
export function mostrarSuperHeroesDc(superheroes) {
    const contenedor = document.getElementById('contenedorSuperHeroes');
    contenedor.innerHTML = "";

    let modalAbierto = null; 

    superheroes.forEach(hero => {
        const heroeDiv = document.createElement('div');
        heroeDiv.className = 'superhero';

        const heroImage = document.createElement('img');
        heroImage.src = hero.img;
        heroImage.alt = hero.nombreFicticio;
        heroImage.style.cursor = 'pointer';

        // Crear el modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'none';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const closeButton = document.createElement('span');
        closeButton.className = 'close';
        closeButton.innerHTML = 'CERRAR'; 

        // Contenido del modal
        const heroImageLarge = document.createElement('img');
        heroImageLarge.src = hero.img;
        heroImageLarge.alt = hero.nombreFicticio;
        

        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <h2>${hero.nombreFicticio} ${hero.nombreReal}</h2>
            <p>Biografía: ${hero.Biografia}</p>
            <p>Poderes: ${hero.poderes}</p>
        `;

        // Añadir contenido al modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(heroImageLarge);
        modalContent.appendChild(infoDiv);
        modal.appendChild(modalContent);
        document.body.appendChild(modal); 

        heroImage.addEventListener('click', () => {
            // Cerrar el modal abierto, si existe
            if (modalAbierto) {
                modalAbierto.style.display = 'none'; // Cerrar el modal anterior
            }

            // Abrir el nuevo modal
            modal.style.display = 'block'; 
            modalAbierto = modal; // Actualizar la referencia al modal abierto
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none'; // Cerrar el modal
            modalAbierto = null; // Restablecer la referencia al modal abierto
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none'; // Cerrar el modal si se hace clic fuera
                modalAbierto = null; // Restablecer la referencia al modal abierto
            }
        });

        heroeDiv.innerHTML = `<h2>${hero.nombreFicticio}</h2>`;
        heroeDiv.appendChild(heroImage);
        contenedor.appendChild(heroeDiv);
    });
}
