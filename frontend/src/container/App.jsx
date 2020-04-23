import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import TodoList from '../components/TodoList'
import '../style/style.scss';

function App() {
  const [totalPage, setTotalPage] = useState(0)
  const [crruntPage, setCrruntPage] = useState(1)
  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState('')
  const [tagList, setTagList] = useState([])
  const [selectTagList, setSelectTagList] = useState([])

  useEffect(() => {
    getTagList()
  }, [])

  useEffect(() => {
    getTodoList()
  }, [crruntPage])

  useEffect(() => {
    if(totalPage === 0){
      setCrruntPage(1)
    }
  }, [totalPage])
  


  const getTodoList = () => {
    const params = { page: crruntPage }
    axios.get(`http://localhost:5000/api/todo`, { params })
      .then((result) => {
        setTotalPage(result.data.totalPage)
        setTodoList(result.data.list)
      }).catch((e) => {
        console.log(e)
      })
  }

  const postTodoList = () => {
    if(todo) {
      const data = { todo, page: crruntPage, tag:selectTagList.join('-') }
      axios.post('http://localhost:5000/api/todo', qs.stringify(data))
      .then(() => {
        getTodoList()
      }).catch((e) => {
        console.log(e)
      })
    }else {
      alert('할 일은 필수 값입니다.')
    }
  }

  const deleteTodoList = (todoId) => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (confirm) {
      const params = { page: crruntPage }
      axios.delete(`http://localhost:5000/api/todo/${todoId}`, { params })
        .then(() => {
          getTodoList()
        }).catch((e) => {
          console.log(e)
        })
      }
  }

  const editTodoList = (todo, todoId, is_complete) => {
    const data = {todo, todoId, is_complete}
    if (todo || is_complete){ 
      axios.put(`http://localhost:5000/api/todo/${todoId}`, qs.stringify(data))
      .then(() => {
        getTodoList()
      }).catch((e) => {
        console.log(e)
      })
    }
    

  }

  const getTagList = () => {
    axios.get(`http://localhost:5000/api/todo/tag`)
      .then((result) => {
        setTagList(result.data.tagList)
      }).catch((e) => {
        console.log(e)
      })
  }

  const selectTag = (e) => {
    const options = e.target.options
    const value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectTagList(value)
  }
  

  const renderOption = ()=>{
    const option = tagList.map((v,i)=>{
      return (<option value={v.id} key={`tag-${v.id}`}>{`${v.id} | ${v.text}`}</option>)
    })
    return option
  }

  const renderPagination = () => {
    let pagination = []

    for (let page = 1; page <= totalPage; page++) {
      const active =(page === crruntPage)?'active':''
      pagination.push(<li key={`page-${page}`} className={active}onClick={() => { setCrruntPage(page) }}>{page}</li>)
    }
    return pagination
  }

  return (
    <div className="App">
      <h1>Todo-List</h1>
      <div className="todoBox">
        <div className="todoInputBox">
          <label className="todoList">
            <span>할 일</span>
            <input type="text" placeholder="TodoList" onChange={(e) => { setTodo(e.target.value) }} />
          </label>
          <label className="todoTag">
            <span>참조 태그</span>
            <select multiple={true} onChange={selectTag}>
              {renderOption()}
            </select>
          </label>
          <p>* 다중 선택 : MAC  - Command + click | WINDOW  - Shift + click</p>
          <div className="btn" onClick={postTodoList}>ADD TODO</div>
        </div>
        <div>
          <label>전체
            <input type="radio" name="complete" defaultChecked={true}/>
          </label>
          <label>완료
            <input type="radio" name="complete" defaultChecked={false}/>
          </label>
          <label>미완료
            <input type="radio" name="complete" defaultChecked={false}/>
          </label>
          <label>오름차순
            <input type="radio" name="order" value="DESC" defaultChecked={false}/>
          </label>
          <label>내림차순
            <input type="radio" name="order" value="ASC" defaultChecked={false}/>
          </label>
          <input type="textBox" />
          <div className="btn">검색</div>
        </div>
        <TodoList
          todoList={todoList}
          deleteTodoList={deleteTodoList}
          editTodoList={editTodoList}
          tagList={tagList}
        />
        <ul className="pagination">
          {renderPagination()}
        </ul>
      </div>
      <a className="btn download" href="http://localhost:5000/api/todo/download" target="_blank">다운로드</a>
    </div>
  );
}

export default App;
