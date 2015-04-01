var logger = require('./lib/logger'),
    rabbitmq = require('rabbit.js');

logger.info('board handler running');

// wait until rabbitmq can accept connections, somehow

var context = rabbitmq.createContext('amqp://'+process.env.RABBITMQ_PORT_5672_TCP_ADDR+':5672');

context.on('ready', function() {
    logger.info('connected');
    // subscribe to facts
    var sub = context.socket('SUB'), pub = context.socket('PUB');

    // test connection
    pub.write(JSON.stringify({name: 'board-ready'}), 'utf8');

    // deal with facts as they come in
    sub.on('data', function(body) {
        logger.info("fact : " +  JSON.parse(body));

    });
});

