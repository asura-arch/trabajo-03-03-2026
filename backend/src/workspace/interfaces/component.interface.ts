export interface ComponentEntity {
  id: number;
  boardId: number;
  x: number;
  y: number;
  width: number;
  height: number;
  title?: string;
  data?: any;
}
