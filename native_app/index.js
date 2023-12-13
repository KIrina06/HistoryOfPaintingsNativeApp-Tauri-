// index.js
const express = require('express');
const app = express();
const port = 3000; // Вы можете использовать любой другой порт

// Добавьте промежуточное ПО (middleware) для обработки JSON
app.use(express.json());

// Простой массив для хранения заметок
let todos = [{id: 1, title: 'Проверка подлинности', content: 'Проверка картины на подлинность. \nСрок проверки - 3 дня. В срочном порядке - 5 часов.', price: '5000 руб.', img: 'https://www.artranked.com/images/s_57/571f0087d541e0d69e86d2290aeade41.jpeg'},
{id: 2, title: 'Заказ копии', content: 'Срок создания копии от 7 дней до 3 месяцев в зависимости от размера и техники, в которой выполнена картина.', price: 'от 24000 руб.', img: 'https://puzzleit.ru/files/puzzles/183/183410/_thumb.jpg'},
{id: 3, title: 'Определение художника', content: 'Не можете определить чья работа попала к Вам в руки? Мы поможем!', price: '4200 руб.', img: 'https://puzzleit.ru/files/puzzles/210/209915/_thumb.jpg'},
{id: 4, title: 'Определение эпохи', content: 'Определение направления и жанра в котором писал художник. Сроки выполнения 3 - 5 дней.', price: '3700 руб.', img: 'https://puzzleit.ru/files/puzzles/92/91917/_thumb.jpg'},
{id: 5, title: 'Реставрация', content: 'Реставрация картин, выполненных маслом.', price: 'от 25000 руб.', img: 'https://5.imimg.com/data5/SM/BQ/MY-2083555/old-paper-restoration-service-250x250.jpg'},
{id: 6, title: 'Заказ на разбор картины', content: 'Не знаете что за картина? Не проблема! Мы поможем узнать все о картине и ее создателе.', price: '5000 руб.', img: 'https://puzzleit.ru/files/puzzles/196/196202/_thumb.jpg'}];

// Роут для получения всех заметок
app.get('/todos', (req, res) => {
  res.json(todos);
  console.log(todos);
});

// Роут для создания новой заметки
app.post('/todos', (req, res) => {
  const { id, title, content, price, img } = req.body;
  const newTodo = { id, title, content, price, img };
  todos.push(newTodo);
  res.status(201).json(newTodo);
  console.log(todos);
});

// Роут для обновления существующей заметки
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, price, img } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex !== -1) {
    todos[todoIndex] = { id, title, content, price, img };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Заметка не найдена' });
  }
});

// Роут для удаления заметки
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).end();
});

// Старт сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});