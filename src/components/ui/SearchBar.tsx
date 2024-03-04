import React, { useState, useRef, useEffect } from 'react';
import IconQuestionMark from '@icons/question-mark.svg';
import IconSearch from '@icons/search.svg';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Definimos la firma de la función de devolución de llamada
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [autocompleteTerm, setAutocompleteTerm] = useState<string>('');
  const [randomPlaceholder, setRandomPlaceholder] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dropdownOptions: string[] = [
    'author:',
    'category:',
    'language:',
    'layout:',
  ];

  const random_seach = [
    'Awesome portfolio layout',
    'Orbit of imagination layout',
    'Automatic github portfolio',
    'Simple star destroyer layout to make at home',
    'oppen-heimer famous project'
  ]

  useEffect(() => {
    const placeholder = random_seach[Math.floor(Math.random() * random_seach.length)];

    if (!randomPlaceholder)
      setRandomPlaceholder(placeholder);
  }, [window.location]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = event.target;
    setSearchTerm(value);
    setAutocompleteTerm('');
    setSelectedOption(null);
    onSearch(value);

    if (value.trim() !== '') {
      const lastWord = value.slice(0, selectionStart as number).split(' ').pop();
      if (lastWord) {
        const matchedOption = dropdownOptions.find((option) =>
          option.toLowerCase().startsWith(lastWord.toLowerCase())
        );
        if (matchedOption) {
          setAutocompleteTerm(matchedOption.slice(lastWord.length));
          setSelectedOption(matchedOption);
        }
      }
    }
  };

  const handleDropdownItemClick = (option: string) => {
    setSearchTerm((prevSearchTerm) => prevSearchTerm.trim() + ' ' + option);
    setShowDropdown(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleQuestionMarkClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && autocompleteTerm !== '') {
      event.preventDefault();
      setSearchTerm(searchTerm + autocompleteTerm);
      setAutocompleteTerm('');
    }
  };

  return (
    <nav className="relative gap-2 w-full">
      <div className="flex justify-center w-full mt-5 relative">
        <input
          ref={searchInputRef}
          type="text"
          placeholder={randomPlaceholder}
          className={`rounded-xl text-xl pl-4 w-full h-14 bg-code border border-gray-500 hover:border-gray-400 focus:border-gray-300 focus:outline-none transition-colors duration-200 ease-in-out ${
            selectedOption ? 'border-yellow-400' : ''
          }`}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <img
          src={IconSearch}
          className="absolute right-12 top-2 w-10 text-gray-400 cursor-pointer"
          alt="Search"
        />
        <img
          src={IconQuestionMark}
          alt="Question Mark"
          className="w-10 cursor-pointer"
          onClick={handleQuestionMarkClick}
        />
      </div>
      {autocompleteTerm && (
        <span className="absolute z-50 left-3 mt-2 shadow-gray-700 shadow-lg bg-code border border-gray-700 rounded-md px-2 py-1 -translate-y-1/2 text-xl ml-1 text-white pointer-events-none">
          {searchTerm + autocompleteTerm}
        </span>
      )}
      {showDropdown && (
        <div className="absolute z-50 text-white rounded-md">
          {dropdownOptions.map((option, index) => (
            <div
              key={index}
              className={`cursor-pointer px-3 my-1 border border-gray-400 mx-1 py-1 bg-title/80 rounded-md hover:bg-title transition-colors duration-200 ease-in-out ${
                selectedOption === option ? 'bg-black' : ''
              }`}
              onClick={() => handleDropdownItemClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default SearchBar;
