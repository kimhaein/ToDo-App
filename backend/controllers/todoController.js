const express = require('express')
const router = require('express').Router()
const { selectTodoList, insertTodoList, deleteTodoList, editTodoList } = require('../models/todoModel')

/** 
 * todo 조회
*/
router.get('/todoList', async (req, res) => {
  const { page = 1 } = req.query

  await selectTodoList({ page }).then((data) => {
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
router.post('/todoList', async (req, res) => {
  const { todo = [], page = 1 } = req.body
  await insertTodoList({ todo }).then(async () => {
    await selectTodoList({ page }).then((data) => {
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
router.delete('/todoList', async (req, res) => {
  const { todoId, page } = req.query;
  await deleteTodoList({ todoId }).then(async (data) => {
    await selectTodoList({ page }).then((data) => {
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
router.put('/todoList', async (req, res) => {
  const { todo, todoId, page } = req.body
  const date = new Date();
  const month = date.getMonth() + 1
  const editDate = `${date.getFullYear()}-${(month < 10 ? `0${month}` : month)}-${date.getDate()}`
  await editTodoList({ todo, editDate, todoId }).then(async (data) => {
    await selectTodoList({ page }).then((data) => {
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


module.exports = router;