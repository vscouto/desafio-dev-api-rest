import { EntityRepository, Repository } from 'typeorm';

import Conta from '../models/Conta';

@EntityRepository(Conta)
class ContasRepository extends Repository<Conta> {
	public async findByDate(date: Date): Promise<Conta | null> {
		const findAppointment = await this.findOne({
			where: { date },
		});

		return findAppointment || null;
	}
}

export default ContasRepository;
