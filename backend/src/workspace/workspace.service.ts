import { Injectable } from '@nestjs/common';
import { Board } from './interfaces/board.interface';
import { ComponentEntity } from './interfaces/component.interface';

@Injectable()
export class WorkspaceService {
  private boards: Board[] = [];
  private components: ComponentEntity[] = [];
  private nextBoardId = 1;
  private nextCompId = 1;

  getBoards(): Board[] {
    return this.boards;
  }

  createBoard(name: string): Board {
    const board: Board = { id: this.nextBoardId++, name };
    this.boards.push(board);
    return board;
  }

  getComponents(): ComponentEntity[] {
    return this.components;
  }

  createComponent(data: Partial<ComponentEntity>): ComponentEntity {
    const comp: ComponentEntity = {
      id: this.nextCompId++,
      boardId: data.boardId,
      x: data.x || 0,
      y: data.y || 0,
      width: data.width || 100,
      height: data.height || 100,
      title: data.title,
      data: data.data,
    } as any;
    this.components.push(comp);
    return comp;
  }

  updateComponent(id: number, updates: Partial<ComponentEntity>): ComponentEntity | undefined {
    const comp = this.components.find(c => c.id === id);
    if (!comp) return undefined;
    Object.assign(comp, updates);
    return comp;
  }

  deleteComponent(id: number): boolean {
    const idx = this.components.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.components.splice(idx, 1);
    return true;
  }
}
