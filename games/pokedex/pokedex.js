import { getPokemonById } from '../../api.js';

// Fonction pour obtenir la couleur selon la valeur
const getStatColor = (value) => {
    if (value <= 50) return '#ef4444'; // Rouge
    if (value <= 80) return '#f59e0b'; // Orange
    if (value <= 110) return '#eab308'; // Jaune
    if (value <= 140) return '#84cc16'; // Vert clair
    return '#22c55e'; // Vert foncé
};

// Fonction async pour charger tous les Pokémon
const loadAllPokemon = async () => {
    const allPokemonContainer = document.getElementById('allPokemonContainer');
    
    for (let id = 1; id <= 1025; id++) {
        const pokemon = await getPokemonById(id);
        
        if (!pokemon) continue; // Si le pokémon n'existe pas, passer au suivant
        
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        
        // Créer les images de types
        const typesHTML = pokemon.types.map(type =>
            `<img src="${type.image}" alt="${type.name}" class="pokemon-type">`
        ).join('');
        
        pokemonCard.innerHTML = `
            <h3>${pokemon.name.fr}</h3>
            <img src="${pokemon.sprites.regular}" alt="${pokemon.name.fr}" class="pokemon-image">
            <div class="pokemon-types">${typesHTML}</div>
        `;
        
        allPokemonContainer.appendChild(pokemonCard);
    }
};

// Lancer le chargement au chargement de la page
loadAllPokemon();