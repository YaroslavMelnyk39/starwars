export const fetchCharacters = async (page: number, search: string = '') => {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}&search=${search}`);
    const data = await response.json();
    return data;
};
  
export const fetchCharacterDetail = async (id?: number) => {
    if(!id) return null;
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const data = await response.json();
    return data;
};

export const fetchFromUrl = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
