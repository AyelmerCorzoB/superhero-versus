import { getRandomHero, calculateHeroPower } from "./dataManager.js";

const BASE_CARD =
  "w-full max-w-xs rounded-xl bg-neutral-800 p-6 shadow-lg transition-all duration-500";

const DC_BORDER = "border-4 border-blue-600";
const MARVEL_BORDER = "border-4 border-red-600";

const WINNER =
  "scale-105 ring-4 ring-green-500 shadow-green-500/40";

const LOSER =
  "opacity-50 grayscale";


export const initializeBattle = (dcHeroes, marvelHeroes) => {
  document.getElementById("heroContainer")?.classList.add("hidden");
  document.getElementById("battleArena")?.classList.remove("hidden");

  const marvelHero = getRandomHero(marvelHeroes);
  const dcHero = getRandomHero(dcHeroes);

  const marvelPower = calculateHeroPower(marvelHero);
  const dcPower = calculateHeroPower(dcHero);

  displayBattleHero(marvelHero, "marvel", marvelPower, "heroMarvelContainer");
  displayBattleHero(dcHero, "dc", dcPower, "heroDcContainer");

  const battleResult = document.getElementById("battleResult");
  battleResult.innerHTML = `
    <p class="animate-pulse text-neutral-400">
      Analizando atributos...
    </p>
  `;

  setTimeout(() => {
    displayBattleResult(dcHero, marvelHero, dcPower, marvelPower);
  }, 3000);
};


const displayBattleHero = (hero, universe, power, containerId) => {
  const container = document.getElementById(containerId);

  const border = universe === "dc" ? DC_BORDER : MARVEL_BORDER;
  const color = universe === "dc" ? "text-blue-400" : "text-red-400";

  container.className = `${BASE_CARD} ${border}`;

  container.innerHTML = `
    <img
      src="${hero.images.lg}"
      alt="${hero.name}"
      class="mx-auto mb-4 h-40 w-40 rounded-xl object-cover shadow-lg"
    />

    <h3 class="mb-4 text-center text-xl font-bold text-white">
      ${hero.name}
    </h3>

    <div class="text-sm text-neutral-300">
      ${createStat("Fuerza", hero.powerstats.strength, color)}
      ${createStat("Velocidad", hero.powerstats.speed, color)}
      ${createStat("Resistencia", hero.powerstats.durability, color)}
      ${createStat("Inteligencia", hero.powerstats.intelligence, color)}

    </div>

    <div class="mt-5 text-center">
      <p class="text-xs tracking-widest text-neutral-400">
        NIVEL DE PODER
      </p>
      <p class="text-2xl font-extrabold ${color}">
        ${power}
      </p>
    </div>
  `;
};

const createStat = (label, value, color) => `
  <div class="flex justify-between">
    <span>${label}</span>
    <span class="font-bold ${color}">${value}</span>
  </div>
`;


const displayBattleResult = (dcHero, marvelHero, dcPower, marvelPower) => {
  const battleResult = document.getElementById("battleResult");
  const dcCard = document.getElementById("heroDcContainer");
  const marvelCard = document.getElementById("heroMarvelContainer");

  let html = "";

  if (dcPower > marvelPower) {
    html = `
      <p class="text-lg font-bold text-blue-400">
        ${dcHero.name} gana
      </p>
      <p class="text-sm text-neutral-400">
        Diferencia: ${dcPower - marvelPower}
      </p>
    `;
    dcCard.classList.add(...WINNER.split(" "));
    marvelCard.classList.add(...LOSER.split(" "));
  } else if (marvelPower > dcPower) {
    html = `
      <p class="text-lg font-bold text-red-400">
        ${marvelHero.name} gana
      </p>
      <p class="text-sm text-neutral-400">
        Diferencia: ${marvelPower - dcPower}
      </p>
    `;
    marvelCard.classList.add(...WINNER.split(" "));
    dcCard.classList.add(...LOSER.split(" "));
  } else {
    html = `
      <p class="text-lg font-bold text-yellow-400">
        Empate
      </p>
      <p class="text-sm text-neutral-400">
        Ambos con ${dcPower} puntos
      </p>
    `;
  }

  battleResult.innerHTML = html;
};

