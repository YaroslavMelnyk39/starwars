import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterDetail, fetchFromUrl } from '../api';
import { getImageUrlById } from '../utils';
import Starship, { IStarship } from './Starship';
import Spinner from './shared/Spinner';
import Specie, { ISpecie } from './Specie';
import ErrorMessage from './shared/ErrorMessage';

export interface ICharacter {
  name: string;
  birth_year: string;
  height: string;
  created: string;
  url: string;
}

const CharacterDetail = () => {
  const params = useParams();
  const { id }: { id?: number } = params;

  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [starships, setStarships] = useState<IStarship[]>([]);
  const [species, setSpecies] = useState<ISpecie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCharacterDetails = useCallback(async (_id: number) => {
    setLoading(true);
    try {
      const data = await fetchCharacterDetail(_id);
      setCharacter(data);
      const starshipsData = !data.starships.length ? [] : await Promise.all(data.starships.map((url: string) => fetchFromUrl(url)));
      setStarships(starshipsData);
      const speciesData = !data.species.length ? [] : await Promise.all(data.species.map((url: string) => fetchFromUrl(url)));
      setSpecies(speciesData);
      setError(null);
    } catch (error) {
      setError(`Failed to fetch character details: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(id) {
      loadCharacterDetails(id);
    }
  }, [id, loadCharacterDetails]);

  return (
    <div className="p-4">
      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {character && (
            <div className="bg-white p-6 rounded shadow-md">
              <div className="flex items-center mb-4">
                <img src={getImageUrlById(id)} alt={character.name} className="w-32 h-32 rounded-full shadow-md mr-4"/>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
                  <p className="text-gray-600"><strong>Birth Year:</strong> {character.birth_year}</p>
                  <p className="text-gray-600"><strong>Height:</strong> {character.height} cm</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Character Details:</h3>
                {species.length ? species.map((specie: ISpecie) => (
                    <Specie key={specie.name} {...specie} />
                )) : 'unknown'}
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Starships:</h3>
                {starships.length ? starships.map((ship: IStarship) => (
                  <Starship key={ship.model} {...ship} />
                )) : 'unknown'}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CharacterDetail;
