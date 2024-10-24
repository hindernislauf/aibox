import { useState, useCallback, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import styles from '../styles/Search.module.css';

const fetchSearchResults = async (term) => {
  if (term.length < 2) return [];
  const response = await fetch(`/api/search?q=${encodeURIComponent(term)}&category=all-categories`);
  return response.json();
};

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      setSearchTerm(term);
      const searchResults = await fetchSearchResults(term);
      onSearch(searchResults, term);
    }, 300),
    [onSearch]
  );

  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onSearch([], '');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="AI 서비스 검색..."
        className={styles.searchInput}
        ref={inputRef}
      />
      <button onClick={handleClear} className={styles.clearButton}>
        ESC (Delete all)
      </button>
    </div>
  );
}
