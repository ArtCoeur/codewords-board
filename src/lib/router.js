var BoardParser = require('./board_parser'),
    logger = require('./logger');

// deal with facts as they arrive

/**
 * @param pub socket to write facts back to
 * @param fact fact object
 */
exports.handleFact= function(pub, fact) {
    if (fact.name == 'new-board'){
        // extract words from board data & cells
        handleNewBoard(pub, fact);
        // pub.write(json, 'utf8');
    }
};

/**
* @param pub socket to write facts back to
* @param fact fact object
*/
function handleNewBoard(pub, fact) {

    // parse fact.data.body using fact.data.type
    var parser = new BoardParser(fact.data.body.board);

    while(parser.hasMore()){
        var word = parser.next();
        logger.info(word);
        pub.write(JSON.stringify({
            board: fact.board,
            name: 'new-word',
            data: {
                body: word,
                type: 'application/json'
            }
        }), 'utf8');
    }
}