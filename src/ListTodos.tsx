import React, { useState } from "react"

interface Todo {
    id: number;
    text: string;
}

interface Props {
    deleteItem: (id: number) => void;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    currentTodo: string;

}

export default function ListTodos({ deleteItem, todos, setTodos, currentTodo }: Props) {
    const [editId, setEditId] = useState<number>(0);

    return (
        <div className="bg-gray-100 rounded py-8 px-2 w-64">
            <ul className="space-y-8">
                {todos.map(todo =>
                    (() => {
                        if (editId != todo.id) {
                            return <li key={todo.id} className="border-b border-gray-300 relative font-medium checkbox.checked:line-through">
                                <input id="checkbox" type="checkbox" />
                                {todo.text}
                                <button onClick={() => setEditId(todo.id)} type="button" className="mr-6 focus:outline-none text-sm absolute right-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>                            </button>
                                <button onClick={() => { deleteItem(todo.id) }} type="button" className="focus:outline-none text-red-600 text-sm absolute right-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </li>
                        }
                        else {
                            return <input value={todo.text} onChange={e => setEditTodo(e.target.value)} onKeyUp={(e) => e.key == "Enter" && do_update()}
                                className="update p-2">
                                <button id="updatebtn" onClick={() => { do_update() }} type="button" className="mr-6 focus:outline-none text-sm absolute right-0">
                                    Update</button>
                                <button onClick={() => setEditId(0)} type="button" className="focus:outline-none text-sm absolute right-0">
                                    Cancel</button>
                            </input>
                        }

                    })()
                )}

                <li className="text-gray-400">{!currentTodo && todos.length<1 ? "Nothing to do": curre}</li>
                {todos.length > 0 &&
                    <button onClick={() => setTodos([])} className="text-red-600 focus:outline-none text-sm">Clear all</button>
                }
            </ul>
        </div>)
}