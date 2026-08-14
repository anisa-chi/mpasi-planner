'use client';

import { X } from 'lucide-react';
import { motion } from 'motion/react';
import Stamp from './Stamp';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Label } from '@/types/label';

interface LabelPickerModalProps {
	recipeId: string;
	recipeName: string;
	currentLabel: Label[] | [];
	onLabelChange: (labels: Label[]) => void;
	onClose: () => void;
}

const LabelPickerModal: React.FC<LabelPickerModalProps> = ({
	recipeId,
	recipeName,
	currentLabel,
	onLabelChange,
	onClose,
}) => {
	const [activeLabel, setActiveLabel] =
		useState<{ text: string; varian: 'suka' | 'tidak suka' | 'belum' }[]>(
			currentLabel
		);

	const STAMP_OPTIONS = [
		{ text: 'Affan Suka', varian: 'suka' },
		{ text: 'Affan Tidak Suka', varian: 'tidak suka' },
		{ text: 'Bilal Suka', varian: 'suka' },
		{ text: 'Bilal Tidak Suka', varian: 'tidak suka' },
		{ text: 'Belum Coba', varian: 'belum' },
	] as const;

	const isLabelActive = (labelText: string) =>
		activeLabel.some((l) => l.text === labelText);

	const labelSelected = async (label: {
		text: string;
		varian: 'suka' | 'tidak suka' | 'belum';
	}) => {
		if (isLabelActive(label.text)) {
			const { error } = await supabase
				.from('recipe_labels')
				.delete()
				.eq('recipe_id', recipeId)
				.eq('text', label.text);

			if (error) {
				console.log('Gagal hapus label.', error);
				return;
			}
			const newLabels = activeLabel.filter((l) => l.text !== label.text);
			setActiveLabel(newLabels);
			onLabelChange(newLabels);
		} else {
			const { error } = await supabase.from('recipe_labels').insert({
				recipe_id: recipeId,
				text: label.text,
				varian: label.varian,
			});

			if (error) {
				console.log('Gagal menambahkan label.', error);
				return;
			}
			const newLabels = [...activeLabel, label];
			setActiveLabel(newLabels);
			onLabelChange(newLabels);
		}
	};

	return (
		<>
			<div className='fixed z-40 bottom-0 top-0 right-0 left-0 bg-ink/30' />
			<motion.div
				initial={{ y: '100%' }}
				animate={{ y: 0 }}
				exit={{ y: '100%' }}
				transition={{ type: 'spring', damping: 30, stiffness: 300 }}
				className='fixed bottom-0 left-0 right-0 z-50 border-2 border-ink rounded-t-xl bg-paper'
			>
				<div>
					<div className='p-3 mb-2 flex justify-between items-center border-b-2 border-dashed border-paper-shadow'>
						<p className='font-bold'>Edit Label - {recipeName}</p>
						<button className='cursor-pointer' onClick={onClose}>
							<X width={16} strokeWidth={2.5} className='text-ink' />
						</button>
					</div>

					<div className='px-6 flex flex-col'>
						{STAMP_OPTIONS.map((option, index) => (
							<button
								key={index}
								onClick={() => labelSelected(option)}
								className='py-2 flex justify-between items-center border-b-2 border-dashed border-paper-shadow cursor-pointer'
							>
								<Stamp text={option.text} varian={option.varian} />
								<div
									className={`h-4 w-4 border-2 border-ink rounded-full ${
										isLabelActive(option.text) ? 'bg-ink' : 'bg-paper'
									}`}
								/>
							</button>
						))}
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default LabelPickerModal;
