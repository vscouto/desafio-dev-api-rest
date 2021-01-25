import { EntityRepository, Repository } from 'typeorm';

import Pessoa from '../models/Pessoa';

@EntityRepository(Pessoa)
class PessoasRepository extends Repository<Pessoa> {}

export default PessoasRepository;
