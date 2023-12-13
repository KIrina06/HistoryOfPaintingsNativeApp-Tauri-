import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import { TodoListPage } from '../pages/TodoListPage';
import { TodoPage } from '../pages/TodoPage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" index exact element={<TodoListPage />}/>
            <Route path=":id" element={<TodoPage />} />
        </>
    )
)