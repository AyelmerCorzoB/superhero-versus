import { mostrarSuperHeroesDc } from "./modules/showDc.js";


const botonDc = document.getElementById("mostrarDc");

botonDc.addEventListener("click",() => {
    fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
    const DATA = data.superheroesDc;
    mostrarSuperHeroesDc(DATA);
  })
}
)

const botonMarvel = document.getElementById("mostrarMarvel")
botonMarvel.addEventListener("click", ()=> {
    fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
    const DATA = data.superHeroesMarvel;
    mostrarSuperHeroesDc(DATA);
  })
})