import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import config from "../../config.js"

@Entity()
export default class File {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: config.MAX_FILE_NAME_LENGTH,
	})
	originalFilename: string

	@Column()
	filename: string

	@Column()
	size: number // in bytes

	@Column()
	expires: number

	@Column()
	path: string
}