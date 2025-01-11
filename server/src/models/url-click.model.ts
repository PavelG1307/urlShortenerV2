import {
  Column,
  CreatedAt,
  DataType,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { MAX_ALIAS_LENGTH } from '../core/constants/alias';

@Table({
  tableName: 'url_clicks',
  underscored: true,
  timestamps: true,
})
export class UrlClick extends Model<UrlClick> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Index('url_clicks_alias_index')
  @Column({
    type: DataType.STRING(MAX_ALIAS_LENGTH),
    allowNull: false,
  })
  alias: string;

  @Column({
    type: DataType.INET,
    allowNull: false,
  })
  ip: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @CreatedAt
  createdAt: Date;
}
