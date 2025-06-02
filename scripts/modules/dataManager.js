let cachedData = null;

export const fetchData = async () => {
    if (cachedData) {
        return cachedData;
    }
    
    try {
        const response = await fetch('../../json/data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch hero data');
        }
        
        const data = await response.json();
        cachedData = data;
        return data;
    } catch (error) {
        console.error('Error fetching hero data:', error);
        return {
            Marvel: [],
            DC_Comics: []
        };
    }
};


export const getRandomHero = (heroes) => {
    const randomIndex = Math.floor(Math.random() * heroes.length);
    return heroes[randomIndex];
};


export const calculateHeroPower = (hero) => {
    if (!hero || !hero.atributos) {
        return 0;
    }
    
    return hero.atributos.fuerza_fisica + 
           hero.atributos.velocidad + 
           hero.atributos.resistencia + 
           hero.atributos.inteligencia + 
           hero.atributos.habilidades_especiales;
};


export const searchHeroes = (heroes, query) => {
    if (!query || query.trim() === '') {
        return heroes;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return heroes.filter(hero => 
        hero.nombreFicticio.toLowerCase().includes(searchTerm) || 
        hero.nombreReal.toLowerCase().includes(searchTerm)
    );
};