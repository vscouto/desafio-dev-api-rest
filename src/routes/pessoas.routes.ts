import { Router } from 'express';
import { parseISO } from 'date-fns';
import PessoaService from '../services/PessoaService';

const pessoasRouter = Router();

pessoasRouter.post('/cadastrar', async (request, response) => {
	const pessoaService = new PessoaService();
	const { nome, cpf, dataNascimento } = request.body;
	const dataNascimentoParsed = parseISO(dataNascimento);

	const conta = await pessoaService.cadastrar({
		nome,
		cpf,
		dataNascimento: dataNascimentoParsed,
	});

	return response.json(conta);
});

pessoasRouter.post('/atualizar', async (request, response) => {
	const pessoaService = new PessoaService();
	const { idPessoa, nome, cpf, dataNascimento } = request.body;
	const idPessoaParsed = Number(idPessoa);
	const dataNascimentoParsed = parseISO(dataNascimento);

	const conta = await pessoaService.atualizar({
		idPessoa: idPessoaParsed,
		nome,
		cpf,
		dataNascimento: dataNascimentoParsed,
	});

	return response.json(conta);
});

pessoasRouter.get('/consultar/:idPessoa', async (request, response) => {
	const pessoaService = new PessoaService();
	const { idPessoa } = request.params;
	const idPessoaParsed = Number(idPessoa);

	const conta = await pessoaService.consultar({ idPessoa: idPessoaParsed });

	return response.json(conta);
});

export default pessoasRouter;
