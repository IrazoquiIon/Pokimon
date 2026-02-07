import { getRandomPokemon, getPokemonById } from './api.js';
// ============================================
// TEST: AFFICHER TOUS LES POKÉMONS
// ============================================

const allPokemonBtn = document.getElementById('allPokemonBtn');
const allPokemonContainer = document.getElementById('allPokemonContainer');

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
                <li>HP: ${pokemon.stats.hp}</li>
                <li>Attack: ${pokemon.stats.attack}</li>
                <li>Defense: ${pokemon.stats.defense}</li>
                <li>Special Attack: ${pokemon.stats.special_attack}</li>
                <li>Special Defense: ${pokemon.stats.special_defense}</li>
                <li>Speed: ${pokemon.stats.speed}</li>
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
