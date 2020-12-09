const Token = require('./Token');
const TokenTypes = require('./TokenTypes');

class Scanner {
    start = 0;
    current = 0;
    line = 1;

    constructor(source) {
        this.source = source;
        this.tokens = [];
    }

    scanTokens () {
        while (!isAtEnd()) {
            start = current;
            scanToken();
        }
        this.tokens.push(new Token(TokenTypes.EOF, "", null, line));
        return this.tokens;
    }

    scanToken() {
        
    }

    isAtEnd() {

    }
}