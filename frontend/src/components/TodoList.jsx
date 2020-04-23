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
      { todoList.length <= 0 ?(<p>데이터가 없습니다.</p>): null }
    </div>
  )
}

export default TodoList;