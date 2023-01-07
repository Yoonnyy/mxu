import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import config from "../../config.js"

@Entity()
export default class URL {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: config.MAX_URL_LENGTH
	})
	URL: string

	@Column()
	shortenedURL: string

	@Column()
	expires: number
}