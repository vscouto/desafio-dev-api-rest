import { Router } from 'express';

import contasRouter from './contas.routes';
import transacoesRouter from './transacoes.routes';
import pessoasRouter from './pessoas.routes';

const routes = Router();

routes.use('/contas', contasRouter);
routes.use('/transacoes', transacoesRouter);
routes.use('/pessoas', pessoasRouter);

export default routes;
