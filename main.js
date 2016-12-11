/* Init server */
var express = require('express');
var bodyParser = require('body-parser');

// create a new express server
var app = express();

var port = 3000;

//Init
var todolist = [];
todolist.push({ rid: 0, 
                task: "Happy Polymer Coding", 
                user: "Ruben Chavarri", 
                time: "" });


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/todo')
  .get(function(req, res) {
    console.log('api/todo');
    res.json(JSON.stringify(todolist));
  })
  .post(function(req, res) {
      console.log('POST api/todo/ ' + ' body ' + req.body );
      todolist.push(req.body);
      res.json(req.body);
  })


router.route('/todo/:id')
  .get(function(req, res) {
      console.log('GET api/todo/:id ' + req.params.id);
      res.json(JSON.stringify(req.params.id));
  })
  .put(function(req, res) {
      console.log('PUT api/todo/:id ' + req.params.id);
      var index = getIndexById(todolist, req.params.id);
      console.log('index ' + index + '' + req.body);
      if (index > 0){
          todolist[index] = req.body;
      }
      res.json(req.params.id);
  })
  .post(function(req, res) {
      console.log('POST2 api/todo/ ' + ' body ' + req.body );
      todolist.push(req.body);
      res.json(req.body);
  })
  .delete(function(req, res) {
      console.log('DELETE api/todo/:id ' + req.params.id);
      var index = getIndexById(todolist, req.params.id);
      if (index > 0){
          todolist.splice(index,1);
      }
      res.json(req.params.id);
  })

function getIndexById(list, id){
    var intId = parseInt(id);
    var index = -1;
    for(var i = 0, length = list.length; i < length; i++){
        if (list[i].rid === intId) {
            index = i;
            break;
        }
    }
    return index;
}

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port, '0.0.0.0', function() { //appEnv.port
  // print a message when the server starts listening
  console.log("server starting on " + port);
});