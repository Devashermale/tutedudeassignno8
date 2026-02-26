import { useState } from "react"
import './App.css'
import { useEffect } from "react";
import Axiox from 'axios';
import trash from './assets/trash.png'
import edit from './assets/square-pen.png'
import save from './assets/save.png'
//lordicon
//lucidreact
function App() {
  const [todo, settodo] = useState([]);
  const [text, settext] = useState('');
  const [error, seterror] = useState(null)
  const [loading, setloading] = useState(true)
  const [editing, setediting] = useState(null)
  const [edittext, setedittext] = useState('')
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await Axiox.get(`https://todo-list-assignment-8.onrender.com`);
        settodo(res.data)
      } catch (error) {
        seterror(error.message)
        console.log(error)
      } finally {
        setTimeout(() => {
          setloading(false)
        }, 2000);

      }
    }
    fetchdata()
  }, [])

  let handlesubmit = async () => {
    let url = 'https://todo-list-assignment-8.onrender.com'
    if (!text.trim()) return;

    try {
      const res = await Axiox.post(url,
        {
          todo: text,
          completed: false
        });
      settodo([...todo, res.data]);
      settext('');
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }
  let edittask = async (id) => {
    try {
      await Axiox.put(`https://todo-list-assignment-8.onrender.com/todo/${id}`)
      settodo(todo)
    } catch (error) {

    }

  }
  let deletetask = async (id) => {
    try {
      await Axiox.delete(`https://todo-list-assignment-8.onrender.com/todo/${id}`);
      settodo(todo.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  let toggleComplete = async (id, currentStatus) => {
    try {
      const res = await Axiox.put(`https://todo-list-assignment-8.onrender.com/todo/${id}`, {
        completed: !currentStatus
      });

      settodo(todo.map(item => item._id === id ? res.data : item));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  }


  const startEdit = (item) => {
    setediting(item._id);
    setedittext(item.todo);
  }
  const saveEdit = async (id) => {
    try {
      const res = await Axiox.put(`https://todo-list-assignment-8.onrender.com/todo/${id}`, {
        todo: edittext
      });
      settodo(todo.map(item => item._id === id ? res.data : item));
      setediting(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  }
  if (loading) {
    return <h1 className=' text-black text-5xl'>loading</h1>;
  }
  if (error) {
    return <h1 className=' text-black text-5xl'>{error.message}</h1>;
  }

return (
  <>
    
    <div className='flex items-center justify-center '>
      <div className=" rounded-2xl shadow-2xl bg-white">
        <h1 className=" text-3xl  font-bold text-center">todo list</h1>
        <input type="text"
          onChange={(e) => settext(e.target.value)}
          placeholder="enter your todo"
          className='flex-1 px-6 py-4 pr-14 bg-slate-50 border border-slate-200 rounded-lg mr-2 '
        />
        <button onClick={handlesubmit} className=" bg-indigo-600 hover:bg-indigo-900 font-medium px-6 py-4 rounded-lg">submit</button>
       <div className=" overflow-scroll ">
        <ul className=" size-90">
          {todo.map((item) => (
            <li key={item._id} className="flex items-center justify-between p-3 rounded-xl border m-2 bg-blue-800 ">
              {editing === item._id ? (
                <>
                  <input
                    className=" border p-1 grow rounded"
                    value={edittext}
                    onChange={(e) => setedittext(e.target.value)} />
                  <button onClick={() => saveEdit(item._id)} className=" bg-green-600 m-2 content-end rounded"><img src={save}/></button>
                  <button onClick={() => setediting(null)}></button>
                </>
              ) : (
                <>

                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(item._id, item.completed)}
                  />
                  <span className={item.completed ? "line-through text-gray-500" : ""}>
                    {item.todo}</span>
                  <button onClick={() => startEdit(item)} className=" bg-emerald-700 p-2 rounded "><img src={edit} /></button>
                  <button onClick={() => deletetask(item._id)} className="text-black p-2"><img src={trash}/></button>
                </>
              )}

            </li>
          ))}
        </ul>

        </div>
      </div>
    </div>
  </>
)
}
export default App
