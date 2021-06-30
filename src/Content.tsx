import React, { useEffect, useState } from "react";
import CreateTodos from "./CreateTodo";

interface Todo {
    id: number,
    text: string,
}

export function Content() {
    const [lastId, setLastId] = useState(0);
    const [todos, setTodos] = useState<Todo[]>([]);

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

    function deleteitem(id: number) {
        const removeItem = todos.filter((todo: Todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }

    function addItem(text: string) {
        setTodos([...todos, { id: lastId + 1, text }]);
        setLastId(lastId + 1);
    }
    // function do_update(index) {
    //     newtodos = [...todos];
    //     newtodos[index].text = update.value;
    //     settodos(newtodos);
    //     seteditMode(false)
    // }
    // function do_update(index) {
    //     newtodos = [...todos];
    //     newtodos[index].editMode = true;
    //     settodos(newtodos);
    // }


    return (
        <div className="flex flex-col items-center space-y-8">
            <header className="text-2xl font-semibold mt-8 text-gray-100">
                My Todos
            </header>

            <CreateTodos addItem={addItem} />


        </div>
    )
}