const express = require('express')

// 기본 셋팅 
const app = express()
const port = 5000

// 라우터
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))