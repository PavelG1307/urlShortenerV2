import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { MAX_ALIAS_LENGTH } from '../core/constants/alias';

@Table({
  tableName: 'url_entries',
  underscored: true,
  timestamps: true,
})
export class UrlEntry extends Model<UrlEntry> {
  @Column({
    type: DataType.STRING(MAX_ALIAS_LENGTH),
    primaryKey: true,
  })
  alias: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  originalUrl: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expiresAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @CreatedAt
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt?: Date;

  public isDeleted(): boolean {
    return Boolean(this.deletedAt);
  }

  public isExpired(): boolean {
    return Boolean(this.expiresAt) && this.expiresAt < new Date();
  }
}
