import { useState, useEffect, useCallback } from 'react';
import { fetchCharacters } from '../api';
import { Link } from 'react-router-dom';
import Pagination from './shared/Pagination';
import { formatCreatedDate } from '../utils';
import useDebounce from '../utils/useDebounce';
import Spinner from './shared/Spinner';
import { ICharacter } from './CharacterDetail';
import ErrorMessage from './shared/ErrorMessage';

const DEBOUNCE_VALUE = 500;
const FIRST_PAGE = 1;
const COUNT_PER_PAGE = 10;

function CharacterList() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [page, setPage] = useState(FIRST_PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_VALUE);

  const loadCharacters = useCallback(async (_page: number, _searchTerm: string) => {
    setLoading(true);
    try {
      const data = await fetchCharacters(_page, _searchTerm);
      if(COUNT_PER_PAGE === data.results.length || data.count <= COUNT_PER_PAGE) {
        setTotalPages(Math.ceil(data.count / COUNT_PER_PAGE));
      }
      setError(null);
      setTotalItems(data.count);
      setCharacters(data?.results || []);
    } catch (err) {
      setError("Failed to fetch characters. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePageData = useCallback((newPage: number) => {
    setPage(newPage);
    loadCharacters(newPage, debouncedSearchTerm);
  }, [loadCharacters, debouncedSearchTerm]);

  useEffect(() => {
    updatePageData(FIRST_PAGE);
  }, [debouncedSearchTerm, updatePageData]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          className="p-2 border rounded w-full"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
        />
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <p className="text-center mb-2">{`Items found: ${totalItems}`}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {characters.map((character) => (
              <Link 
                to={`/character/${character.url.split('/people/')[1].replace('/', '')}`}
                key={character.url}
                className="hover:underline hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="card bg-white p-4 rounded-lg shadow-md hover:bg-gray-100">
                  <h3 className="text-lg font-bold mb-2">{character.name}</h3>
                  <p className="text-gray-600"><strong>Birth Year:</strong> {character.birth_year}</p>
                  <p className="text-gray-600"><strong>Height:</strong> {character.height} cm</p>
                  <p className="text-gray-600"><strong>Created:</strong> {formatCreatedDate(character.created)}</p>
                </div>
              </Link>
            ))}
          </div>
          {characters.length > 0 && (<Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={updatePageData}
          />)}
        </>
      )}
    </div>
  );
}

export default CharacterList;
