import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

const fetchSearchResults = async (term) => {
  if (term.length < 2) return [];
  const response = await fetch(`/api/search?q=${encodeURIComponent(term)}&category=all-categories`);
  return response.json();
};

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      setSearchTerm(term);
      const searchResults = await fetchSearchResults(term);
      setResults(searchResults);
      onSearch(searchResults);
    }, 300),
    [onSearch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/result?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit} className="searchForm">
        <input
          type="text"
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="AI 서비스 검색..."
          className="searchInput"
        />
        <button type="submit" className="searchButton">검색</button>
      </form>
      {results.length > 0 && (
        <ul className="searchResults">
          {results.map((result) => (
            <li key={result.id} className="searchResultItem">
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
