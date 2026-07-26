import { Recipe } from '@/types/recipe';
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data', 'recipes')

export const getAllRecipes = (): Recipe[] => {
	const files = fs.readdirSync(dataDir);
	return files.map((filename) => {
		const content = fs.readFileSync(path.join(dataDir, filename), 'utf-8')
		return { id: filename.replace('.json', ""), ...JSON.parse(content) }
	})
}

export const getRecipeById = (id: string): Recipe => {
	const filePath = path.join(dataDir, `${id}.json`)
	const content = fs.readFileSync(filePath, 'utf-8')
	return { id, ...JSON.parse(content) }
}

export const getAllRecipeIds = (): string[] => {
	const files = fs.readdirSync(dataDir)
	return files.map((filename) => filename.replace('.json', ""))
}