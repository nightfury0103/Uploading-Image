import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PublicFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public imgUrl: string;

  @Column()
  public key: string;

  @Column()
  public title: string;
}

export default PublicFile;