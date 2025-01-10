import { Injectable } from '@nestjs/common';
import { HashId } from 'src/models/hash-id.model';
import HashIds from 'hashids';
import { Transaction } from 'sequelize';

@Injectable()
export class HashService {
  private readonly hashIds: HashIds;

  private readonly hashLength = 6;
  private readonly salt = '';

  constructor() {
    this.hashIds = new HashIds(this.salt, this.hashLength);
  }

  async createUniqueHash(opts: { trx?: Transaction }): Promise<string> {
    const hashIdEntry = await HashId.create(
      {},
      {
        returning: true,
        transaction: opts.trx,
      },
    );

    const hashId = hashIdEntry.id;
    return this.hashIds.encode(hashId);
  }
}
