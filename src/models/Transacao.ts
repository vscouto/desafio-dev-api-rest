import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import Conta from './Conta';

@Entity('transacao')
class Transacao {
	@PrimaryGeneratedColumn('increment', { name: 'idtransacao' })
	idtransacao: number;

	@Column({ name: 'idconta' })
	idConta: number;

	@ManyToOne(() => Conta)
	@JoinColumn({ name: 'idconta' })
	conta: Conta;

	@Column()
	valor: number;

	@Column({ name: 'datatransacao' })
	dataTransacao: Date;
}

export default Transacao;

/*
create table transacao (
	idTransacao			serial primary key,
	idConta  			int not null,
	valor				numeric(16,2) default 0 not null,
	dataTransacao		timestamp(6) not null,
	constraint FkTransacaoConta foreign key(idConta) references conta(idConta) on delete cascade on update cascade
);
 */
