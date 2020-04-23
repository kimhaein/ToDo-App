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
const selectTodoList = (page) => {
  const query = [
    `SELECT (SELECT COUNT(*)  FROM todo) AS totalPage,`,
    `id, text, tag, create_date, edit_date,`,
    `CASE
        WHEN is_complete = 'true'
        THEN 'Y'
        WHEN is_complete = 'false'
        THEN 'N'
      END AS is_complete`,
    `FROM todo`,
    `ORDER BY id DESC`,
    (page) ? `LIMIT ${5 * (page - 1)},5` : null
  ].join(' ')

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
const insertTodoList = ({ todo, tag }) => {
  const query = `INSERT INTO todo (text , tag) VALUES ('${todo}','${tag}')`;
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
const editTodoList = (todoId, data) => {
  const createFiled = Object.keys(data).map((v) => {
    return `${v} = '${data[v]}'`
  })

  const query = [
    `UPDATE todo`,
    `SET ${createFiled.join(',')}`,
    `WHERE id='${todoId}';`,
    `UPDATE todo`
  ].join(' ')

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


/** 
 * 참조 리스트 조회
*/
const selectTagList = () => {
  const query = `SELECT id, text, is_complete FROM todo ORDER BY id DESC`;
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

module.exports.selectTagList = selectTagList


/** 
 * 완료된 투두 조회
*/
const selectCompletedTodoList = () => {
  const query = [
    `SELECT id`,
    `FROM todo`,
    `WHERE is_complete == 'true'`
  ].join(' ')

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

module.exports.selectCompletedTodoList = selectCompletedTodoList

