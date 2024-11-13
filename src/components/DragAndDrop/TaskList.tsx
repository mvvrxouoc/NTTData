export const TaskList: React.FC<{ tasks: any[] }> = ({ tasks }) => {
    return (
      <div className="task-list">
        <h3>Lista de Tareas</h3>
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <h4>Categoría: {task.category}</h4>
            <h4>{task.name}</h4>
            <p>{task.description}</p>
            <p>{task.date}</p>
            <p>{task.category}</p>
          </div>
        ))}
      </div>
    );
  };