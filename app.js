const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { port, SECRET } = require('./config');
// 引入 API  Router
const routes = require('./routes');

const app = express();

const staticPath = path.resolve(__dirname, 'public');
app.use('/public', express.static(staticPath));
app.use(cookieParser(SECRET || 'adab2f8e907154131d30fedb4ff0133'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', function (req, res, next) {
  const origin = req.headers.origin;
  console.log('origin', origin);
  res.header('Access-Control-Allow-Origin', origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Access-Control-Allow-Credentials', 'true');
  // 这段仅仅为了方便返回json而已;
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method == 'OPTIONS') {
    //让options请求快速返回
    res.sendStatus(200);
  } else {
    next();
  }
});

// API  Router 文件的调用
routes(app);
app.listen(port || 3001);
