import { getRandomHero, calculateHeroPower } from "./dataManager.js";

export const initializeBattle = (dcHeroes, marvelHeroes) => {
  // Hide hero container and show battle arena
  document.getElementById("heroContainer").classList.add("hidden");
  document.getElementById("battleArena").classList.remove("hidden");

  const dcHero = getRandomHero(dcHeroes);
  const marvelHero = getRandomHero(marvelHeroes);

  const dcPower = calculateHeroPower(dcHero);
  const marvelPower = calculateHeroPower(marvelHero);

  displayBattleHero(dcHero, "dc", dcPower, "heroDcContainer");
  displayBattleHero(marvelHero, "marvel", marvelPower, "heroMarvelContainer");

  const battleResult = document.getElementById("battleResult");
  battleResult.innerHTML =
    "<h3>Calculando...</h3><p>Analizando los atributos del héroe...</p>";

  const heroDcCard = document.getElementById("heroDcContainer");
  const heroMarvelCard = document.getElementById("heroMarvelContainer");
  heroDcCard.className = "hero-battle-card dc";
  heroMarvelCard.className = "hero-battle-card marvel";

  setTimeout(() => {
    heroDcCard.classList.add("animate-battle");
    heroMarvelCard.classList.add("animate-battle");

    setTimeout(() => {
      heroDcCard.classList.remove("animate-battle");
      heroMarvelCard.classList.remove("animate-battle");
    }, 1000);
  }, 500);

  setTimeout(() => {
    displayBattleResult(dcHero, marvelHero, dcPower, marvelPower);
  }, 2000);
};

const displayBattleHero = (hero, universe, power, containerId) => {
  const container = document.getElementById(containerId);

  container.innerHTML = `
        <img src="${hero.img}" alt="${hero.nombreFicticio}" class="battle-hero-image">
        <div class="battle-hero-details">
            <h3 class="battle-hero-name">${hero.nombreFicticio}</h3>
            <div class="battle-stats">
                <div class="battle-stat-item">
                    <span class="battle-stat-label">Strength</span>
                    <span class="battle-stat-value ${universe}">${hero.atributos.fuerza_fisica}</span>
                </div>
                <div class="battle-stat-item">
                    <span class="battle-stat-label">Speed</span>
                    <span class="battle-stat-value ${universe}">${hero.atributos.velocidad}</span>
                </div>
                <div class="battle-stat-item">
                    <span class="battle-stat-label">Resistance</span>
                    <span class="battle-stat-value ${universe}">${hero.atributos.resistencia}</span>
                </div>
                <div class="battle-stat-item">
                    <span class="battle-stat-label">Intelligence</span>
                    <span class="battle-stat-value ${universe}">${hero.atributos.inteligencia}</span>
                </div>
                <div class="battle-stat-item">
                    <span class="battle-stat-label">Special Abilities</span>
                    <span class="battle-stat-value ${universe}">${hero.atributos.habilidades_especiales}</span>
                </div>
            </div>
            <div class="total-power">
                <span class="total-power-label">POWER LEVEL</span>
                <span class="total-power-value ${universe}">${power}</span>
            </div>
        </div>
    `;
};

const displayBattleResult = (dcHero, marvelHero, dcPower, marvelPower) => {
  const battleResult = document.getElementById("battleResult");
  const heroDcCard = document.getElementById("heroDcContainer");
  const heroMarvelCard = document.getElementById("heroMarvelContainer");

  let resultHTML = "";

  if (dcPower > marvelPower) {
    resultHTML = `
            <h3>${dcHero.nombreFicticio} Gano!</h3>
            <p>Diferencia de poder: ${dcPower - marvelPower} puntos</p>
        `;
    heroDcCard.classList.add("winner");
    heroMarvelCard.classList.add("loser");
  } else if (marvelPower > dcPower) {
    resultHTML = `
            <h3>${marvelHero.nombreFicticio} Gano!</h3>
            <p>Diferencia de poder: ${marvelPower - dcPower} puntos</p>
        `;
    heroMarvelCard.classList.add("winner");
    heroDcCard.classList.add("loser");
  } else {
    resultHTML = `
            <h3>Empate!</h3>
            <p>Ambos héroes tienen ${dcPower} puntos de poder</p>
        `;
  }

  battleResult.innerHTML = resultHTML;
};
