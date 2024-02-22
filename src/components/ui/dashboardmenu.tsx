import React, { useState, useRef } from 'react';
import Switch from '@/components/ui/Switch';
import IconQuestionMark from '@icons/question-mark.svg';
import IconSearch from '@icons/search.svg';

interface DashboardMenuProps {}

const DashboardMenu: React.FC<DashboardMenuProps> = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [autocompleteTerm, setAutocompleteTerm] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dropdownOptions: string[] = ['author', 'layout', 'category', 'lang'];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = event.target;
    setSearchTerm(value);
    setAutocompleteTerm('');
    setSelectedOption(null);

    if (value.trim() !== '') {
      const lastWord = value.slice(0, selectionStart).split(' ').pop();
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
    setSearchTerm(option);
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
    <nav className="fixed left-10 top-60 menu-container grid place-items-center">
      <div className="flex flex-col items-center bg-gray-700/40 border-gray-700/50 border rounded-md  py-1 px-2 mt-3">
        <div className="flex flex-col items-center select-none text-white gap-5 p-4">
          <Switch />
          <div className="flex flex-row relative">
            <div className="relative flex flex-row gap-2">
              <input
                ref={searchInputRef}
                className={`rounded-md w-72 pl-1 bg-code border border-gray-600 hover:border-gray-500 focus:border-gray-400 focus:outline-none transition-colors duration-200 ease-in-out ${
                  selectedOption ? 'border-yellow-400' : ''
                }`}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <img
                src={IconSearch}
                className="absolute right-7 top-1/2 transform -translate-y-1/2 w-5 h-6 text-gray-400 cursor-pointer"
                alt="Search"
              />
              <img
                src={IconQuestionMark}
                alt="Question Mark"
                className="w-4 cursor-pointer"
                onClick={handleQuestionMarkClick}
              />
              {autocompleteTerm && (
                <span className="absolute top-0 left-0 ml-1 text-gray-400">
                  {searchTerm + autocompleteTerm}
                </span>
              )}
            </div>
            {showDropdown && (
              <div className="absolute top-full left-0  text-white rounded-md mt-1 w-72">
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
          </div>

          <a href="#" className="ml-1 pr-1">
            Filter
          </a>
          <a href="#" className="ml-1 pr-1">
            Order
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DashboardMenu;
