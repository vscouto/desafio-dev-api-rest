"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import { parseISO } from 'date-fns';
// import { ReplSet } from 'typeorm';
var ContaService_1 = __importDefault(require("../services/ContaService"));
// import TransacaoService from '../services/TransacaoService';
// import PessoaService from '../services/PessoaService';
var contasRouter = express_1.Router();
contasRouter.post('/criar', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contaService, _a, idPessoaStr, limiteSaqueDiarioStr, flagAtivo, tipoContaStr, idPessoa, limiteSaqueDiario, tipoConta, conta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                contaService = new ContaService_1.default();
                _a = request.body, idPessoaStr = _a.idPessoaStr, limiteSaqueDiarioStr = _a.limiteSaqueDiarioStr, flagAtivo = _a.flagAtivo, tipoContaStr = _a.tipoContaStr;
                idPessoa = Number(idPessoaStr);
                limiteSaqueDiario = Number(limiteSaqueDiarioStr);
                tipoConta = Number(tipoContaStr);
                return [4 /*yield*/, contaService.criar({
                        idPessoa: idPessoa,
                        limiteSaqueDiario: limiteSaqueDiario,
                        flagAtivo: flagAtivo,
                        tipoConta: tipoConta,
                    })];
            case 1:
                conta = _b.sent();
                return [2 /*return*/, response.json(conta)];
        }
    });
}); });
contasRouter.get('/:idConta', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contaService, idConta, idContaParsed, conta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contaService = new ContaService_1.default();
                idConta = request.params.idConta;
                idContaParsed = Number(idConta);
                return [4 /*yield*/, contaService.consultar({ idConta: idContaParsed })];
            case 1:
                conta = _a.sent();
                return [2 /*return*/, response.json(conta)];
        }
    });
}); });
contasRouter.post('/bloquear/:idConta', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contaService, idConta, idContaParsed, conta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contaService = new ContaService_1.default();
                idConta = request.params.idConta;
                idContaParsed = Number(idConta);
                return [4 /*yield*/, contaService.bloquear({ idConta: idContaParsed })];
            case 1:
                conta = _a.sent();
                return [2 /*return*/, response.json(conta)];
        }
    });
}); });
/* contasRouter.get('/extratos', async (request, response) => {
    // const transacaoService = new TransacaoService();
    // const contaService = new ContaService();
    // const pessoaService = new PessoaService();
    console.log('aqui');
    const { idConta } = request.body;

    return response.json(idConta);

     console.log(idConta);
    const idContaParsed = Number(idConta);
    const dataInicialParserd = parseISO(dataInicial);
    const dataFinalParserd = parseISO(dataFinal);

    const conta = await contaService.consultar({ idConta });
    const pessoa = await pessoaService.consultar({ idPessoa: conta.idPessoa });

    const transacoes = await transacaoService.lista({
        idConta: idContaParsed,
        dataInicial: dataInicialParserd,
        dataFinal: dataFinalParserd,
    });
    const extrato = {};

    Object.assign(extrato, {
        id: conta.idConta,
        pessoa: { id: pessoa },
        transacao: transacoes,
    });

    return response.json(extrato);
}); */
/*

{
    "idConta": 1,
    "idPessoa": 1,
    "saldo": "1008.50",
    "limiteSaqueDiario": "100.00",
    "flagAtivo": "S",
    "tipoConta": 1,
    "dataCriacao": "2021-01-21T00:28:50.827Z"
  }
*/
exports.default = contasRouter;
