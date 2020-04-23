import React, { useState } from 'react';

function TodoItem({data, deleteTodoList, editTodoList}) {
  const [editTodoId, setEditTodoId] = useState(0)
  const [text, setText] = useState('')
  const [isChecked, serIsChecked] = useState((data.is_complete === 'Y') ? true : false)

  const renderTodoText = (todo) => {
    const tagsList = todo.tag.map((v)=>{
      const is_complete = todo.completedTags.includes(v)
      return (<span key={`tag-${v}`}className={`tagList ${(is_complete)?'complete':''}`}>@{v}</span>)
    })

    if(editTodoId === todo.id){
      return <input type="text" defaultValue={todo.text} onChange={({target})=>{ setText(target.value)}}/>
    }else {
      return (
        <>
          <div className="todoText">{todo.text}</div>
          <div className="todoDate">create | {todo.create_date} {todo.edit_date?`/ edit | ${todo.edit_date}`:''}</div>
          <div>{tagsList}</div>
        </>
      )
    }
  }

  const renderEditBtn = (todo) => {
    if(editTodoId === todo.id){
      return <span className="editBtn" onClick={() => { editTodoList(text, todo.id ,todo.is_complete); setEditTodoId(0);}}>수정완료</span>
    }else {
      return (
        <>
          <span className="deleteBtn" onClick={() => { deleteTodoList(todo.id) }}>삭제</span>
          <span className="editBtn" onClick={() => { setEditTodoId(todo.id)}}>수정</span>
        </>
      )
    }
  }

  const isComplete = (target, todoId, completedTags , tag) => {

    if(completedTags.length !== tag.length) {
      alert('참조 리스트를 전부 완료 후, 해당 리스트를 완료 할 수 있습니다.')
      serIsChecked(false)
    }else {
      const is_complete = target.checked ? 'Y' : 'N'
      editTodoList(text, todoId, is_complete)
      serIsChecked(!isChecked)
    }
  }


  return (
    <div className="todoItem" key={`todoItem-${data.id}`}>
      <div className="todoCheckBox">
        <input 
          type="checkbox" 
          onChange={({target})=>{ isComplete(target, data.id, data.completedTags , data.tag) }} 
          checked={isChecked}
          disabled={editTodoId === data.id}
        />
        <span className="todoId">{data.id}</span>
      </div>
      <div className="todoTextBox">
        {renderTodoText(data)}
      </div>
      <div className="btnBox">
        {renderEditBtn(data)}
      </div>
      {(isChecked)?<div className="completeBox">Complete</div>:null}
    </div>
  )
}

export default TodoItem;