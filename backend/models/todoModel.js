const sqlite3 = require('sqlite3')
// DB
const db = new sqlite3.Database('./db/todoApp.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});

/** 
 * todo 조회
*/
const selectTodoList = ({ page }) => {
  const query = `SELECT (SELECT COUNT(*)  FROM todo) AS totalPage, * FROM todo ORDER BY id DESC LIMIT ${5 * (page - 1)},5`;
  return new Promise(function (resolve, reject) {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports.selectTodoList = selectTodoList

/** 
 * todo 추가
*/
const insertTodoList = ({ todo }) => {
  const query = `INSERT INTO todo (text) VALUES ('${todo}')`;
  return new Promise(function (resolve, reject) {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports.insertTodoList = insertTodoList

/** 
 * todo 삭제
*/
const deleteTodoList = ({ todoId }) => {
  const query = `DELETE FROM todo WHERE id = '${todoId}'`;
  return new Promise(function (resolve, reject) {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports.deleteTodoList = deleteTodoList

/** 
 * todo 삭제
*/
const editTodoList = ({ todo, editDate, todoId }) => {
  const query = `UPDATE todo SET text='${todo}', edit_date='${editDate}' WHERE id='${todoId}';`
  return new Promise(function (resolve, reject) {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports.editTodoList = editTodoList

