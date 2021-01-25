import { Router } from 'express';
import { parseISO } from 'date-fns';
import ContaService from '../services/ContaService';
import TransacaoService from '../services/TransacaoService';

const contasRouter = Router();

contasRouter.post('/criar', async (request, response) => {
	const contaService = new ContaService();

	const {
		idPessoaStr,
		limiteSaqueDiarioStr,
		flagAtivo,
		tipoContaStr,
	} = request.body;

	const idPessoa = Number(idPessoaStr);
	const limiteSaqueDiario = Number(limiteSaqueDiarioStr);
	const tipoConta = Number(tipoContaStr);

	const conta = await contaService.criar({
		idPessoa,
		limiteSaqueDiario,
		flagAtivo,
		tipoConta,
	});

	return response.json(conta);
});

contasRouter.get('/consultar/:idConta', async (request, response) => {
	const contaService = new ContaService();
	const { idConta } = request.params;
	const idContaParsed = Number(idConta);
	const conta = await contaService.consultar({ idConta: idContaParsed });

	return response.json(conta);
});

contasRouter.post('/bloquear/:idConta', async (request, response) => {
	const contaService = new ContaService();
	const { idConta } = request.params;
	const idContaParsed = Number(idConta);
	const conta = await contaService.bloquear({
		idConta: idContaParsed,
		flagAtivo: 'N',
	});

	return response.json(conta);
});

contasRouter.post('/desbloquear/:idConta', async (request, response) => {
	const contaService = new ContaService();
	const { idConta } = request.params;
	const idContaParsed = Number(idConta);
	const conta = await contaService.bloquear({
		idConta: idContaParsed,
		flagAtivo: 'S',
	});

	return response.json(conta);
});

contasRouter.get('/extrato', async (request, response) => {
	const transacaoService = new TransacaoService();
	const contaService = new ContaService();
	const { idConta, dataInicial, dataFinal } = request.body;

	const idContaParsed = Number(idConta);
	const dataInicialParserd = parseISO(dataInicial);
	const dataFinalParserd = parseISO(dataFinal);

	const conta = await contaService.consultar({ idConta });

	const transacoes = await transacaoService.lista({
		idConta: idContaParsed,
		dataInicial: dataInicialParserd,
		dataFinal: dataFinalParserd,
	});
	const extrato = {};

	Object.assign(extrato, {
		id: conta.idConta,
		saldo: conta.saldo,
		limiteSaqueDiario: conta.limiteSaqueDiario,
		flagAtivo: conta.flagAtivo,
		tipoConta: conta.tipoConta,
		dataCriacao: conta.dataCriacao,
		pessoa: conta.pessoa,
		transacoes,
	});

	return response.json(extrato);
});

export default contasRouter;
