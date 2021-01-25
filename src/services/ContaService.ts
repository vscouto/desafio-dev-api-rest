import { getCustomRepository } from 'typeorm';

import Conta from '../models/Conta';
import ContaRepository from '../repositories/ContaRepository';
import PessoaRepository from '../repositories/PessoaRepository';
import AppError from '../errors/AppError';

interface RequestCriarConta {
	idPessoa: number;
	limiteSaqueDiario: number;
	flagAtivo: string;
	tipoConta: number;
}

interface RequestConta {
	idConta: number;
}

interface RequestBloquearConta {
	idConta: number;
	flagAtivo: string;
}

class ContaService {
	public async criar({
		idPessoa,
		limiteSaqueDiario,
		flagAtivo,
		tipoConta,
	}: RequestCriarConta): Promise<Conta> {
		const contaRepository = getCustomRepository(ContaRepository);
		const pessoaRepository = getCustomRepository(PessoaRepository);

		const pessoa = await pessoaRepository.findOne(idPessoa);

		if (!pessoa) {
			throw new AppError('Pessoa nao encontrada');
		}

		if (limiteSaqueDiario <= 0) {
			throw new AppError('O limite de saque deve ser maior que 0');
		}

		const dataCriacao = new Date();
		const saldo = 0;
		const conta = contaRepository.create({
			idPessoa,
			limiteSaqueDiario,
			saldo,
			flagAtivo,
			tipoConta,
			dataCriacao,
		});

		await contaRepository.save(conta);

		return conta;
	}

	public async bloquear({
		idConta,
		flagAtivo,
	}: RequestBloquearConta): Promise<Conta> {
		const contaRepository = getCustomRepository(ContaRepository);

		const conta = await contaRepository.findOne(idConta);

		if (!conta) {
			throw new AppError('Conta nao encontrada');
		}

		conta.flagAtivo = flagAtivo;

		await contaRepository.save(conta);

		return conta;
	}

	public async consultar({ idConta }: RequestConta): Promise<Conta> {
		const contaRepository = getCustomRepository(ContaRepository);

		const conta = await contaRepository.findOne(idConta);

		if (!conta) {
			throw new AppError('Conta nao encontrada');
		}

		return conta;
	}
}

export default ContaService;
