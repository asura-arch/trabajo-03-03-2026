import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly service: WorkspaceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('boards')
  getBoards() {
    return this.service.getBoards();
  }

  @UseGuards(JwtAuthGuard)
  @Post('boards')
  createBoard(@Body('name') name: string) {
    return this.service.createBoard(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('components')
  getComponents() {
    return this.service.getComponents();
  }

  @UseGuards(JwtAuthGuard)
  @Post('components')
  createComponent(@Body() body: any) {
    return this.service.createComponent(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('components/:id')
  updateComponent(@Param('id') id: string, @Body() body: any) {
    return this.service.updateComponent(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('components/:id')
  deleteComponent(@Param('id') id: string) {
    return this.service.deleteComponent(Number(id));
  }
}
