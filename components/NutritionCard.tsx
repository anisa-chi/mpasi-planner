import React from 'react';

interface NutritionCardProps {
	nutrition: {
		kalori: number;
		protein: number;
		karbohidrat: number;
		lemak: number;
	};
}

const NutritionCard: React.FC<NutritionCardProps> = ({
	nutrition: { kalori, protein, karbohidrat, lemak },
}) => {
	return (
		<div className='w-full mt-2 flex flex-col p-3 border-2 border-ink wobble-c'>
			<p className='text-sm text-ink/60'>Per 1 porsi</p>

			<div className='w-full flex flex-col p-3 gap-2'>
				<div className='w-full flex gap-2'>
					<div className='w-full flex flex-col justify-center items-center p-3 aspect-2/1 border-2 border-dashed border-paper-shadow rounded-lg'>
						<p className='text-2xl text-red font-display'>
							{kalori}
							<span className='text-sm text-red/60'>kkal</span>
						</p>
						<p className='text-ink/60'>Kalori</p>
					</div>
					<div className='w-full flex flex-col justify-center items-center p-3 aspect-2/1 border-2 border-dashed border-paper-shadow rounded-lg'>
						<p className='text-2xl text-green font-display'>
							{protein}
							<span className='text-sm text-green/60'>g</span>
						</p>
						<p className='text-ink/60'>Protein</p>
					</div>
				</div>

				<div className='w-full flex gap-2'>
					<div className='w-full flex flex-col justify-center items-center p-3 aspect-2/1 border-2 border-dashed border-paper-shadow rounded-lg'>
						<p className='text-2xl text-yellow font-display'>
							{karbohidrat}
							<span className='text-sm text-yellow/60'>g</span>
						</p>
						<p className='text-ink/60'>Karbohidrat</p>
					</div>
					<div className='w-full flex flex-col justify-center items-center p-3 aspect-2/1 border-2 border-dashed border-paper-shadow rounded-lg'>
						<p className='text-2xl text-ink/80 font-display'>
							{lemak}
							<span className='text-sm text-ink/60'>g</span>
						</p>
						<p className='text-ink/60'>Lemak</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NutritionCard;
