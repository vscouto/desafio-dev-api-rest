import { getCustomRepository } from 'typeorm';

import ContaRepository from '../repositories/ContaRepository';
import Transacao from '../models/Transacao';
import TransacaoRepository from '../repositories/TransacaoRepository';

import AppError from '../errors/AppError';

interface RequestTransacao {
	idConta: number;
	valor: number;
}

interface RequestLista {
	idConta: number;
	dataInicial: Date;
	dataFinal: Date;
}
class TransacaoService {
	public async depositar({
		idConta,
		valor,
	}: RequestTransacao): Promise<Transacao> {
		const contaRepository = getCustomRepository(ContaRepository);
		const transacaoRepository = getCustomRepository(TransacaoRepository);

		const conta = await contaRepository.findOne(idConta);

		if (!conta) {
			throw new AppError('Conta nao encontrada');
		}

		if (valor <= 0) {
			throw new AppError('O valor de deposito deve ser maior que 0');
		}

		const dataTransacao = new Date();
		const transacao = transacaoRepository.create({
			idConta,
			valor,
			dataTransacao,
		});

		await transacaoRepository.save(transacao);

		const total = Number(valor) + Number(conta.saldo);
		conta.saldo = total;

		await contaRepository.save(conta);

		return transacao;
	}

	public async sacar({
		idConta,
		valor,
	}: RequestTransacao): Promise<Transacao> {
		const contaRepository = getCustomRepository(ContaRepository);
		const transacaoRepository = getCustomRepository(TransacaoRepository);

		const conta = await contaRepository.findOne(idConta);

		if (!conta) {
			throw new AppError('Conta nao encontrada');
		}

		if (valor <= 0) {
			throw new AppError('O valor de saque deve ser maior que 0');
		}

		if (valor >= conta.saldo) {
			throw new AppError('Saldo insuficiente');
		}

		const totalSaque =
			(await transacaoRepository.totalSaqueDia(idConta)) || 0;

		const totalSaqueDiario = totalSaque + 0 + valor;

		if (totalSaqueDiario >= conta.limiteSaqueDiario) {
			throw new AppError('Valor super o limite de saque diario');
		}

		const dataTransacao = new Date();
		const transacao = transacaoRepository.create({
			idConta,
			valor,
			dataTransacao,
		});

		await transacaoRepository.save(transacao);

		const total = Number(conta.saldo) - Number(valor);
		conta.saldo = total;

		await contaRepository.save(conta);

		return transacao;
	}

	public async lista({
		idConta,
		dataInicial,
		dataFinal,
	}: RequestLista): Promise<Transacao[] | null> {
		const contaRepository = getCustomRepository(ContaRepository);
		const transacaoRepository = getCustomRepository(TransacaoRepository);

		const conta = await contaRepository.findOne(idConta);

		if (!conta) {
			throw new AppError('Conta nao encontrada');
		}

		const transacoes = await transacaoRepository.lista({
			idConta,
			dataInicial,
			dataFinal,
		});

		return transacoes;
	}
}

export default TransacaoService;
