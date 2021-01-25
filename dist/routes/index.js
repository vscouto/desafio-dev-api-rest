"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contas_routes_1 = __importDefault(require("./contas.routes"));
var transacoes_routes_1 = __importDefault(require("./transacoes.routes"));
var routes = express_1.Router();
routes.use('/contas', contas_routes_1.default);
routes.use('/transacoes', transacoes_routes_1.default);
exports.default = routes;
