'use client';

import React, { useState } from 'react';
import Stamp from './Stamp';
import { AnimatePresence } from 'motion/react';
import LabelPickerModal from './LabelPickerModal';
import { Label } from '@/types/label';

interface RecipeMetaProps {
	recipeId: string;
	recipeName: string;
	kategoriUmur: string;
	jenisMenu: string;
	alergen: string[];
	label: Label[];
}

const RecipeMeta: React.FC<RecipeMetaProps> = ({
	recipeId,
	recipeName,
	kategoriUmur,
	jenisMenu,
	alergen,
	label,
}) => {
	const [openLabelModal, setOpenLabelModal] = useState(false);
	const [labels, setLabels] = useState(label);

	return (
		<div>
			<div className='mt-2 flex gap-2'>
				<span className='border-2 border-ink px-3 py-1.5 text-sm wobble-b'>
					{jenisMenu}
				</span>
				<span className='border-2 border-ink px-3 py-1.5 text-sm wobble-c'>
					{kategoriUmur}
				</span>
			</div>

			<div className='mt-2'>
				{labels.length !== 0 && (
					<div className='flex gap-2'>
						{labels.map((l) => (
							<Stamp key={l.text} text={l.text} varian={l.varian} />
						))}
					</div>
				)}
				<button
					onClick={() => setOpenLabelModal(true)}
					className='mt-2 px-2 py-1 border-2 border-dashed border-ink/60 rounded-lg text-sm focus:border-2 focus:border-dashed focus:border-ink/60 text-ink/60 cursor-pointer'
				>
					+ edit label
				</button>
			</div>

			{alergen.length !== 0 && (
				<div className='mt-2 w-full px-3 py-1.5 border-2 border-red rounded-[12px_8px_18px_6px/8px_18px_6px_12px]'>
					<p className='text-sm text-red'>
						⚠ Mengandung alergen: {alergen.join(', ')}
					</p>
				</div>
			)}

			<AnimatePresence>
				{openLabelModal && (
					<LabelPickerModal
						recipeId={recipeId}
						recipeName={recipeName}
						currentLabel={label}
						onLabelChange={setLabels}
						onClose={() => setOpenLabelModal(false)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default RecipeMeta;
