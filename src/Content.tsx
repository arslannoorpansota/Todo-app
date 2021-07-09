import React, { useEffect, useState } from "react";
import CreateTodos from "./CreateTodo";
import ListTodos from "./ListTodos";

interface Todo {
    id: number;
    text: string;
    isDone: boolean;
}

export function Content() {
    const [lastId, setLastId] = useState(0);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentTodo, setCurrentTodo] = useState("");
    const [editTodo, setEditTodo] = useState("");


    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        let parsedTodos = JSON.parse(savedTodos || "[]");
        if (parsedTodos.length) {
            setTodos(parsedTodos);
            setLastId(parsedTodos[parsedTodos.length - 1].id);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    function deleteItem(id: number) {
        const removeItem = todos.filter((todo: Todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }

    function addItem(text: string) {
        setTodos([...todos, { id: lastId + 1, text , isDone: false}]);
        setLastId(lastId + 1);
    }
  
  


    return (
        <div className="flex flex-col items-center space-y-8">
            <header className="text-2xl font-semibold mt-8 text-gray-100">
                My Todos
            </header>

            <CreateTodos addItem={addItem} currentTodo={currentTodo} setCurrentTodo={setCurrentTodo}/>
            <ListTodos deleteItem={deleteItem} todos={todos} setTodos={setTodos} currentTodo={currentTodo}/>


        </div>
    )
}