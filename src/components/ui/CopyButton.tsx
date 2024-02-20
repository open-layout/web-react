import React, { useState } from 'react';
import IconCopy from "@icons/copy.svg";
import IconTick from "@icons/tick.svg";

interface Props {
  npmCommand: string;
}

const CopyButton: React.FC<Props> = ({ npmCommand }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(npmCommand)
      .then(() => {
        console.log('Text copied: ' + npmCommand);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  };

  return (
    <div className="relative">
      <code className="bg-code text-white rounded-lg py-3 pl-5 pr-2 w-64 border border-title flex justify-between flex-row items-center">
        <p>
          <span className="text-gray-400">$</span> {npmCommand}<span className="animate-blink select-none">|</span>
        </p>
        {copied ? (
          <img
            src={IconTick}
            alt="Copied"
            className="w-6"
          />
        ) : (
          <img
            src={IconCopy}
            alt="Copy"
            className="w-6 transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer"
            onClick={handleClick}
          />
        )}
      </code>
    </div>
  );
};

export default CopyButton;
