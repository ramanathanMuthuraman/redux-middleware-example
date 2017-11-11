const jsonServer = require('json-server');
const PORT = 3456;
const server = jsonServer.create();

server.use(jsonServer.defaults());

server.get('*/api/:id', function (req, res) {
  const id = req.params.id;
  const delay = id % 2 === 0 ? 3000 : 0;
  setTimeout(() => {
    res.send({"response": `${id} with delay of ${delay} ms`});
  }, delay);
});

server.listen(PORT, function () {
  console.log('JSON Mock Server is running on port ' + PORT);
});