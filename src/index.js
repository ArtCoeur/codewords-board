var logger = require('./lib/logger'),
    rabbitmq = require('rabbit.js');

// wait until rabbitmq can accept connections, somehow

var context = rabbitmq.createContext('amqp://'+process.env.RABBITMQ_PORT_5672_TCP_ADDR+':5672');
// subscribe to facts
// deal with them as they come in