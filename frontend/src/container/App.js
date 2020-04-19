import React from 'react';
import '../style/style.scss';

function App() {
  return (
    <div className="App">
      <h1>TodoList</h1>
      <div className="todoBox">
        <div className="todoInputBox">
          <label className="todoList">
            <span>할 일</span>
            <input type="text" placeholder="TodoList" />
          </label>
          <label className="todoTag">
            <span>참조 태그</span>
            <input type="text" placeholder="1,2" />
          </label>
          <p>* 참조할 tagId를 콤마로 구분하여 작성해주세요</p>
          <div className="submitBtn">ADD TODO</div>
        </div>
        <div className="todoListBox">
          <div className="todoItem">
            <div className="todoCheckBox">
              <input type="checkbox" />
              <span className="todoId">id :1</span>
            </div>
            <div className="todoTextBox">
              <span className="todoText">text</span>
              <div className="todoDate">create:2010.04.02 / edit:2010.04.02</div>
            </div>
            <div className="btnBox">
              <span className="deleteBtn">삭제</span>
              <span className="editBtn">수정</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
