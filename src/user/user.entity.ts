import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}