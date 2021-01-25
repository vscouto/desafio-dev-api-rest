"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Pessoa = /** @class */ (function () {
    function Pessoa() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment', { name: 'idpessoa' }),
        __metadata("design:type", Number)
    ], Pessoa.prototype, "idPessoa", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Pessoa.prototype, "nome", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Pessoa.prototype, "cpf", void 0);
    __decorate([
        typeorm_1.Column({ name: 'datanascimento' }),
        __metadata("design:type", Date)
    ], Pessoa.prototype, "dataNascimento", void 0);
    Pessoa = __decorate([
        typeorm_1.Entity('pessoa')
    ], Pessoa);
    return Pessoa;
}());
exports.default = Pessoa;
/*
create table pessoa (
    idPessoa			serial primary key,
    nome				varchar not null,
    cpf					varchar not null,
    dataNascimento		date not null
);
 */
