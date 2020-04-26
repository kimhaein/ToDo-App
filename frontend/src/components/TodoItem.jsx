import React, { useState } from 'react';

function TodoItem({data, deleteTodoList, editTodoList}) {

  const [editTodoId, setEditTodoId] = useState(0)
  const [text, setText] = useState('')
  const [isChecked, serIsChecked] = useState((data.is_complete === 'Y') ? true : false)

  const renderTodoText = () => {
    const tagsList = data.tag.map((v)=>{
      const is_complete = data.completedTags.includes(v)
      return (<span key={`tag-${v}`}className={`tagList ${(is_complete)?'complete':''}`}>@{v}</span>)
    })

    if(editTodoId === data.id){
      return <input type="text" defaultValue={data.text} onChange={({target})=>{ setText(target.value)}}/>
    }else {
      return (
        <>
          <div className="todoText">{data.text}</div>
          <div className="todoDate">create | {data.create_date} {data.edit_date?`/ edit | ${data.edit_date}`:''}</div>
          <div>{tagsList}</div>
        </>
      )
    }
  }

  const renderEditBtn = () => {
    if(editTodoId === data.id){
      return <span className="editBtn" onClick={() => { editTodoList(text, data.id ,data.is_complete); setEditTodoId(0);}}>수정완료</span>
    }else {
      return (
        <>
          <span className="deleteBtn" onClick={() => { deleteTodoList(data.id) }}>삭제</span>
          <span className="editBtn" onClick={() => { setEditTodoId(data.id)}}>수정</span>
        </>
      )
    }
  }

  const isComplete = (target, todoId, completedTags , tag) => {

    if(completedTags.length !== tag.length) {
      serIsChecked(false)
      alert('참조 리스트를 전부 완료 후, 해당 리스트를 완료 할 수 있습니다.')
    }else {
      const is_complete = target.checked ? 'Y' : 'N'
      serIsChecked(!isChecked)
      editTodoList(text, todoId, is_complete)
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
        {renderTodoText()}
      </div>
      <div className="btnBox">
        {renderEditBtn()}
      </div>
      {(isChecked)?<div className="completeBox">Complete</div>:null}
    </div>
  )
}

export default TodoItem;