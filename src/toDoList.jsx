import { useState } from 'react';
import logo from './logo.svg';
import { useReducer } from 'react';
import Todo from './Todo';

export const ACTIONS = {
    ADD_TODO: "add_todo", 
    TOGGLE_TODO: "toggle_todo", 
    DELETE_TODO: "delete_todo",
    DELETE_COMPLETED_TODOS: "delete_completed_todos"
}

function reducer (state, action)
{
    switch(action.type)
    {
        case ACTIONS.ADD_TODO:
            return [...state, addNewTask(action.payload.name)]
        case ACTIONS.TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id === action.payload.id)
                {
                    return {...todo, complete: !todo.complete};
                }
                return todo;
            })
        case ACTIONS.DELETE_TODO:
            return state.filter((todo) => todo.id !== action.payload.id);
        case ACTIONS.DELETE_COMPLETED_TODOS:
            return state.filter((todo) => todo.complete !== true);
    }
}

function addNewTask(info)
{
    return {id: Date.now(), taskName: info, complete: false};
}

function TodoList() {
    const [name, setName] = useState(null);
    const [todos, dispatch] = useReducer(reducer, []);

    function handleSubmit(e)
    {
        e.preventDefault();
        if (name == "")
        {
            return;
        }
        dispatch({type: ACTIONS.ADD_TODO, payload: {name:name}})
        setName('');
    }

    
    console.log(todos);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={handleSubmit}>Create a todo</button>
            </form>
            <button onClick={() => dispatch({type: ACTIONS.DELETE_COMPLETED_TODOS, payload:{}})}>Clear Completed Tasks!</button>
            {todos.map((todo) => <Todo todo={todo} dispatch={dispatch}></Todo>)}
        </>
    );
  
}

export default TodoList;
