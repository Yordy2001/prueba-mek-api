import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { Auth } from 'src/auth/entities/auth.entity';
import { IReqUser } from 'src/auth/interface/user.interface';

@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
  ) {}

  async create(createNotaDto: CreateNotaDto, user: Auth): Promise<Nota> {
    const nota = this.notaRepository.create({
      ...createNotaDto,
      user,
    });
    return this.notaRepository.save(nota);
  }

  async findAllByUser(user: IReqUser): Promise<Nota[]> {
    const notas = await this.notaRepository.find({
      where: { user: { id: user.userId } },
      order: { createdAt: 'DESC' },
    });

    return notas;
  }

  async findOne(id: string, user: Auth): Promise<Nota> {
    const nota = await this.notaRepository.findOne({ where: { id, user } });
    if (!nota) {
      throw new NotFoundException('Nota no encontrada');
    }
    return nota;
  }

  async update(
    id: string,
    updateDto: UpdateNotaDto,
    user: Auth,
  ): Promise<Nota> {
    const nota = await this.findOne(id, user);
    Object.assign(nota, updateDto);
    return this.notaRepository.save(nota);
  }

  async remove(id: string, user: Auth): Promise<void> {
    const nota = await this.findOne(id, user);
    await this.notaRepository.remove(nota);
  }
}
