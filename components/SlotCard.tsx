import { Trash, X } from 'lucide-react';
import React from 'react';

interface SlotCardProps {
  slotName: string;
  recipeName?: string;
  recipeCover?: string;
  onClick: () => void;
  onDelete: () => void;
}

const SlotCard: React.FC<SlotCardProps> = ({
  slotName,
  recipeCover,
  recipeName,
  onClick,
  onDelete,
}) => {
  return (
    <div className='w-full p-3 flex gap-3 border-2 rounded-[16px_8px_18px_6px/8px_18px_6px_12px]'>
      {recipeName ? (
        <>
          <div className='doodle-icon'>
            <Trash size={16} strokeWidth={2.5} className='text-ink' />
          </div>
        </>
      ) : (
        <p className='text-ink/60 font-body italic text-sm'>
          Tap untuk pilih resep
        </p>
      )}
    </div>
  );
};

export default SlotCard;
