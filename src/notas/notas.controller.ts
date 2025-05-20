/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNotaDto: CreateNotaDto, @Request() req) {
    const user = req.user;
    return this.notasService.create(createNotaDto, user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    const user = req.user;
    return await this.notasService.findAllByUser(user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const nota = await this.notasService.findOne(id, req.user.userId);
    if (!nota) {
      throw new NotFoundException('Nota no encontrada');
    }
    return nota;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNotaDto: UpdateNotaDto,
    @Request() req,
  ) {
    const updated = await this.notasService.update(
      id,
      updateNotaDto,
      req.user.userId,
    );
    if (!updated) {
      throw new NotFoundException('Nota no encontrada o no autorizada');
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    await this.notasService.remove(id, req.user.userId);
  }
}
