import { EntityRepository, Repository, Equal, Between } from 'typeorm';
import { startOfHour } from 'date-fns';
import Transacao from '../models/Transacao';

interface Extrato {
	idConta: number;
	dataInicial: Date;
	dataFinal: Date;
}

@EntityRepository(Transacao)
class TransacaoesRepository extends Repository<Transacao> {
	public async totalSaqueDia(idConta: number): Promise<number | null> {
		const dataAtual = new Date();
		const dataAtualFiltro = new Date(
			dataAtual.getFullYear(),
			dataAtual.getMonth(),
			dataAtual.getDate(),
			0,
			0,
			0,
			0,
		);
		const { sum } = await this.createQueryBuilder('transacao')
			.select('sum(transacao.valor)', 'sum')
			.where('transacao.idConta = :idConta', { idConta })
			.andWhere('transacao.valor >= :valor', { valor: 0 })
			.andWhere('transacao.dataTransacao >= :dataAtual', {
				dataAtual: dataAtualFiltro,
			})
			.getRawOne();

		return sum || null;
	}

	public async lista({
		idConta,
		dataInicial,
		dataFinal,
	}: Extrato): Promise<Transacao[] | null> {
		const dataInicialFiltro = startOfHour(dataInicial);
		const dataFinalFiltro = startOfHour(dataFinal);

		const transacoes = await this.find({
			dataTransacao: Between(dataInicialFiltro, dataFinalFiltro),
			idConta: Equal(idConta),
		});

		return transacoes || null;
	}
}

export default TransacaoesRepository;
