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
var Conta_1 = __importDefault(require("./Conta"));
var Transacao = /** @class */ (function () {
    function Transacao() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment', { name: 'idtransacao' }),
        __metadata("design:type", Number)
    ], Transacao.prototype, "idtransacao", void 0);
    __decorate([
        typeorm_1.Column({ name: 'idconta' }),
        __metadata("design:type", Number)
    ], Transacao.prototype, "idConta", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Conta_1.default; }),
        typeorm_1.JoinColumn({ name: 'idconta' }),
        __metadata("design:type", Conta_1.default)
    ], Transacao.prototype, "conta", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Transacao.prototype, "valor", void 0);
    __decorate([
        typeorm_1.Column({ name: 'datatransacao' }),
        __metadata("design:type", Date)
    ], Transacao.prototype, "dataTransacao", void 0);
    Transacao = __decorate([
        typeorm_1.Entity('transacao')
    ], Transacao);
    return Transacao;
}());
exports.default = Transacao;
/*
create table transacao (
    idTransacao			serial primary key,
    idConta  			int not null,
    valor				numeric(16,2) default 0 not null,
    dataTransacao		timestamp(6) not null,
    constraint FkTransacaoConta foreign key(idConta) references conta(idConta) on delete cascade on update cascade
);
 */
