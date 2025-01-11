import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { MAX_KEY_LENGTH } from 'src/core/constants/key';

@Table({
  tableName: 'url_entries',
  underscored: true,
  timestamps: true,
})
export class UrlEntry extends Model<UrlEntry> {
  @Column({
    type: DataType.STRING(MAX_KEY_LENGTH),
    primaryKey: true,
  })
  key: string;

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
