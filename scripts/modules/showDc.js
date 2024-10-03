export function mostrarSuperHeroesDc(superheroes) {
    const contenedor = document.getElementById('contenedorSuperHeroes');
    contenedor.innerHTML = "";

    superheroes.forEach(hero => {
        const heroeDiv = document.createElement('div');
        heroeDiv.className = 'superhero';

        const heroImage = document.createElement('img');
        heroImage.src = hero.img;
        heroImage.alt = hero.nombreFicticio;
        heroImage.style.cursor = 'pointer';

        const cajaInfo = document.createElement("div");
        cajaInfo.style.display = 'none'; 

        heroImage.addEventListener('click', () => {
            
            if (cajaInfo.style.display === 'none') {
                cajaInfo.innerHTML = `Nombre: ${hero.nombreFicticio} ${hero.nombreReal}<br>Biografía: ${hero.Biografia}<br>Poderes: ${hero.poderes}`;
                cajaInfo.style.display = 'block'; 
                cajaInfo.style.width = "300px"
            } else {
                cajaInfo.style.display = 'none'; 
            }
        });

        heroeDiv.innerHTML = `<h2>${hero.nombreFicticio}</h2>`;
        heroeDiv.appendChild(heroImage);
        heroeDiv.appendChild(cajaInfo); 
        contenedor.appendChild(heroeDiv);
    });
}
