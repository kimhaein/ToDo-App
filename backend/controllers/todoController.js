const express = require('express')
const router = require('express').Router()
const { selectTodoList, insertTodoList, deleteTodoList, editTodoList, selectTagList } = require('../models/todoModel')

/** 
 * todo 조회
*/
router.get('/todo', (req, res) => {
  const { page = 1 } = req.query

  selectTodoList({ page }).then((data) => {
    const totalPage = data[0].totalPage
    const result = data.map(v => {
      delete v.totalPage
      return {
        ...v,
        create_date: v.create_date.slice(0, 10)
      }
    });

    res.send({
      totalPage: Math.ceil(totalPage / 5),
      list: result
    })
  }).catch((err) => {
    console.log(err)
  })
})

/** 
 * todo 추가
*/
router.post('/todo', (req, res) => {
  const { todo = [], tag = '', page = 1 } = req.body
  insertTodoList({ todo, tag }).then(() => {
    selectTodoList({ page }).then((data) => {
      const totalPage = data[0].totalPage
      const result = data.map(v => {
        delete v.totalPage
        return {
          ...v,
          create_date: v.create_date.slice(0, 10)
        }
      });

      res.send({
        totalPage: Math.ceil(totalPage / 5),
        list: result
      })
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
})

/** 
 * todo 삭제
*/
router.delete('/todo/:todoId', (req, res) => {
  const { page } = req.query;
  const { todoId } = req.params;
  deleteTodoList({ todoId }).then(() => {
    selectTodoList({ page }).then((data) => {
      const totalPage = (data.length > 0) ? data[0].totalPage : 0
      const result = data.map(v => {
        delete v.totalPage
        return {
          ...v,
          create_date: v.create_date.slice(0, 10)
        }
      });

      res.send({
        totalPage: Math.ceil(totalPage / 5),
        list: result
      })
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
})

/** 
 * todo 수정
*/
router.put('/todo/:todoId', (req, res) => {
  const { todo, page } = req.body;
  const { todoId } = req.params;
  const date = new Date();
  const month = date.getMonth() + 1
  const editDate = `${date.getFullYear()}-${(month < 10 ? `0${month}` : month)}-${date.getDate()}`

  editTodoList({ todo, editDate, todoId }).then((data) => {
    selectTodoList({ page }).then((data) => {
      const totalPage = data[0].totalPage
      const result = data.map(v => {
        delete v.totalPage
        return {
          ...v,
          create_date: v.create_date.slice(0, 10)
        }
      });

      res.send({
        totalPage: Math.ceil(totalPage / 5),
        list: result
      })
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
})

/** 
 * 참조 리스트 조회
*/
router.get('/todo/tag', (req, res) => {
  selectTagList().then((data) => {
    res.send({
      tagList: data
    })
  }).catch((err) => {
    console.log(err)
  })
})

module.exports = router;