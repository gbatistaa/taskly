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
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';

@WebSocketGateway({
  port: 80,
  namespace: '/task-column',
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  },
})
export class TaskColumnGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('socket connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('socket disconnected', client.id);
  }

  @SubscribeMessage('join-team')
  async handleJoinTeam(
    @ConnectedSocket() client: Socket,
    @MessageBody() teamId: string,
  ) {
    await client.join(teamId);
  }

  emitCreate(teamId: string, payload: CreateTaskColumnDto) {
    this.server.to(teamId).emit('create', payload);
  }

  emitUpdate(teamId: string, payload: UpdateTaskColumnDto) {
    this.server.to(teamId).emit('update', payload);
  }

  emitDelete(teamId: string, payload: string) {
    this.server.to(teamId).emit('delete', payload);
  }
}
