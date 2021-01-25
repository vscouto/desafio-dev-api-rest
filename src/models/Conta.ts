import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import Pessoa from './Pessoa';

@Entity('conta')
class Conta {
	@PrimaryGeneratedColumn('increment', { name: 'idconta' })
	idConta: number;

	@Column({ name: 'idpessoa' })
	idPessoa: number;

	@ManyToOne(() => Pessoa, { eager: true })
	@JoinColumn({ name: 'idpessoa' })
	pessoa: Pessoa;

	@Column()
	saldo: number;

	@Column({ name: 'limitesaquediario' })
	limiteSaqueDiario: number;

	@Column({ name: 'flagativo' })
	flagAtivo: string;

	@Column({ name: 'tipoconta' })
	tipoConta: number;

	@Column({ name: 'datacriacao' })
	dataCriacao: Date;
}

export default Conta;

/*
create table conta (
	idConta				serial primary key,
	idPessoa  			int not null,
	saldo				numeric(16,2) default 0 not null,
	limiteSaqueDiario	numeric(16,2) default 0 not null,
	flagAtivo			char(1) default 'S' not null,
	tipoConta			int not null,
	dataCriacao			timestamp(6) not null,
	constraint FkContaPessoa foreign key(idPessoa) references pessoa(idPessoa) on delete cascade on update cascade
);
*/
