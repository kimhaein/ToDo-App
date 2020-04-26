const express = require('express')
const bodyParser = require('body-parser');
// const cors = require('cors');
const todoController = require('./controllers/todoController')
// 기본 셋팅 
const app = express()
const port = 5000

/* HTTP BODY 처리 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* CORS 처리 */
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// 라우터
app.use('/api', todoController)

app.listen(port, () => console.log(`start http://localhost:${port}`))