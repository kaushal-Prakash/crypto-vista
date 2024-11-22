import React from "react";

const CardLabel: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="px-4 rounded-lg shadow-md border border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <p className="font-semibold text-lg text-center">{text}</p>
    </div>
  );
};

export default CardLabel;
