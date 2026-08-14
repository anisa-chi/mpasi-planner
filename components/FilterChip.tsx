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
      className={`px-2 border-2 border-ink wobble-d cursor-pointer ${
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
