export function compararHeroes(dcHeroes, marvelHeroes) {
    function obtenerHeroeAleatorio(heroes) {
        const indiceAleatorio = Math.floor(Math.random() * heroes.length);
        return heroes[indiceAleatorio];
    }

    const heroeDC = obtenerHeroeAleatorio(dcHeroes);
    const personaje1 = heroeDC.atributos.fuerza_fisica + 
                       heroeDC.atributos.velocidad + 
                       heroeDC.atributos.resistencia + 
                       heroeDC.atributos.inteligencia + 
                       heroeDC.atributos.habilidades_especiales;

    const heroeMarvel = obtenerHeroeAleatorio(marvelHeroes);
    const personaje2 = heroeMarvel.atributos.fuerza_fisica + 
                       heroeMarvel.atributos.velocidad + 
                       heroeMarvel.atributos.resistencia + 
                       heroeMarvel.atributos.inteligencia + 
                       heroeMarvel.atributos.habilidades_especiales;

    console.log(personaje1);
    console.log(personaje2);

    
    const paginacionDiv = document.querySelector('.paginacion');
    if (paginacionDiv) {
        paginacionDiv.remove();
    }

    const comparacionDiv = document.createElement('div');
    comparacionDiv.className = 'comparacion';

    const heroeDCDiv = document.createElement('div');
    heroeDCDiv.className = 'heroeDC';
    heroeDCDiv.innerHTML = `
        <h2>${heroeDC.nombreFicticio} (DC)</h2>
        <img src="${heroeDC.img}" alt="${heroeDC.nombreFicticio}">
        <p><strong>Poderes:</strong> ${heroeDC.poderes}</p>
    `;

    const heroeMarvelDiv = document.createElement('div');
    heroeMarvelDiv.className = 'heroeMarvel';
    heroeMarvelDiv.innerHTML = `
        <h2>${heroeMarvel.nombreFicticio} (Marvel)</h2>
        <img src="${heroeMarvel.img}" alt="${heroeMarvel.nombreFicticio}">
        <p><strong>Poderes:</strong> ${heroeMarvel.poderes}</p>
    `;

    comparacionDiv.appendChild(heroeDCDiv);
    comparacionDiv.appendChild(heroeMarvelDiv);

    const contenedor = document.getElementById('contenedorSuperHeroes');
    contenedor.innerHTML = ''; 
    contenedor.appendChild(comparacionDiv);
    
    const contenedorPrincipal = document.getElementById("contenedorPrincipal");
    
    const resultadoPrevio = document.querySelector('.resultado');
    if (resultadoPrevio) {
        resultadoPrevio.remove();
    }

    
    setTimeout(() => {
        const resultadoDiv = document.createElement('div');
        resultadoDiv.className = 'resultado';

        if (personaje1 > personaje2) {
            resultadoDiv.innerHTML = `<h2> <span>${heroeDC.nombreFicticio}</span> gana con un puntaje de ${personaje1}!</h2>`;
        } else if (personaje2 > personaje1) {
            resultadoDiv.innerHTML = `<h2><span>${heroeMarvel.nombreFicticio}</span> gana con un puntaje de ${personaje2}!</h2>`;
        } else {
            resultadoDiv.innerHTML = `<h2>¡Es un empate! Ambos tienen un puntaje de ${personaje1}!</h2>`;
        }

        contenedorPrincipal.appendChild(resultadoDiv);
    }, 2000); 
}
