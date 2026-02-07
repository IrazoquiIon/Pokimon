import { getRandomPokemon, getPokemonById } from './api.js';
// ============================================
// TEST: AFFICHER TOUS LES POKÉMONS
// ============================================

const allPokemonBtn = document.getElementById('allPokemonBtn');
const allPokemonContainer = document.getElementById('allPokemonContainer');


// Fonction pour obtenir la couleur selon la valeur
const getStatColor = (value) => {
    if (value <= 50) return '#ef4444'; // Rouge
    if (value <= 80) return '#f59e0b'; // Orange
    if (value <= 110) return '#eab308'; // Jaune
    if (value <= 140) return '#84cc16'; // Vert clair
    return '#22c55e'; // Vert foncé
};



allPokemonBtn.addEventListener('click', async () => {
    for (let id = 1; id <= 1025; id++) {
        const pokemon = await getPokemonById(id);
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        // Créer les images de types
        const typesHTML = pokemon.types.map(type =>
            `<img src="${type.image}" alt="${type.name}" class="pokemon-type">`
        ).join('');
        pokemonCard.innerHTML = `
            <h3>${pokemon.name.fr}</h3>
            <img src="${pokemon.sprites.regular}" alt="${pokemon.name.fr}" id="pokemon-image-${pokemon.id}" class="pokemon-image">
            <div class="pokemon-types">${typesHTML}</div>
            <h2>Stats :</h2>
            <ul class="pokemon-stats">
                <li>
                    <span class="stat-label">HP:</span>
                    <span class="stat-value">${pokemon.stats.hp}</span>
                    <progress value="${pokemon.stats.hp}" max="255" class="stat-progress" style="--stat-color: ${getStatColor(pokemon.stats.hp)}"></progress>
                </li>
                <li>
                    <span class="stat-label">Attack:</span>
                    <span class="stat-value">${pokemon.stats.atk}</span>
                    <progress value="${pokemon.stats.atk}" max="255" class="stat-progress" style="--stat-color: ${getStatColor(pokemon.stats.atk)}"></progress>
                </li>
                <li>
                    <span class="stat-label">Defense:</span>
                    <span class="stat-value">${pokemon.stats.def}</span>
                    <progress value="${pokemon.stats.def}" max="255" class="stat-progress" style="--stat-color: ${getStatColor(pokemon.stats.def)}"></progress>
                </li>
                <li>
                    <span class="stat-label">Special Attack:</span>
                    <span class="stat-value">${pokemon.stats.spe_atk}</span>
                    <progress value="${pokemon.stats.spe_atk}" max="255" class="stat-progress" style="--stat-color: ${getStatColor(pokemon.stats.spe_atk)}"></progress>
                </li>
                <li>
                    <span class="stat-label">Special Defense:</span>
                    <span class="stat-value">${pokemon.stats.spe_def}</span>
                    <progress value="${pokemon.stats.spe_def}" max="255" class="stat-progress" style="--stat-color: ${getStatColor(pokemon.stats.spe_def)}"></progress>
                </li>
                <li>
                    <span class="stat-label">Speed:</span>
                    <span class="stat-value">${pokemon.stats.vit}</span>
                    <progress value="${pokemon.stats.vit}" max="255" class="stat-progress" style="--stat-color: ${getStatColor(pokemon.stats.vit)}"></progress>
                </li>
            </ul>
        `;
        allPokemonContainer.appendChild(pokemonCard);
    }
}
);

// ============================================
// JEU 1 : QUI EST CE POKÉMON ?
// ============================================

// ============================================
// JEU 2 : COMBAT POKÉMON
// ============================================

// ============================================
// JEU 3 : PLUS OU MOINS
// ============================================

// ============================================
// JEU 4 : MEMORY POKÉMON
// ============================================

// ============================================
// JEU 5 : QUIZ POKÉMON
// ============================================
