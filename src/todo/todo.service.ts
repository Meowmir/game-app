// /nest-todo-app/src/todo/todo.service.ts

import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { CreateTodoDTO } from './dto/create-todo.dto';

// Creates a Todo interface to show exactly the attribute of our Todo
interface Todo {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly isDone: boolean;
}

@Injectable()
export class TodoService implements OnModuleInit, OnModuleDestroy {
  private dbName = 'IMadeThisUp';
  private collectionName = 'todos';
  private dbUrl =
    'mongodb+srv://TheNoraDev:XHWlAqaVwA2PDclS@cluster0.82fopyq.mongodb.net/?retryWrites=true&w=majority';

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  private client = new MongoClient(this.dbUrl, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  // Creates a Todo array with one Todo
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Test',
      description: 'This is a test Tod',
      isDone: true,
    },
  ];

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  // Creates a new todo (Add todo to array)
  async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const db = this.client.db(this.dbName);
    const collection = db.collection<any>(this.collectionName);

    await collection.insertOne(createTodoDTO);
    // return last added item

    return createTodoDTO;
  }

  // Returns a single todo with ID
  async getTodo(todoID: string): Promise<Todo> {
    // change this to use collection.findOne()
    const db = this.client.db(this.dbName);
    const collection = db.collection<any>(this.collectionName);
    //const post = this.todos.find((todo) => todo.id === todoID);
    try {
      return collection.findOne({ _id: new ObjectId(todoID) });
    } catch (error) {
      console.warn(error.message);
      throw new BadRequestException(`Invalid ID ${todoID}`);
    }
  }

  // Returns all todos available
  async getTodos(): Promise<Todo[]> {
    const db = this.client.db(this.dbName);
    const collection = db.collection<any>(this.collectionName);

    return collection.find().toArray();
  }

  // Deletes a todo by ID and add a new one (Update process)
  async editTodo(todoID: string, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const db = this.client.db(this.dbName);
    const collection = db.collection<any>(this.collectionName);
    /*
    await this.deleteTodo(postID);
    this.todos.push(createTodoDTO);
*/

    //await collection.deleteOne(postID);
    await collection.updateOne(
      { _id: new ObjectId(todoID) },
      { $set: createTodoDTO },
    );

    // return last added item
    return this.getTodo(todoID);
    //return this.todos.at(-1)!;
  }

  // Deletes a todo from the array
  async deleteTodo(todoID: number): Promise<any> {
    const db = this.client.db(this.dbName);
    const collection = db.collection<any>(this.collectionName);

    //const todoIndex = this.todos.findIndex((todo) => todo.id === todoID);

    return collection.deleteOne({ _id: new ObjectId(todoID) });
    //    return this.todos.splice(todoIndex, 1);
  }
}
