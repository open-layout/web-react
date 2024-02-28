import React, { useState } from 'react';

import IconCopy from '@icons/copy.svg';
import IconTick from '@icons/tick.svg';

interface Props {
  npmCommand: string;
}

const CopyButton: React.FC<Props> = ({ npmCommand }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard
      .writeText(npmCommand)
      .then(() => {
        console.log('Text copied: ' + npmCommand);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error('Error copying text: ', err);
      });
  };

  return (
    <div className="relative hidden lg:block">
      <code className="bg-code text-white rounded-lg py-3 pl-5 pr-2 w-64 border border-title flex justify-between flex-row items-center">
        <p>
          <span className="text-gray-400">$</span> {npmCommand}
          <span className="animate-blink select-none">|</span>
        </p>
        <div className="relative group">
          <img
            src={copied ? IconTick : IconCopy}
            alt={copied ? 'Copied' : 'Copy'}
            className="w-6 transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer"
            onClick={handleClick}
          />
          <span className="mb-2 absolute group bottom-full left-1/2 transform -translate-x-1/2 bg-gray-700 border border-gray-600 text-white text-xs py-1 px-2 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 select-none">
            {copied ? 'Copied' : 'Copy'}
          </span>
        </div>
      </code>
    </div>
  );
};

export default CopyButton;
