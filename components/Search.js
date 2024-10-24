import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const fetchSearchResults = async (term) => {
  if (term.length < 2) return [];
  const response = await fetch(`/api/search?q=${encodeURIComponent(term)}&category=all-categories`);
  return response.json();
};

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      setSearchTerm(term);
      const searchResults = await fetchSearchResults(term);
      onSearch(searchResults, term);
    }, 300),
    [onSearch]
  );

  return (
    <div className="searchContainer">
      <input
        type="text"
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="AI 서비스 검색..."
        className="searchInput"
      />
    </div>
  );
}
