import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shortUrl')
@Unique(['shortUrlCode'])
export class ShortUrl extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  customerEmail: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  customerIpAddress: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  customerUserAgent: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  originalUrl: string;

  @Column({ nullable: false, type: 'varchar', length: 10 })
  shortUrlCode: string;

  @Column({ nullable: false, type: 'timestamp' })
  expireAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
