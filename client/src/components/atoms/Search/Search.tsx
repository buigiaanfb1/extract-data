import React, { useState } from 'react';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }: SearchProps) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSearch(value);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={handleChange} value={value} aria-label="input" />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
