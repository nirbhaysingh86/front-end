const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const jsonServer = require('json-server');

const server = jsonServer.create();
const port = process.env.PORT || 3000;

const obj = {};
const files = fs.readdirSync(path.resolve(__dirname, './data/'));

files.forEach((file) => {
  if (file.indexOf('.json') > -1) {
    _.extend(obj, require(path.resolve(__dirname, './data/', file)));
  }
});

const router = jsonServer.router(obj);

server.use(jsonServer.defaults());
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running at ${port}`);
});
