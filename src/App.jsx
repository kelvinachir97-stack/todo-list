import React, { useState } from 'react';

function App() {
  const [ tasks, setTasks ] = useState([]);
  const [ text, setText ] = useState("");
  const [ editingId, setEditingId ] = useState(null);
  const [ editText, setEditText ] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed === "") return;
    const newTask = { id: Date.now(), text: trimmed, completed: false };
    setTasks([ ...tasks, newTask ]);
    setText("");
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  function saveEdit(id) {
    const trimmed = editText.trim();
    if (trimmed === "") return;
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: trimmed } : task))
    );
    setEditingId(null);
  }

  const total = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = total - completedCount;

  return (
    <div className="min-h-screen bg-black flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-3 h-fit">
        <div className="bg-black text-white rounded-xl p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Todo List</h1>

          <form onSubmit={handleAdd} className="flex gap-2 mb-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a task"
              className="flex-1 min-w-0 px-3 py-2 bg-black text-white placeholder-neutral-400 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-black text-white border border-white hover:bg-neutral-800"
            >
              Add
            </button>
          </form>

          <div className="flex flex-wrap justify-between gap-2 text-sm text-white bg-black border border-white px-3 py-2 rounded-lg mb-4">
            <span>Total: {total}</span>
            <span>Completed: {completedCount}</span>
            <span>Pending: {pendingCount}</span>
          </div>

          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-wrap items-center gap-2 p-3 bg-black text-white border border-white rounded-lg"
              >
                {task.id === editingId ? (
                  <div className="flex w-full gap-2">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 min-w-0 px-3 py-2 bg-black text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="px-3 py-2 rounded-lg bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 min-w-[120px] break-words ${task.completed
                        ? "line-through text-neutral-400"
                        : "text-white"
                        }`}
                    >
                      {task.text}
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleToggle(task.id)}
                        className="px-3 py-1.5 rounded-md text-sm bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                      >
                        {task.completed ? "Undo" : "Done"}
                      </button>
                      <button
                        onClick={() => startEdit(task)}
                        className="px-3 py-1.5 rounded-md text-sm bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-3 py-1.5 rounded-md text-sm bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;