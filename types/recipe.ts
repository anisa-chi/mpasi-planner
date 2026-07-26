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
	bahan: string[];
	metode_masak: {
		nama: string;
		langkah: string[];
	}[];
	foto: string;
}