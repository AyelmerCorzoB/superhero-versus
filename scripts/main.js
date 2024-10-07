
import { compararHeroes } from "./modules/compararHeroes.js";
import { mostrarSuperHeroes } from "./modules/mostrarHeroes.js";

const botonDc = document.getElementById("mostrarDc");
botonDc.addEventListener("click", () => {
    fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
        const DATA = data.DC_Comics;
        mostrarSuperHeroes(DATA);
    });
});

const botonMarvel = document.getElementById("mostrarMarvel");
botonMarvel.addEventListener("click", () => {
    fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
        const DATA = data.Marvel;
        mostrarSuperHeroes(DATA);
    });
});

const botonContra = document.getElementById("contra");
botonContra.addEventListener("click", () => {
    fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
        const dcHeroes = data.DC_Comics;
        const marvelHeroes = data.Marvel;
        compararHeroes(dcHeroes, marvelHeroes);
    });
});