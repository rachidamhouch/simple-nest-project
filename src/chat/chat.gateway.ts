import { SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server , Socket} from 'socket.io';

@WebSocketGateway(4000)
export class ChatGateway {
  @WebSocketServer() server: Server;
  private clients: Map<string, Socket> = new Map();
  onModuleInit()
  {
    this.server.on('connection', (client: Socket) => {
      console.log(`Client connected with id: ${client.id}`);
      this.clients.set(client.id, client);
      client.emit('message', "Welcome^^");
      client.on('disconnect', () => {
        this.clients.delete(client.id);
        console.log(`Client disconnected with id: ${client.id}`);
      });
    });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    client.emit('message', "Hello, Im good thanks!");
  }

  sendMessageToClient(clientId: string, message: string) {
    const client = this.clients.get(clientId);
    if (client) {
    {
      client.emit('message', message);
      return `ping ${clientId}`;
    }
    } else {
      console.log(`Client with id ${clientId} not found.`);
      return `Client with id ${clientId} not found.`;
    }
  }
  sendToAll(msg: string)
  {
    this.server.emit("message", msg);
    return "Done";
  }
}
