export function mostrarSuperHeroes(superheroes) {
    const contenedor = document.getElementById('contenedorSuperHeroes');
    contenedor.innerHTML = "";

    // Eliminar cualquier resultado previo
    const resultadoPrevio = document.querySelector('.resultado');
    if (resultadoPrevio) {
        resultadoPrevio.remove();
    }

    const heroesPorPagina = 4; 
    let paginaActual = 1; 
    const totalPaginas = Math.ceil(superheroes.length / heroesPorPagina);

    let modalAbierto = null;

    function mostrarPagina(pagina) {
        contenedor.innerHTML = ""; 
        const inicio = (pagina - 1) * heroesPorPagina;
        const fin = inicio + heroesPorPagina;
        const heroesPagina = superheroes.slice(inicio, fin);

        heroesPagina.forEach(hero => {
            const heroeDiv = document.createElement('div');
            heroeDiv.className = 'superhero';

            const heroImage = document.createElement('img');
            heroImage.src = hero.img;
            heroImage.alt = hero.nombreFicticio;
            heroImage.style.cursor = 'pointer';

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = 'none';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            const closeButton = document.createElement('span');
            closeButton.className = 'close';
            closeButton.innerHTML = 'CERRAR';

            const heroImageLarge = document.createElement('img');
            heroImageLarge.src = hero.img;
            heroImageLarge.alt = hero.nombreFicticio;

            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = ` 
                <h2>${hero.nombreFicticio} ${hero.nombreReal}</h2>
                <p>Biografía: ${hero.Biografia}</p>
                <p>Poderes: ${hero.poderes}</p>
            `;
            infoDiv.append(closeButton)

            modalContent.appendChild(heroImageLarge);
            modalContent.appendChild(infoDiv);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            heroImage.addEventListener('click', () => {
                if (modalAbierto) {
                    modalAbierto.style.display = 'none';
                }
                modal.style.display = 'block';
                modalAbierto = modal;
            });

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                modalAbierto = null;
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    modalAbierto = null;
                }
            });

            heroeDiv.innerHTML = `<h2>${hero.nombreFicticio}</h2>`;
            heroeDiv.appendChild(heroImage);
            contenedor.appendChild(heroeDiv);
        });

        actualizarBotonesPaginacion();
    }

    let paginacionDiv = document.querySelector('.paginacion');
    if (!paginacionDiv) {
        paginacionDiv = document.createElement('div');
        paginacionDiv.className = 'paginacion';
        document.body.appendChild(paginacionDiv);
    } else {
        paginacionDiv.innerHTML = ''; 
    }

    const botonAnterior = document.createElement('button');
    botonAnterior.innerHTML = 'Anterior';
    botonAnterior.disabled = true;
    paginacionDiv.appendChild(botonAnterior);

    const botonSiguiente = document.createElement('button');
    botonSiguiente.innerHTML = 'Siguiente';
    paginacionDiv.appendChild(botonSiguiente);

    botonAnterior.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarPagina(paginaActual);
        }
    });

    botonSiguiente.addEventListener('click', () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarPagina(paginaActual);
        }
    });

    function actualizarBotonesPaginacion() {
        const botonAnterior = paginacionDiv.querySelector('button:first-child');
        const botonSiguiente = paginacionDiv.querySelector('button:last-child');
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual === totalPaginas;
    }

    paginaActual = 1;
    mostrarPagina(paginaActual);
}
