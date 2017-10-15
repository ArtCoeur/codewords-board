var JsonBoardParser = require('./json_board_parser'),
    XmlBoardParser = require('./xml_board_parser'),
    logger = require('./logger'),
    _ = require('underscore');

/**
 * Extract words from board data & cells
 * Publish facts on the board
 *
 * @param pub socket to write facts back to
 * @param fact A fact object
 */
exports.newFact= (pub, fact) => {
    var parser;

    if (fact.name == 'board.new'){
        if (fact.data.type == 'application/vnd.artcoeur.com-v1+json') {
            parser = parseJsonFact(fact);
            handleNewBoard(pub, fact, parser);
        } else if (fact.data.type == 'application/vnd.bestforpuzzles.com-v1+xml'){
            parser = parseXMLFact(fact);
            handleNewBoard(pub, fact, parser);
        } else {
            logger.info("Unknown fact.data.type: " + fact.data.type);
        }
    }
};

parseJsonFact = (fact) => {
    return new JsonBoardParser(fact.data.body.board);
};

parseXMLFact = (fact) => {
    var xml_parser = new XmlBoardParser(fact.data.body);
    var lines = [];
    while(xml_parser.hasMore()){
        lines.push(xml_parser.next());
    }

    // next feed lines into a json parser to generate words
    return new JsonBoardParser(lines);
};

/**
 *
 * @param pub
 * @param fact
 * @param parser
 */
handleNewBoard = (pub, fact, parser) => {

    while(parser.hasMore()){
        publishNewWord(pub, fact.board, parser.next());
    }

    // publish facts about the solved cells
    // solved is an object in this format : {"3": "e", "16:"j"}
    _.each(_.keys(fact.data.body.solved), function(element){
        publishCellUpdated(pub, fact.board, element, fact.data.body.solved[element]);
    });
};

publishNewWord = (pub, board, word) => {
    pub.write(JSON.stringify({
        board: board,
        name: 'word.new',
        data: {
            body: word,
            type: 'application/json'
        }
    }), 'utf8');
};

publishCellUpdated = (pub, board, number, letter) => {
    pub.write(JSON.stringify({
        board: board,
        name: 'cell.updated',
        data: {
            body: {
                number: number,
                letter: letter
            },
            type: 'application/json'
        }
    }),'utf8');
};