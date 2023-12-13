import React, { useEffect, useState, useRef } from 'react';
import { deleteTodos, postTodos, getTodos } from '../api';
import { Link } from 'react-router-dom';
import { message, confirm } from '@tauri-apps/api/dialog';
import { useSearchParams } from 'react-router-dom';

export function TodoListPage() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', content: '', price: '', img: '' });

    const [searchParams] = useSearchParams();
    const newTodoRef = useRef();

    useEffect(() => {
        if (searchParams.has('new-todo')) {
            newTodoRef.current.focus();
        }
    }, [searchParams]);

    const handleAddTodo = () => {
        if (!newTodo.title || !newTodo.content || !newTodo.price || !newTodo.img) {
            return message(
                'Поля не могут быть пустыми',
                { title: 'Ошибка', type: 'error' }
            );
        }
        const newTodoWithId = { ...newTodo, id: Date.now() };
        setTodos([...todos, newTodoWithId]);
        setNewTodo({ title: '', content: '', price: '', img: '' });

        postTodos(newTodoWithId);
    };

    const handleDeleteTodo = (id) => {
        confirm('Вы уверены, что хотите удалить экспертизу?')
            .then(res => {
                if (!res) return;
                const updatedTodos = todos.filter((todo) => todo.id !== id);
                setTodos(updatedTodos);

                deleteTodos(id);
            });
    };

    useEffect(() => {
        getTodos().then(data => {
            setTodos(data);
        });
    }, [getTodos]);

    return (
        <div>
            <h1>Предоставляемые экспертизы</h1>
            <div className='container'>
                <input
                    className='input-title'
                    type='text'
                    placeholder='Название'
                    value={newTodo.title}
                    ref={newTodoRef}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                />
                <textarea
                    className='input-content'
                    placeholder='Содержание'
                    value={newTodo.content}
                    onChange={(e) => setNewTodo({ ...newTodo, content: e.target.value })}
                />
                <input
                    className='input-price'
                    placeholder='Цена'
                    value={newTodo.price}
                    onChange={(e) => setNewTodo({ ...newTodo, price: e.target.value })}
                />
                <br></br>
                <textarea
                    className='input-img'
                    placeholder='URL картинки'
                    value={newTodo.img}
                    onChange={(e) => setNewTodo({ ...newTodo, img: e.target.value })}
                />
                <br></br>
                <button className='button button-success text-lg' onClick={handleAddTodo}>Добавить</button>
            </div>
            <hr />
            <div className='container'>
                {todos.map((todo) => (
                        <div className='todo' key={todo.id}>
                            <h3 className='todo-title'>
                                {todo.title}
                            </h3>
                            <p className='todo-content'>
                                {todo.content}
                            </p>
                            <button
                                className='button button-danger text-md'
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                Удалить
                            </button>
                            <Link
                                to={todo.id.toString()}
                                className='button button-info text-md'
                            >
                                Подробнее
                            </Link>
                        </div>
                    
                ))}
            </div>
        </div>
    );
}