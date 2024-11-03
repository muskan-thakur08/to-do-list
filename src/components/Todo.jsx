import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { v4 as uuidv4 } from 'uuid';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";

function Todo() {
    const [task, setTask] = useState([{ task: "Code", id: uuidv4() , isDone:false }]);
    const [newTask, setnewtask] = useState([""]);
    function addTask() {
        console.log("button clicked")
        setTask((preVal) => {
            return [...preVal, { task: newTask, id: uuidv4() }]
        })
        setnewtask("");
    }
    function updateTodo(event) {
        setnewtask((event.target.value))
    }
    function deleteTodo(id) {
        setTask(task.filter((todo) => (todo.id != id)));
    }
    function uppercaseAll() {
        setTask(task.map((todo) => {
            return { ...todo, task: todo.task.toUpperCase() }
        }))
    }
    function markasDone(id){
        setTask(task.map((todo) => {
            if(todo.id == id){
                return {...todo,isDone:!todo.isDone}
            }
            return todo;
        }))
    }
    return (
        <>
            <div className="max-w-screen-lg mx-auto flex items-center flex-col my-10 font-['poppins,sans serif']">
                <div className="w-[50%] flex-col">
                    <h1 className="text-4xl font-bold text-zinc-700 my-5">ToDo List</h1>
                    <div className="flex h-[9vh] justify-center items-center">
                        <input onChange={updateTodo} value={newTask} className="px-4 py-3 w-full font-semibold border-2 border-zinc-700 text-zinc-700 text-lg rounded-lg outline-none" type="text" placeholder="Add a Task..." />
                        <button onClick={addTask} className="px-5 py-2 mt-4 hover:bg-zinc-700 hover:text-white text-zinc-700 border-2 border-zinc-700 font-bold ml-4 mb-5 rounded-lg">Add</button>
                        </div>
                    <div className="w-full mt-5 flex flex-col  h-[50%]">
                        <ul className="list-disc">
                            {
                                task.map((todo) => {
                                    return (
                                        <div key={todo.id} className="flex  items-center hover:bg-zinc-100 p-1 rounded-md">
                                            <button onClick={()=>markasDone(todo.id)} > 
                                            {todo.isDone ? <IoCheckbox  className="w-6 h-6" /> : <MdCheckBoxOutlineBlank className="w-6 h-6" />}
                                             </button>
                                            <li  style={{ textDecoration: todo.isDone ? "line-through" : "" }} className="text-zinc-700 w-[90%] flex items-center mb-1 p-2 font-semibold capitalize text-xl"
                                            >
                                                {todo.task}
                                            </li>
                                                <button onClick={() => deleteTodo(todo.id)}><RxCross2 className="hover:bg-zinc-300 rounded" /></button>
                                        </div>
                                    )
                                })
                            }
                            <button onClick={uppercaseAll} className="px-5 py-2 mt-4 hover:bg-zinc-700 hover:text-white text-zinc-700 border-2 border-zinc-700 font-bold  rounded-lg">Uppercase All</button>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo;