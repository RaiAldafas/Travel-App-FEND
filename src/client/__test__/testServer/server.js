import express from 'express';
import router from './route';

const app = express();
app.use(router);

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

const server = app.listen(8081, function () {
  var port = this.address().port;
  console.log('Example app listening on port 8081!', port);
});

export default server;