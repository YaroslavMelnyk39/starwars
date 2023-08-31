import React from 'react';

export interface ISpecie {
  name: string;
  average_lifespan: string;
  classification: string;
  language: string;
}

const Specie: React.FC<ISpecie> = ({ average_lifespan, classification, language }) => {
  return (
    <div className="border p-4 my-2 rounded shadow-md hover:bg-gray-100">
      <p><strong>Classification:</strong> {classification}</p>
      <p><strong>Average Lifespan:</strong> {average_lifespan}</p>
      <p><strong>Language:</strong> {language}</p>
    </div>
  );
}

export default Specie;
