import React from 'react';
import TodoItem from './TodoItem';

function TodoList({todoList, deleteTodoList, editTodoList}) {
  

  return (
    <div className="todoListBox">
      {todoList.map((todo) => {
        return (
          <TodoItem 
            key={`todoItem-${todo.id}`} 
            data={todo} 
            deleteTodoList={deleteTodoList} 
            editTodoList={editTodoList}
          />
        )
      })}
    </div>
  )
}

export default TodoList;