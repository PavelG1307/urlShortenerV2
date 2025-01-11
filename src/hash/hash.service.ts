import { Injectable } from '@nestjs/common';
import { HashId } from 'src/models/hash-id.model';
import HashIds from 'hashids';
import { Transaction } from 'sequelize';
import { DEFAULT_KEY_LENGTH } from 'src/core/constants/key';

@Injectable()
export class HashService {
  private readonly hashIds: HashIds;

  private readonly salt = '';

  constructor() {
    this.hashIds = new HashIds(this.salt, DEFAULT_KEY_LENGTH);
  }

  async createUniqueHash(opts: { trx?: Transaction } = {}): Promise<string> {
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
