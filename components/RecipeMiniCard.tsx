'use client';

import { MiniRecipe } from '@/types/recipe';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RecipeMiniCardProps {
	title: string;
	menus: MiniRecipe[];
  onRemove: (id: string) => void
}

const RecipeMiniCard: React.FC<RecipeMiniCardProps> = ({ title, menus, onRemove }) => {
	return (
		<div className='mb-2'>
			<p className='text-lg font-bold text-ink/60'>{title}</p>

			{menus.length === 0 ? (
				<p className='ml-3 text-sm text-ink/60'>Belum ada resep</p>
			) : (
				menus.map((menu) => (
					<div
						key={menu.id}
						className='w-full p-3 flex justify-around items-center border-2 border-ink wobble-c cursor-pointer'
					>
						<Link
							href={`/recipes/${menu.id}`}
							className='w-full flex items-center gap-2'
						>
							<div className='relative w-8 h-8 rounded-md overflow-hidden shrink-0'>
								<Image
									src={`/recipes/${menu.foto}`}
									alt={menu.nama}
									fill
									sizes='32px'
									className='object-cover'
								/>
							</div>
							<p className='text-ink font-bold'>{menu.nama}</p>
						</Link>

						<div className='ml-auto z-30'>
							<button
								className='cursor-pointer'
								onClick={() => onRemove(menu.id)}
							>
								<X size={16} strokeWidth={2.5} className='text-red' />
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default RecipeMiniCard;
