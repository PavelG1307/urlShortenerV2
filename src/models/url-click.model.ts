import {
  Column,
  CreatedAt,
  DataType,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { MAX_KEY_LENGTH } from '../core/constants/key';

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

  @Index('url_clicks_key_index')
  @Column({
    type: DataType.STRING(MAX_KEY_LENGTH),
    allowNull: false,
  })
  key: string;

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
