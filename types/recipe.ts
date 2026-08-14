export interface Recipe {
	id: string;
	nama: string;
	kategori_umur: string;
	kategori_menu: string;
	alergen: string[];
	porsi: string;
	gizi: {
		kalori: number,
		protein: number,
		karbohidrat: number,
		lemak: number
	};
	bahan: { nama: string, jumlah: string }[];
	metode_masak: {
		nama: string;
		langkah: string[];
	}[];
	foto: string;
}

export interface MiniRecipe {
	id: string;
	nama: string;
	foto: string;
}