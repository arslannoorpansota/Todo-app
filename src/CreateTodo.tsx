import React, { useState } from "react"

interface Props {
    addItem: (todo: string) => void;
}

export default function CreateTodos(props: Props) {
    const [currentTodo, setCurrentTodo] = useState("");

    function addTodo() {
        props.addItem(currentTodo);
        setCurrentTodo("");
    }
    return (
        <div className="flex relative items-center">
            <div className="">
                <input placeholder="new task" value={currentTodo} onKeyUp={(e) => e.key == "Enter" && addTodo()} onChange={(e) => setCurrentTodo(e.target.value)}
                    className="input p-2 pr-12 rounded"></input>
            </div>

            <div className="absolute right-2">
                <button id="addbtn" type="button" className="focus:outline-none text-gray-900" onClick={addTodo}
                >ADD</button>
            </div>
        </div>
    )
}