import { mostrarSuperHeroesDc } from "./modules/showDc.js";
import { mostrarSuperHeroesMarvel } from "./modules/showMarvel.js";

const botonDc = document.getElementById("mostrarDc");
botonDc.addEventListener("click", () => {
    fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
        const DATA = data.DC_Comics;
        mostrarSuperHeroesDc(DATA);
    });
});

const botonMarvel = document.getElementById("mostrarMarvel");
botonMarvel.addEventListener("click", () => {
    fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
        const DATA = data.Marvel;
        mostrarSuperHeroesMarvel(DATA);
    });
});
