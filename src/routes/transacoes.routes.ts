import { Router } from 'express';
import TransacaoService from '../services/TransacaoService';

const transacoesRouter = Router();

transacoesRouter.post('/depositar', async (request, response) => {
	const transacaoService = new TransacaoService();
	const { idConta, valor } = request.body;
	const idContaParsed = Number(idConta);
	const valorParsed = Number(valor);
	const conta = await transacaoService.depositar({
		idConta: idContaParsed,
		valor: valorParsed,
	});

	return response.json(conta);
});

transacoesRouter.post('/sacar', async (request, response) => {
	const transacaoService = new TransacaoService();
	const { idConta, valor } = request.body;
	const idContaParsed = Number(idConta);
	const valorParsed = Number(valor);
	const conta = await transacaoService.sacar({
		idConta: idContaParsed,
		valor: valorParsed,
	});

	return response.json(conta);
});

export default transacoesRouter;
