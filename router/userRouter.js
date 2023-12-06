const express = require('express');
const problemRouter = express.Router();
const mysql = require('mysql');
const { check, validationResult } = require('express-validator');
const { title } = require('process');

function connect() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'mysql',
    });
}
function querySql(sql) { 
    const conn = connect();
    conn.query('USE oj_schema');
    return new Promise((resolve, reject) => {
      try {
        conn.query(sql, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        })
      } catch (e) {
        reject(e);
      } finally {
        conn.end();
      }
    })
  }

problemRouter.get('/samples', [
  check('id').isNumeric({ min: 1 })
], (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }
  let { id } = req.query;
  // TODO
  /*res.sendFile();*/
});

problemRouter.get('/list', [
  check('evaluation').isBoolean(),
  // check('cookie').isCookie(),
  check('order').custom(order => {
    if (order != 'id' && order != 'grade' && order != 'title') {
      throw new Error('排序依据错误');
    }
  }),
  check('increase').isBoolean(),
  check('start').isNumeric(),
  check('end').isNumeric()
], (req, res) => {
    let {
      evaluation,
      cookie,
      order,
      increase,
      titleKeyword,
      sourceKeyword,
      tagKeyword,
      start,
      end
    } = req.query;
    if (start > end) {
      return res.status(422).json({
        success: false,
        message: '范围无效'
      })
    }
    
    // TODO
    res.json({
      "success": true,
      "message": "未知错误",
      "result": [{
          "id": "U9riowjk",
          "title": "归程",
          "source": "NOI2018",
          "submit": 1088,
          "pass": 0.618,
          "score": 70,
          "grade": 3.465,
          "tags": ["树状数组", "贪心", "思维"]
      }],
      "count": 100
  });
});

problemRouter.get('/info', [
  check('id').isNumeric({ min: 1 }),
  // check('cookie').isCookie(),
  check('evaluation').isBoolean()
], (req, res) => {
  let { /**/ } = req.query;
  // TODO
  res.json({
    success: true,
    message: "id不合法",
    title: "归程",
    source: "NOI2018",
    submit: 1088,
    pass: 0.618,
    score: 70,
    grade: 3.465,
    tags: ["树状数组", "贪心", "思维"],
    titleEn: "return",
    type: 0,
    timeLimit: 1000,
    memoryLimit: 512,
    background: "有一天你时空穿越了...",
    statement: "*欢迎*来到**编程世界**。这是一道~~模板题目~~，请你输出`Hello, world!`。",
    inputStatement: "本题没有输入，但是可以测试公式$\\frac{1}{2}$，还有$f(x)=\\sum_{k\\geq 0}\\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k$。",
    outputStatement: "输出一行`Hello, world!`。",
    rangeAndHint: "本题没有数据范围。但是，我们还是可以测试一下如果描述变得很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长，那么会怎么分行？",
    samples: [{
        "display": true,
        "input": "1 2",
        "output": "3"
    }]
  });
});

problemRouter.post('/delete', [
  /*check('cookie').isCookie(),*/
  check('id').isNumeric({ min: 1 })
],(req, res) => {
  // TODO
  res.json({
    "cookie": "hjerkb89Hjsu",
    "id": "1002"
  });
});

problemRouter.post('/change-by-file', [
  /*check('cookie').isCookie(),*/
  check('id').isNumeric({ min: 1 })
  /*check('file').isFile() */
],(req, res) => {
  let { /**/ } = req.body;
  // TODO
  res.json({
    "success": true,
    "message": "题目id不存在"
  });
});

problemRouter.post('/change-data', [
  /*check('cookie').isCookie(),*/
  check('id').isNumeric({ min: 1 })
  /*check('file').isFile() */
],(req, res) => {
  let { /**/ } = req.body;
  // TODO
  res.json({
    "success": true,
    "message": "题目id不存在"
  });
});

problemRouter.post('/change-meta', [
  /*check('cookie').isCookie(),*/
  check('id').isNumeric({ min: 1 })
  /*...*/
],(req, res) => {
  let { /**/ } = req.body;
  // TODO
  res.json({
    "cookie": "hiu98BJKbjhbsgw",
    "id": 1001,
    "title": "你好，世界",
    "titleEn": "helloworld",
    "type": 0,
    "timeLimit": 1000,
    "memoryLimit": 512,
    "background": "有一天你时空穿越了...",
    "statement": "欢迎来到编程世界。\\n这是一道模板题目，请你输出`Hello, world!`。",
    "inputStatement": "本题没有输入。",
    "outputStatement": "输出一行`Hello, world!`。",
    "rangeAndHint": "本题没有数据范围。",
    "source": "无"
  });
});

problemRouter.post('/create-by-file', [
  /*check('cookie').isCookie(),*/
  check('id').isNumeric({ min: 1 })
  /*check('file').isFile() */
],(req, res) => {
  let { /**/ } = req.body;
  // TODO
  res.json({
    "success": true,
    "message": "题目id不存在"
  });
});

problemRouter.post('/create', [
  /*check('cookie').isCookie(),*/
  check('id').isNumeric({ min: 1 })
  /*check('file').isFile() */
],(req, res) => {
  let { /**/ } = req.body;
  // TODO
  res.json({
    "success": true,
    "message": "题目id不存在"
  });
});

module.exports = problemRouter;