import { useState } from "react";
import Card from "./components/Card";
import List from "./components/List";

function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // add task
  const addTask = () => {
    if(input !== ""){
      setTasks([...tasks, {text: input, done:false}]);
      setInput("");
    }
  };

  // delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_,i)=> i !== index));
  };

  // mark complete
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div>

      <h1>React Practice Week 2</h1>

      {/* Reusable Cards */}
      <Card title="Learning JSX" />
      <Card title="Reusable Components" />

      {/* Controlled input */}
      <input
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>

      {/* Conditional Rendering */}
      {tasks.length === 0 && <p>No tasks yet</p>}

      {/* List rendering */}
      {tasks.map((task,index)=>(
        <div key={index}>
          <span
            style={{textDecoration: task.done ? "line-through":"none"}}
            onClick={()=>toggleTask(index)}
          >
            {task.text}
          </span>

          <button onClick={()=>deleteTask(index)}>Delete</button>
        </div>
      ))}

      <List items={["React","JSX","Hooks"]} />

    </div>
  );
}

export default App;
