import React, { useState } from "react";

export function Content() {
    const input = document.querySelector("input")!
    const update = document.querySelector("update")!
    const addbtn = document.getElementById("addbtn")!
    const updatebtn = document.getElementById("updatebtn")!
    const [todos, settodos] = useState([]);
    const [currenttodo, setcurrenttodo] = useState("Nothing to do..");
    function deleteitem(id: number) {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id;
        });
        settodos(removeItem);
    }
    function do_update(index) {
        newtodos = [...todos];
        newtodos[index].text = update.value;
        settodos(newtodos);
        seteditMode(false)
    }
    function do_update(index) {
        newtodos = [...todos];
        newtodos[index].editMode = true;
        settodos(newtodos);
    }

    return (
        <div className="flex flex-col items-center space-y-8">
            <header className="text-2xl font-semibold mt-8 text-gray-100">
                My Todos
            </header>

            <div className="flex relative items-center">
                <div className="">
                    <input placeholder="new task" onKeyUp={(e) => e.keyCode == 13 && addbtn.click()} onChange={(e) => setcurrenttodo(e.target.value)}
                        className="input p-2"></input>
                </div>
                <div className="absolute right-2">
                    <button id="addbtn" type="button" className="focus:outline-none text-gray-900" onClick={() => {
                        currenttodo !== "" &&
                            settodos([...todos, {
                                id: todos.length + 1,
                                text: currenttodo,
                                editMode: false,

                            }])
                        setcurrenttodo("")
                        input.value = ""
                    }}
                    >ADD</button>
                </div>
            </div>
            <div className="bg-gray-100 py-8 px-2 w-64">
                <ul className="space-y-8">
                    {todos.map(todo =>
                        (() => {
                            if (editMode == false) {
                                return <li key={todo.id} className="border-b border-gray-300 relative font-medium">{todo.text}
                                    <button onClick={() => { do_edit(todo.id) }} type="button" className="mr-6 focus:outline-none text-sm absolute right-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>                            </button>
                                    <button onClick={() => { deleteitem(todo.id) }} type="button" className="focus:outline-none text-red-600 text-sm absolute right-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </li>
                            }
                            else {
                                return <input value={todo.text} onKeyUp={(e) => e.keyCode == 13 && updatebtn.click()}
                                    className="update p-2">
                                    <button id="updatebtn" onClick={() => { do_update(todo.id - 1) }} type="button" className="mr-6 focus:outline-none text-sm absolute right-0">
                                        Update</button>
                                    <button onClick={() => { seteditMode(false) }} type="button" className="focus:outline-none text-sm absolute right-0">
                                        Cancel</button>
                                </input>
                            }

                        })()
                    )}

                    <li className="text-gray-400">{currenttodo}</li>
                    {todos.length > 0 &&
                        <button onClick={() => settodos([])} className="text-red-600 focus:outline-none text-sm">Clear all</button>
                    }
                </ul>
            </div>

        </div>
    )
}