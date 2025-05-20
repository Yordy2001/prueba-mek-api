import { Nota } from 'src/notas/entities/nota.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: false })
  password: string;

  @OneToMany(() => Nota, (nota) => nota.user)
  notas: Nota[];
}
