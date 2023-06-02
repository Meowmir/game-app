// /nest-todo-app/src/todo/todo.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // Create a todo
  @Post('/')
  async create(@Res() res: any, @Body() createTodoDTO: CreateTodoDTO) {
    const newTodo = await this.todoService.addTodo(createTodoDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been submitted successfully!',
      todo: newTodo,
    });
  }

  // Fetch a particular todo using ID
  @Get('/:todoID')
  async getTodo(@Res() res: any, @Param('todoID') todoID: string) {
    const todo = await this.todoService.getTodo(todoID);
    if (!todo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json(todo);
  }

  // Fetch all todos
  @Get('/')
  async getTodos(@Res() res: any) {
    const todos = await this.todoService.getTodos();
    return res.status(HttpStatus.OK).json(todos);
  }

  // Edit a particular todo using ID
  @Put('/')
  async editTodo(
    @Res() res: any,
    @Query('todoID') todoID: number,
    @Body() createTodoDTO: CreateTodoDTO,
  ) {
    const editedTodo = await this.todoService.editTodo(todoID, createTodoDTO);
    if (!editedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      todo: editedTodo,
    });
  }

  // Delete a todo using ID
  @Delete('/:todoID')
  async deleteTodo(
    @Res() res: any,
    @Param('todoID') todoID: number,
  ): Promise<string> {
    const deletedTodo = await this.todoService.deleteTodo(todoID);
    if (!deletedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been deleted!',
      todo: deletedTodo,
    });
  }
}
