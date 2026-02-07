import { getPokemonById } from '../../api.js';

const detailsContainer = document.getElementById('pokemonDetailsContainer');
const allPokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const loadingText = document.querySelector('.loading');

// Fonction pour obtenir la couleur selon la valeur
const getStatColor = (value) => {
    if (value <= 50) return '#ef4444'; // Rouge
    if (value <= 80) return '#f59e0b'; // Orange
    if (value <= 110) return '#eab308'; // Jaune
    if (value <= 140) return '#84cc16'; // Vert clair
    return '#22c55e'; // Vert foncé
};

// On définit la taille des paquets (ex: 50 par 50)
const BATCH_SIZE = 50;

const loadAllPokemon = async () => {
    // On affiche le texte de chargement au début
    loadingText.style.display = 'block';

    for (let i = 1; i <= 1025; i += BATCH_SIZE) {
        const promises = [];
        
        // On prépare un petit lot (ex: de 1 à 50, puis 51 à 100...)
        for (let id = i; id < i + BATCH_SIZE && id <= 1025; id++) {
            promises.push(getPokemonById(id));
        }

        // On attend juste ce petit lot
        const pokemons = await Promise.all(promises);

        // On affiche ce lot immédiatement
        pokemons.forEach((pokemon) => {
            if (!pokemon) return;
            renderPokemonCard(pokemon); // On utilise une fonction séparée pour la clarté
        });

        // Une fois que le PREMIER lot est affiché, on peut cacher le texte de chargement
        if (i === 1) {
            loadingText.style.display = 'none';
        }
    }
}

// Fonction pour créer une carte (extraite pour plus de propreté)
const renderPokemonCard = (pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.style.cursor = 'pointer';

    const typesHTML = pokemon.types.map(type =>
        `<img src="${type.image}" alt="${type.name}" class="pokemon-type">`
    ).join('');

    pokemonCard.innerHTML = `
        <h3 class="pokemon-name">${pokemon.name.fr}</h3>
        <img src="${pokemon.sprites.regular}" alt="${pokemon.name.fr}" class="pokemon-image">
        <div class="pokemon-types">${typesHTML}</div>
    `;

    pokemonCard.addEventListener('click', () => {
        loadPokemonDetails(pokemon.pokedex_id);
    });

    allPokemonContainer.appendChild(pokemonCard);
};

loadAllPokemon();

const loadPokemonDetails = async (id) => {
    const pokemon = await getPokemonById(id);
    //cacher la zone de recherche
    searchInput.style.display = 'none';

    window.scrollTo(0, 0); // Faire défiler vers le haut de la page
    if (!pokemon) return; // Si le pokémon n'existe pas, ne rien faire


    // Masquer la liste et afficher les détails
    allPokemonContainer.style.display = 'none';
    detailsContainer.style.display = 'block';

    // Créer les images de types
    const typesHTML = pokemon.types.map(type =>
        `<img src="${type.image}" alt="${type.name}" class="pokemon-type">`
    ).join('');

    detailsContainer.innerHTML = `
        <button class="back-btn" id="backToList">← Retour à la liste</button>
        <h2 class="pokemon-name">${pokemon.name.fr}</h2>
        <img src="${pokemon.sprites.regular}" alt="${pokemon.name.fr}" class="pokemon-image-large">
        <div class="pokemon-types">${typesHTML}</div>
        <h3>Stats :</h3>
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

    // Bouton retour vers la liste
    document.getElementById('backToList').addEventListener('click', () => {
        detailsContainer.style.display = 'none';
        allPokemonContainer.style.display = 'grid';
        searchInput.style.display = 'block';
    });
};

searchInput.addEventListener('input', (e) => {

    const pokemonCards = document.querySelectorAll('.pokemon-card');
    const searchTerm = e.target.value.toLowerCase();
    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = pokemonName.includes(searchTerm) ? 'block' : 'none';
    });
});
