import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@WebSocketGateway({
  port: 80,
  namespace: '/task',
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  },
})
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('join-team')
  async handleJoinTeam(
    @ConnectedSocket() client: Socket,
    @MessageBody() teamId: string,
  ) {
    await client.join(teamId);
  }

  emitCreate(teamId: string, payload: CreateTaskDto) {
    this.server.to(teamId).emit('create', payload);
  }

  emitUpdate(teamId: string, payload: UpdateTaskDto) {
    this.server.to(teamId).emit('update', payload);
  }

  emitDelete(teamId: string, payload: string) {
    this.server.to(teamId).emit('delete', payload);
  }
}
