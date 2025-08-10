import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class QueueGateway {
  @WebSocketServer()
  server: Server;

  sendQueueUpdate(queue) {
    this.server.emit('queue_updated', queue);
  }
}
