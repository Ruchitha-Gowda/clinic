import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateQueueDto } from './dto/create-queue.dto';


@Controller('queue')
@UseGuards(AuthGuard('jwt'))
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  @Post()
create(@Body() dto: CreateQueueDto) {
  return this.queueService.createQueueEntry(dto); // use new method
}


  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.queueService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.queueService.remove(id);
  }

  
  
}
