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
 * @param page 현재 페이지
 * @param order 정렬
 * @param is_complete 완료여부
 * @param search 검색키워드
*/
const selectTodoList = ({ page, order, is_complete, search }) => {
  let whereStatement = '';
  if (is_complete !== 'all' && search) {
    whereStatement = `WHERE is_complete = '${is_complete}' AND (text LIKE '%${search}%' OR create_date LIKE '${search}%')`
  } else if (is_complete !== 'all' && !search) {
    whereStatement = `WHERE is_complete = '${is_complete}'`
  } else if (is_complete === 'all' && search) {
    whereStatement = `WHERE text LIKE '%${search}%' OR create_date LIKE '${search}%'`
  }

  const query = [
    `SELECT (SELECT COUNT(*) FROM todo `,
    `${whereStatement} ) AS totalPage,`,
    `id, text, tag, create_date, edit_date, `,
    `CASE
        WHEN is_complete = 'true'
        THEN 'Y'
        WHEN is_complete = 'false'
        THEN 'N'
      END AS is_complete`,
    `FROM todo`,
    whereStatement,
    `ORDER BY id ${order}`,
    (page !== 'all') ? `LIMIT ${5 * (page - 1)}, 5` : null
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
 * @param todo 투두 내용
 * @param tag 참조 리스트 아이디
*/
const insertTodoList = ({ todo, tag }) => {
  const query = `INSERT INTO todo(text, tag) VALUES('${todo}', '${tag}')`;
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
 * @param todoId 투두 아이디
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
 * todo 수정
 * @param todoId 투두 아이디
 * @param data 수정할 데이터
*/
const editTodoList = (todoId, data) => {
  const createFiled = Object.keys(data).map((v) => {
    return `${v} = '${data[v]}'`
  })

  const query = [
    `UPDATE todo`,
    `SET ${createFiled.join(',')}`,
    `WHERE id = '${todoId}'; `,
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


