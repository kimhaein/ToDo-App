import React, { useEffect, useState } from 'react';

function TodoList({todoList, deleteTodoList, editTodoList}) {
  const [editTodoId, setEditTodoId] = useState(0)
  const [todo, setTodo] = useState('')

  const renderTodoText = (v) => {
    if(editTodoId === v.id){
      return <input type="text" defaultValue={v.text} onChange={({target})=>{ setTodo(target.value)}}/>
    }else {
      return (
        <>
          <div className="todoText">{v.text}</div>
          <div className="todoDate">create | {v.create_date} {v.edit_date?`/ edit | ${v.edit_date}`:''}</div>
          <div>tag | @1 @2</div>
        </>
      )
    }
  }

  const renderEditBtn = (v) => {
    if(editTodoId === v.id){
      return <span className="editBtn" onClick={() => { editTodoList(todo,v.id); setEditTodoId(0); setTodo('')}}>수정완료</span>
    }else {
      return (
        <>
          <span className="deleteBtn" onClick={() => { deleteTodoList(v.id) }}>삭제</span>
          <span className="editBtn" onClick={() => { setEditTodoId(v.id)}}>수정</span>
        </>
      )
    }
  }

  return (
    <div className="todoListBox">
      {todoList.map((v, i) => {
        return (
          <div className="todoItem" key={`todoItem-${v.id}`}>
            <div className="todoCheckBox">
              <input type="checkbox" />
              <span className="todoId">{v.id}</span>
            </div>
            <div className="todoTextBox">
              {renderTodoText(v)}
            </div>
            <div className="btnBox">
              {renderEditBtn(v)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TodoList;