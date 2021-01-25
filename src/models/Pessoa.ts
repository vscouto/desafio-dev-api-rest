import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa')
class Pessoa {
	@PrimaryGeneratedColumn('increment', { name: 'idpessoa' })
	idPessoa: number;

	@Column()
	nome: string;

	@Column()
	cpf: string;

	@Column({ name: 'datanascimento' })
	dataNascimento: Date;
}

export default Pessoa;

/*
create table pessoa (
	idPessoa			serial primary key,
	nome				varchar not null,
	cpf					varchar not null,
	dataNascimento		date not null
);
 */
