import { getCustomRepository } from 'typeorm';

import PessoaRepository from '../repositories/PessoaRepository';
import Pessoa from '../models/Pessoa';

import AppError from '../errors/AppError';

interface RequestPessoa {
	idPessoa: number;
}

interface RequestCriarPessoa {
	nome: string;
	cpf: string;
	dataNascimento: Date;
}

interface RequestAtualizarPessoa {
	idPessoa: number;
	nome: string;
	cpf: string;
	dataNascimento: Date;
}

class PessoaService {
	public async cadastrar({
		nome,
		cpf,
		dataNascimento,
	}: RequestCriarPessoa): Promise<Pessoa> {
		const pessoaRepository = getCustomRepository(PessoaRepository);

		const pessoaEncontrada = await pessoaRepository.findOne({
			where: { cpf },
		});

		if (pessoaEncontrada) {
			throw new AppError('CPF ja cadastrado');
		}

		const pessoa = pessoaRepository.create({
			nome,
			cpf,
			dataNascimento,
		});

		await pessoaRepository.save(pessoa);

		return pessoa;
	}

	public async atualizar({
		idPessoa,
		nome,
		cpf,
		dataNascimento,
	}: RequestAtualizarPessoa): Promise<Pessoa> {
		const pessoaRepository = getCustomRepository(PessoaRepository);

		const pessoa = await pessoaRepository.findOne(idPessoa);

		if (!pessoa) {
			throw new AppError('Pessoa nao encontrada');
		}

		const pessoaEncontrada = await pessoaRepository.findOne({
			where: { cpf },
		});

		if (pessoaEncontrada && pessoaEncontrada.idPessoa !== idPessoa) {
			throw new AppError('CPF ja cadastrado');
		}

		pessoa.nome = nome;
		pessoa.cpf = cpf;
		pessoa.dataNascimento = dataNascimento;

		await pessoaRepository.save(pessoa);

		return pessoa;
	}

	public async consultar({ idPessoa }: RequestPessoa): Promise<Pessoa> {
		const pessoaRepository = getCustomRepository(PessoaRepository);

		const pessoa = await pessoaRepository.findOne(idPessoa);

		if (!pessoa) {
			throw new AppError('Pessoa nao encontrada');
		}

		return pessoa;
	}
}

export default PessoaService;
