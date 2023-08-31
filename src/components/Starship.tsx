import React from 'react';

export interface IStarship {
  name: string;
  model: string;
  passengers: string;
  starship_class: string;
}

const Starship: React.FC<IStarship> = ({ name, model, passengers, starship_class }) => {
  return (
    <div className="border p-4 my-2 rounded shadow-md hover:bg-gray-100">
      <h3 className="text-lg font-bold">{name}</h3>
      <p><strong>Model:</strong> {model}</p>
      <p><strong>Classification:</strong> {starship_class}</p>
      <p><strong>Passengers:</strong> {passengers}</p>
    </div>
  );
}

export default Starship;
