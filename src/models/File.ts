import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import config from "../../config.js"

@Entity()
export default class File {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: config.MAX_CONTENT_NAME_LENGTH,
	})
	originalFilename: string

	@Column()
	filename: string

	@Column()
	size: number // in kilobytes

	@Column()
	expires: number
}