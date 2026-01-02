let cachedData = null;

/**
 * Fetch all heroes from Akabab API
 */
export const fetchData = async () => {
    if (cachedData) return cachedData;

    try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch hero data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched hero data:", data);
        cachedData = data;
        return data;
    } catch (error) {
        console.error('Error fetching hero data:', error);
        return [];
    }
};

/**
 * Return a random hero from a list
 */
export const getRandomHero = (heroes) => {
    if (!heroes || heroes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * heroes.length);
    console.log("Random index:", randomIndex);
    return heroes[randomIndex];
};

/**
 * Calculate total hero power from powerstats
 */
export const calculateHeroPower = (hero) => {
    if (!hero || !hero.powerstats) return 0;

    const stats = hero.powerstats;
    return (stats.intelligence || 0) +
           (stats.strength || 0) +
           (stats.speed || 0) +
           (stats.durability || 0) +
           (stats.power || 0) +
           (stats.combat || 0);
};

/**
 * Search heroes by name or full name
 */
export const searchHeroes = (heroes, query) => {
    if (!query || query.trim() === '') return heroes;

    const searchTerm = query.toLowerCase().trim();
    
    return heroes.filter(hero => {
        // Buscar en nombre
        const nameMatch = hero.name?.toLowerCase().includes(searchTerm);
        
        // Buscar en nombre completo
        const fullNameMatch = hero.biography?.fullName?.toLowerCase().includes(searchTerm);
        
        // Buscar en aliases
        const aliases = hero.biography?.aliases || [];
        const aliasMatch = aliases.some(alias => 
            alias.toLowerCase().includes(searchTerm)
        );
        
        // Buscar en poderes
        const powers = hero.poderes || hero.powers || '';
        const powerMatch = powers.toLowerCase().includes(searchTerm);
        
        // Buscar en publisher
        const publisherMatch = hero.biography?.publisher?.toLowerCase().includes(searchTerm);
        
        return nameMatch || fullNameMatch || aliasMatch || powerMatch || publisherMatch;
    });
};