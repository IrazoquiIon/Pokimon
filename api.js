// Fonction pour récupérer un Pokémon spécifique par son ID
const getPokemonById = async (id) => {
    try {
        const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pokemon = await response.json();
        return pokemon;
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error);
        return null;
    }
};

// Fonction pour générer un Pokémon aléatoire
const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return await getPokemonById(randomId);
};

export { getPokemonById, getRandomPokemon };