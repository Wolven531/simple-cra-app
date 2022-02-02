import { IChampImage } from './IChampImage'

export interface IChampDisplay {
	version: string
	id: string
	key: string
	name: string
	title: string
	blurb: string
	info: []
	image: IChampImage
	tags: []
	partype: string
}
