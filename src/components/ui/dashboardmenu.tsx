import React, { useState, useRef, useEffect } from 'react';
import IconQuestionMark from '@icons/question-mark.svg';
import IconSearch from '@icons/search.svg';

interface DashboardMenuProps {}

const DashboardMenu: React.FC<DashboardMenuProps> = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [autocompleteTerm, setAutocompleteTerm] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [logoutMessageVisible, setLogoutMessageVisible] =
    useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dropdownOptions: string[] = [
    'author:',
    'layout:',
    'category:',
    'lang:',
  ];

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

  const handleLogout = () => {
    localStorage.clear();
    setLogoutMessageVisible(true);
    setTimeout(() => {
      setLogoutMessageVisible(false);
      window.location.href = '/';
    }, 2000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && autocompleteTerm !== '') {
      event.preventDefault();
      setSearchTerm(searchTerm + autocompleteTerm);
      setAutocompleteTerm('');
    }
  };

  useEffect(() => {
    if (logoutMessageVisible) {
      setTimeout(() => {
        setLogoutMessageVisible(false);
        window.location.href = '/';
      }, 2000);
    }
  }, [logoutMessageVisible]);

  const getUserFromLocalstorage = () => {
    try {
      return JSON.parse(localStorage.getItem('ol_user') as string);
    } catch (e) {
      return null;
    }
  };

  return (
    <nav className="2xl:fixed left-16 top-72 menu-container grid place-items-center">
      <div className="notification-container">
        {logoutMessageVisible && (
          <div className="notification bg-green-500 text-white py-2 px-4 mb-2 rounded-md">
            Log out successful
          </div>
        )}
      </div>
      <div className="flex flex-col items-center select-none w-52 h-52 bg-gray-700 border rounded-xl border-gray-600 text-white gap-5 p-4">
        <div className=" flex flex-row items-center self-start gap-1">
          <img
            src={getUserFromLocalstorage()?.avatar}
            alt="Pfp"
            className="w-10 rounded-md "
          />
          <p>{getUserFromLocalstorage()?.username}</p>
        </div>
        <a
          className="bg-red-500 px-2 py-1 border border-red-700 rounded-lg"
          onClick={handleLogout}>
          Log out
        </a>
      </div>
    </nav>
  );
};

export default DashboardMenu;
