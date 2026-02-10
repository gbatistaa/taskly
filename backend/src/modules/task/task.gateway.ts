import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskDto } from './dto/task.dto';

@WebSocketGateway({
  port: 80,
  namespace: '/task',
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-team')
  async handleJoinTeam(
    @ConnectedSocket() client: Socket,
    @MessageBody() teamId: string,
  ) {
    await client.join(teamId);
  }

  emitCreate(teamId: string, payload: TaskDto) {
    this.server.to(teamId).emit('create', payload);
  }

  emitUpdate(teamId: string, payload: TaskDto) {
    this.server.to(teamId).emit('update', payload);
  }

  emitDelete(teamId: string, payload: string) {
    this.server.to(teamId).emit('delete', payload);
  }
}
