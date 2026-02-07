import { getPokemonById } from '../../api.js';

const detailsContainer = document.getElementById('pokemonDetailsContainer');
const allPokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');

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
    // 1. Créer un tableau de promesses pour les 151 premiers (ou plus)
    // On commence par 151 pour que ce soit instantané, tu pourras augmenter après
    const promises = [];
    for (let id = 1; id <= 1025; id++) {
        promises.push(getPokemonById(id));
    }

    // 2. Attendre que TOUTES les requêtes reviennent en même temps
    const allPokemons = await Promise.all(promises);

    // 3. Une fois qu'on a tout, on affiche tout d'un coup
    allPokemons.forEach((pokemon, index) => {
        if (!pokemon) return;

        const id = index + 1;
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.dataset.pokemonId = id;
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
            loadPokemonDetails(id);
        });

        allPokemonContainer.appendChild(pokemonCard);
    });
};

// Lancer le chargement au chargement de la page
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
