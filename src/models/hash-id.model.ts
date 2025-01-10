import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'hash_ids',
  underscored: true,
  timestamps: true,
})
export class HashId extends Model<HashId> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
}
