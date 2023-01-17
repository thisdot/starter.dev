import { CommentModel } from '../src/models/CommentModel';
import { PostModel } from '../src/models/PostModel';
import * as dotenv from 'dotenv';

// load dotenv config
dotenv.config();

// Add some dummy data to the database

console.log('Seeding database...');

PostModel.create('Hello world!');
PostModel.create('Good morning!');
PostModel.create('Good afternoon!');
PostModel.create('Good evening!');
PostModel.create('Have a nice day!');
PostModel.create('Have a nice weekend!');

CommentModel.create('How are you?');
CommentModel.create('I am fine, thank you!');
CommentModel.create('How is the weather?');
CommentModel.create('It is sunny today!');
CommentModel.create('What are you doing?');
CommentModel.create('I am coding!');
CommentModel.create('What is your favorite color?');
CommentModel.create('My favorite color is blue!');
CommentModel.create('What is your favorite food?');
CommentModel.create('My favorite food is pizza!');
CommentModel.create('What is your favorite movie?');

console.log('Database seeded!');
