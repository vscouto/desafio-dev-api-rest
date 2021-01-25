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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Pessoa_1 = __importDefault(require("./Pessoa"));
var Conta = /** @class */ (function () {
    function Conta() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment', { name: 'idconta' }),
        __metadata("design:type", Number)
    ], Conta.prototype, "idConta", void 0);
    __decorate([
        typeorm_1.Column({ name: 'idpessoa' }),
        __metadata("design:type", Number)
    ], Conta.prototype, "idPessoa", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Pessoa_1.default; }),
        typeorm_1.JoinColumn({ name: 'idpessoa' }),
        __metadata("design:type", Pessoa_1.default)
    ], Conta.prototype, "pessoa", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Conta.prototype, "saldo", void 0);
    __decorate([
        typeorm_1.Column({ name: 'limitesaquediario' }),
        __metadata("design:type", Number)
    ], Conta.prototype, "limiteSaqueDiario", void 0);
    __decorate([
        typeorm_1.Column({ name: 'flagativo' }),
        __metadata("design:type", String)
    ], Conta.prototype, "flagAtivo", void 0);
    __decorate([
        typeorm_1.Column({ name: 'tipoconta' }),
        __metadata("design:type", Number)
    ], Conta.prototype, "tipoConta", void 0);
    __decorate([
        typeorm_1.Column({ name: 'datacriacao' }),
        __metadata("design:type", Date)
    ], Conta.prototype, "dataCriacao", void 0);
    Conta = __decorate([
        typeorm_1.Entity('conta')
    ], Conta);
    return Conta;
}());
exports.default = Conta;
/*
create table conta (
    idConta				serial primary key,
    idPessoa  			int not null,
    saldo				numeric(16,2) default 0 not null,
    limiteSaqueDiario	numeric(16,2) default 0 not null,
    flagAtivo			char(1) default 'S' not null,
    tipoConta			int not null,
    dataCriacao			timestamp(6) not null,
    constraint FkContaPessoa foreign key(idPessoa) references pessoa(idPessoa) on delete cascade on update cascade
);
*/
