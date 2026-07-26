import React from 'react';

interface FilterChipProps {
  filter: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  filter,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`px-4 py-1 border-2 border-ink rounded-full cursor-pointer ${
        isActive ? 'bg-ink' : 'bg-paper'
      }`}
      onClick={onClick}
    >
      <span className={`text-sm ${isActive ? 'text-paper' : 'text-ink'}`}>
        {filter}
      </span>
    </button>
  );
};

export default FilterChip;
