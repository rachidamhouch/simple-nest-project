import { Controller, Get, Param } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController {
    constructor(private chatGateway: ChatGateway){}
    @Get("/:id")
    ping(@Param('id') id: string)
    {
        return this.chatGateway.sendMessageToClient(id, "pong");
    }
}
