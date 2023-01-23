import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import config from "../../config.js"

@Entity()
export default class Shortened {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	type: "file" | "url"
	
	// TODO: relationships (?MAYBE?)
	@Column()
	URL: string
}