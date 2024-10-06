// showMarvel.js
export function mostrarSuperHeroesMarvel(superheroes) {
    const contenedor = document.getElementById('contenedorSuperHeroes');
    contenedor.innerHTML = "";
    const cuerpo = document.getElementById("cuerpo");
    cuerpo.style.backgroundImage = "url('../../assets/images/0e9b1e7319dae4b8046c5366d62532e3.jpg')";
    cuerpo.style.backgroundSize = "cover"; 
    cuerpo.style.backgroundPosition = "center"; 
    cuerpo.style.backgroundRepeat = "no-repeat"; 
    cuerpo.style.backdropFilter = "blur(5px) brightness(0.1) opacity(0.9)";
    

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

            
            modalContent.appendChild(closeButton);
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

    
    const paginacionDiv = document.createElement('div');
    paginacionDiv.className = 'paginacion';
    paginacionDiv.innerHTML = "";
    document.body.appendChild(paginacionDiv);

    const botonAnterior = document.createElement('button');
    botonAnterior.innerHTML = "";
    botonAnterior.innerHTML = 'Anterior';
    botonAnterior.disabled = true;
    paginacionDiv.appendChild(botonAnterior);

    const botonSiguiente = document.createElement('button');
    botonSiguiente.innerHTML = '';
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
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual === totalPaginas;
    }

    mostrarPagina(paginaActual);
}
