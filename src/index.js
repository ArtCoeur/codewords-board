var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser'),
    board = require('./lib/board'),
    rabbitmq = require('rabbit.js');

app.use(bodyParser.text({type : 'text/*', limit: '1024kb'}));
app.use(bodyParser.text({type : 'application/xml', limit: '1024kb'}));
app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'codewords/entry',
        description : "Post board data with the correct content-type to /boards"
    });
});

app.post('/boards', function(req, res) {

    var context = rabbitmq.createContext('amqp://'+process.env.RABBITMQ_PORT_5672_TCP_ADDR+':5672');

    logger.log('info', 'new-board received');

    // call the board generator with the rabbit mq context, the board data and type and a callback
    board.create(context, req.body, req.get('Content-Type'), function(err, result) {
        if (!err){
            logger.log('info', 'Success');
            res.json(result);
        } else {
            logger.log('error', err);
            res.status(400).json(result);
        }
    });
});

var PORT = process.env.PORT || 80;

app.listen(PORT);

logger.log('info', 'Running codewords entry service on http://localhost:' + PORT);