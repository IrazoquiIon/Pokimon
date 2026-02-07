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
const paquet = 50;

const loadAllPokemon = async () => {
    loadingText.style.display = 'block';

    for (let i = 1; i <= 1025; i += paquet) {
        const promises = [];

        for (let id = i; id < i + paquet && id <= 1025; id++) {
            promises.push(getPokemonById(id));
        }

        const pokemons = await Promise.all(promises);

        pokemons.forEach((pokemon) => {
            if (!pokemon) return;
            renderPokemonCard(pokemon);
        });

        if (i === 1) {
            loadingText.style.display = 'none';
        }
    }
}

// Fonction pour créer une carte
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

    if (!pokemon) return;

    // Cacher la zone de recherche et la liste
    searchInput.style.display = 'none';
    allPokemonContainer.style.display = 'none';
    detailsContainer.style.display = 'block';

    window.scrollTo(0, 0);

    // Récupérer les éléments du DOM
    const backToListBtn = document.getElementById('backToList');
    const detailName = document.getElementById('detailName');
    const detailCategory = document.getElementById('detailCategory');
    const detailImage = document.getElementById('detailImage');
    const detailTypes = document.getElementById('detailTypes');
    const detailWeight = document.getElementById('detailWeight');
    const detailHeight = document.getElementById('detailHeight');
    const detailTalents = document.getElementById('detailTalents');
    const detailStats = document.getElementById('detailStats');
    const evolutionChain = document.getElementById('evolutionChain');
    const megaEvolutionChain = document.getElementById('megaEvolutionChain');
    const megaEvolutionContainer = document.getElementById('megaEvolutionContainer');
    const shinyImage = document.getElementById('shinyImage');

    // Afficher le bouton retour
    backToListBtn.style.display = 'block';

    // Mettre à jour les infos de base
    detailName.textContent = pokemon.name.fr;
    detailCategory.textContent = pokemon.category;
    detailImage.src = pokemon.sprites.regular;
    detailImage.alt = pokemon.name.fr;
    detailWeight.textContent = pokemon.weight;
    detailHeight.textContent = pokemon.height;

    // Mettre à jour les types
    detailTypes.innerHTML = '';
    pokemon.types.forEach(type => {
        const img = document.createElement('img');
        img.src = type.image;
        img.alt = type.name;
        img.classList.add('pokemon-type');
        detailTypes.appendChild(img);
    });

    // Mettre à jour les talents
    detailTalents.textContent = pokemon.talents
        .map(talent => `${talent.name}${talent.tc ? ' (TC)' : ''}`)
        .join(', ');

    // Mettre à jour les stats
    detailStats.innerHTML = '';
    const stats = [
        { label: 'HP', value: pokemon.stats.hp },
        { label: 'Attaque', value: pokemon.stats.atk },
        { label: 'Défense', value: pokemon.stats.def },
        { label: 'Atq. Spé', value: pokemon.stats.spe_atk },
        { label: 'Déf. Spé', value: pokemon.stats.spe_def },
        { label: 'Vitesse', value: pokemon.stats.vit }
    ];

    stats.forEach(stat => {
        const li = document.createElement('li');

        const label = document.createElement('span');
        label.classList.add('stat-label');
        label.textContent = `${stat.label}:`;

        const value = document.createElement('span');
        value.classList.add('stat-value');
        value.textContent = stat.value;

        const progress = document.createElement('progress');
        progress.classList.add('stat-progress');
        progress.value = stat.value;
        progress.max = 255;
        progress.style.setProperty('--stat-color', getStatColor(stat.value));

        li.appendChild(label);
        li.appendChild(value);
        li.appendChild(progress);
        detailStats.appendChild(li);
    });

    // Gérer les évolutions
    evolutionChain.innerHTML = '';
    if (pokemon.evolution) {
        // Pré-évolutions
        if (pokemon.evolution.pre && pokemon.evolution.pre.length > 0) {
            const preDiv = document.createElement('div');
            preDiv.classList.add('evolution-section');
            const title = document.createElement('h4');
            title.textContent = 'Pré-évolution :';
            preDiv.appendChild(title);

            for (const pre of pokemon.evolution.pre) {
                const evoItem = document.createElement('div');
                evoItem.classList.add('evolution-item');

                const prePokemon = await getPokemonById(pre.pokedex_id);
                if (prePokemon) {
                    const img = document.createElement('img');
                    img.src = prePokemon.sprites.regular;
                    img.alt = pre.name;
                    img.classList.add('pokemon-image');
                    evoItem.appendChild(img);
                }

                const name = document.createElement('p');
                name.textContent = pre.name;
                evoItem.appendChild(name);

                if (pre.condition) {
                    const condition = document.createElement('small');
                    condition.textContent = pre.condition;
                    evoItem.appendChild(condition);
                }

                preDiv.appendChild(evoItem);
            }

            evolutionChain.appendChild(preDiv);
        }

        // Évolutions suivantes
        if (pokemon.evolution.next && pokemon.evolution.next.length > 0) {
            const nextDiv = document.createElement('div');
            nextDiv.classList.add('evolution-section');
            const title = document.createElement('h4');
            title.textContent = 'Évolution suivante :';
            nextDiv.appendChild(title);

            for (const next of pokemon.evolution.next) {
                const evoItem = document.createElement('div');
                evoItem.classList.add('evolution-item');

                const nextPokemon = await getPokemonById(next.pokedex_id);
                if (nextPokemon) {
                    const img = document.createElement('img');
                    img.src = nextPokemon.sprites.regular;
                    img.alt = next.name;
                    img.classList.add('pokemon-image');
                    evoItem.appendChild(img);
                }

                const name = document.createElement('p');
                name.textContent = next.name;
                evoItem.appendChild(name);

                if (next.condition) {
                    const condition = document.createElement('small');
                    condition.textContent = next.condition;
                    evoItem.appendChild(condition);
                }

                nextDiv.appendChild(evoItem);
            }

            evolutionChain.appendChild(nextDiv);
        }
    }

    // Gérer les méga-évolutions
    megaEvolutionChain.innerHTML = '';
    if (pokemon.evolution && pokemon.evolution.mega && pokemon.evolution.mega.length > 0) {
        megaEvolutionContainer.style.display = 'block';

        pokemon.evolution.mega.forEach(mega => {
            const megaItem = document.createElement('div');
            megaItem.classList.add('mega-item');

            const img = document.createElement('img');
            img.src = mega.sprites.regular;
            img.alt = mega.orbe;
            img.classList.add('pokemon-image');

            const orbe = document.createElement('p');
            orbe.textContent = mega.orbe;

            megaItem.appendChild(img);
            megaItem.appendChild(orbe);
            megaEvolutionChain.appendChild(megaItem);
        });
    } else {
        megaEvolutionContainer.style.display = 'none';
    }

    // Mettre à jour l'image shiny
    shinyImage.src = pokemon.sprites.shiny;
    shinyImage.alt = `${pokemon.name.fr} Shiny`;

    // Gérer le bouton retour (enlever les anciens listeners)
    const newBackBtn = backToListBtn.cloneNode(true);
    backToListBtn.parentNode.replaceChild(newBackBtn, backToListBtn);

    newBackBtn.addEventListener('click', () => {
        detailsContainer.style.display = 'none';
        allPokemonContainer.style.display = 'grid';
        searchInput.style.display = 'block';
    });
};

// Fonction de recherche
searchInput.addEventListener('input', (e) => {
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    const searchTerm = e.target.value.toLowerCase();
    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = pokemonName.includes(searchTerm) ? 'block' : 'none';
    });
});