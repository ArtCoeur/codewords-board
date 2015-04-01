var logger = require('./lib/logger'),
    rabbitmq = require('rabbit.js'),
    handler = require('./lib/handler');

logger.info('board handler running');

// wait until rabbitmq can accept connections, somehow

function doConnect(){

    try {
        var context = rabbitmq.createContext(
            'amqp://' + process.env.RABBITMQ_PORT_5672_TCP_ADDR + ':' + process.env.RABBITMQ_PORT_5672_TCP_PORT
        );

        context.on('ready', function() {

            logger.info('connected');

            // subscribe to pub and sub queues
            var sub = context.socket('SUB'),
                pub = context.socket('PUB');

            sub.connect('events', function(){
                logger.info('Connected to events');

                // deal with facts as they come in
                sub.on('data', function (body) {
                    logger.info("new fact : " + body);
                    handler.handleFact(pub, JSON.parse(body));
                });
            });
        });

        return true;

    } catch (err){
        logger.error(err);

        setTimeout(doConnect, 3000);
        return false;
    }
}

// hack to wait till rabbitmq is up
setTimeout(doConnect, 10000);
