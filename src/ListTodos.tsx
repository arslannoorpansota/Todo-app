import React, { useState } from "react"
interface Todo {
    id: number;
    text: string;
    isDone: boolean;
}

interface Props {
    deleteItem: (id: number) => void;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    currentTodo: string;

}



export default function ListTodos({ deleteItem, todos, setTodos, currentTodo }: Props) {
    const [editedText, setEditedText] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editId, setEditId] = useState<number>(0)

    function changeIsDone(id: number) {
        setTodos(todos.map(todo => {
            if (todo.id == id) {
                return {
                    ...todo, isDone: !todo.isDone
                }
            }
            else { return todo }

        }))
    }

    function do_update(id: number, editedText: string) {
        if (editedText) {
            setTodos(todos.map(todo => {
                if (id == todo.id) {
                    return {
                        id: todo.id, text: editedText, isDone: todo.isDone
                    }
                }
                else { return todo }

            }))
        }
        setEditId(0);
        setEditedText("")
    }
    return (
        <div className="bg-gray-100 rounded py-8 px-2 w-64">
            <ul className="space-y-8">
                {todos.map(todo =>
                    (() => {
                        if (!isEditing || !(todo.id == editId)) {
                            return <li key={todo.id} className="border-b todo-item border-gray-300 relative font-medium">
                                <input id="checkbox" type="checkbox" onChange={() => changeIsDone(todo.id)} defaultChecked={todo.isDone} />
                                <span>{todo.text}</span>
                                <button onClick={() => { setIsEditing(!isEditing); setEditId(todo.id) }} type="button" className="mr-6 focus:outline-none text-sm absolute right-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>                            </button>
                                <button onClick={() => { deleteItem(todo.id) }} type="button" className="focus:outline-none text-red-600 text-sm absolute right-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </li>
                        }
                        else {
                            return <div className="flex relative items-center">
                                <input type="text" defaultValue={todo.text} onKeyUp={(e) => e.key == "Enter" && do_update(todo.id, editedText)} onChange={(e) => setEditedText(e.target.value)}
                                    className="input py-2 focus:outline-none rounded"></input>
                                <div className="absolute right-0">
                                    <button id="updatebtn" onClick={() => { do_update(todo.id, editedText) }} type="button" className="mr-1 text-gray-900 font-semibold focus:outline-none text-sm">
                                        Update</button>
                                    <button onClick={() => setEditId(0)} type="button" className="focus:outline-none text-sm">
                                        Cancel</button>
                                </div>

                            </div>

                        }

                    })()
                )}

                <li className="text-gray-400">{!currentTodo && todos.length < 1 ? "Nothing to do" : currentTodo}</li>
                {todos.length > 0 &&
                    <button onClick={() => setTodos([])} className="text-red-600 focus:outline-none text-sm">Clear all</button>
                }
            </ul>
        </div>)
}