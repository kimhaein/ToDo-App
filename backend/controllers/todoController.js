const router = require('express').Router()
const {
  selectTodoList,
  insertTodoList,
  deleteTodoList,
  editTodoList,
  selectTagList,
  selectCompletedTodoList
} = require('../models/todoModel')


/** 
 * todo 조회
*/
router.get('/todo', async (req, res) => {
  const { page = 1 } = req.query;

  const [completedList, todoList] = await Promise.all([
    selectCompletedTodoList(),
    selectTodoList(page)
  ])

  const completedTags = completedList.map((v) => v.id)

  const list = todoList.map((v) => {
    const tagList = []
    if (v.tag) {
      v.tag = v.tag.split('-')
      v.tag.forEach((tag) => {
        if (completedTags.includes(+tag)) {
          tagList.push(tag)
        }
      })
    } else {
      v.tag = []
    }

    return {
      ...v,
      completedTags: tagList,
      create_date: v.create_date.slice(0, 10)
    }
  })

  res.send({
    totalPage: Math.ceil(list[0].totalPage / 5),
    list,
  })
})

/** 
 * todo 추가
*/
router.post('/todo', (req, res) => {
  const { todo = [], tag = '', page = 1 } = req.body
  insertTodoList({ todo, tag })
    .then(() => {
      res.sendStatus(200)
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
  deleteTodoList({ todoId })
    .then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      console.log(err)
    })
})

/** 
 * todo 데이터 수정
*/
router.put('/todo/:todoId', (req, res) => {
  const { todo, is_complete } = req.body;
  const { todoId } = req.params;
  const data = {};
  if (todo) {
    const date = new Date();
    const month = date.getMonth() + 1
    data.text = todo
    data.edit_date = `${date.getFullYear()}-${(month < 10 ? `0${month}` : month)}-${date.getDate()}`
  }

  data.is_complete = is_complete === 'Y' ? true : false

  editTodoList(todoId, data)
    .then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      console.log(err)
    })
})

/** 
 * 참조 리스트 조회
*/
router.get('/todo/tag', (req, res) => {
  selectTagList()
    .then((data) => {
      res.send({
        tagList: data
      })
    }).catch((err) => {
      console.log(err)
    })
})

/** 
 * todo 다운로드
*/
router.get('/todo/download', (req, res) => {
  selectTodoList()
    .then((data) => {
      const csvArray = ['id, text, tag, create_date, edit_date, is_complete'];
      data.map((v) => {
        csvArray.push(`${v.id}, ${v.text}, ${v.tag}, ${v.create_date}, ${v.edit_date}, ${v.is_complete}`)
      })

      const buf = Buffer.from('\u{FEFF}' + csvArray.join('\n'), 'utf-8');
      res.set('Content-Type', 'text/csv; charset=utf-8');
      res.set('Content-disposition', `attachment; filename=todo.csv`);
      res.set('Content-length', buf.length);
      res.end(buf);

    }).catch((err) => {
      console.log(err)
    })
})

module.exports = router;