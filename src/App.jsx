import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Task";
import { v4 } from "uuid";
import Title from "./components/title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   async function fetchTasks() {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const data = await response.json()

  //     setTasks(data);
  //   }
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //PRECISA ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      } else {
        // NAO PRECISA ATUALIZAR ESSA TAREFA
        return task;
      }
    });
    setTasks(newTasks);
  }

  function onTrashClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);

    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        {tasks.length > 0 && (
          <Tasks
            tasks={tasks}
            onTaskClick={onTaskClick}
            onTrashClick={onTrashClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
