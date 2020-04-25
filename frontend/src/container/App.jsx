import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import TodoList from '../components/TodoList'
import RadioList from '../components/RadioList'
import '../style/style.scss';

function App() {
  const [totalPage, setTotalPage] = useState(0)
  const [crruntPage, setCrruntPage] = useState(1)
  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState('')
  const [tagList, setTagList] = useState([])
  const [selectTagList, setSelectTagList] = useState([])
  const [search, setSearch] = useState('')
  const [todoOrder, setTodoOrder] = useState('DESC')
  const [todoIsComplete, setTodoIsComplete] = useState('all')

  useEffect(() => {
    getTagList()
  }, [])

  useEffect(() => {
    getTodoList()
  }, [crruntPage, todoOrder, todoIsComplete])
  

  useEffect(() => {
    if(totalPage === 0){
      setCrruntPage(1)
    }
  }, [totalPage])
  

  const getTodoList = () => {
    const params = { page: crruntPage, order: todoOrder, is_complete : todoIsComplete, search }
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
        getTagList()
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
          getTagList()
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
        getTagList()
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
          <p className='notice'>* 다중 선택 : MAC  - Command + click | WINDOW  - Control + click</p>
          <div className="btn" onClick={postTodoList}>ADD TODO</div>
        </div>
        <div className='searchBox'>
          <div className='radioBox'>
            <RadioList
              item={[{title:'전체',value:'all'},{title:'완료',value:'true'},{title:'미완료',value:'false'}]}
              active={'all'}
              name={'todoType'}
              onEvent={setTodoIsComplete}
              setCrruntPage={setCrruntPage}
            />
            <RadioList
              item={[{title:'내림차순',value:'DESC'},{title:'오름차순',value:'ASC'}]}
              active={'DESC'}
              name={'todoOrder'}
              onEvent={setTodoOrder}
              setCrruntPage={setCrruntPage}
            />
          </div>
          <div>
            <input type="text" onChange={(e)=>{setSearch(e.target.value)}}/>
            <span className="btn" onClick={getTodoList}>검색</span>
            <p className='notice'>내용,날짜 검색 가능 ( 날짜의 경우, 'YYYY-MM-DD'로 검색 )</p>
          </div>
        </div>
        <TodoList
          todoList={todoList}
          deleteTodoList={deleteTodoList}
          editTodoList={editTodoList}
        />
        <ul className="pagination">
          {renderPagination()}
        </ul>
      </div>
      <a className="btn download" href={`http://localhost:5000/api/todo/download?page=all&order=${todoOrder}&is_complete=${todoIsComplete}&search=${search}`}  target="_blank" rel="noopener noreferrer">다운로드</a>
    </div>
  );
}

export default App;
