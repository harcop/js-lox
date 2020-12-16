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
        const c = advance();
        switch (c) {
          case '(': addToken(TokenType.LEFT_PAREN); break;
          case ')': addToken(TokenType.RIGHT_PAREN); break;
          case '{': addToken(TokenType.LEFT_BRACE); break;
          case '}': addToken(TokenType.RIGHT_BRACE); break;
          case ',': addToken(TokenType.COMMA); break;
          case '.': addToken(TokenType.DOT); break;
          case '-': addToken(TokenType.MINUS); break;
          case '+': addToken(TokenType.PLUS); break;
          case ';': addToken(TokenType.SEMICOLON); break;
          case '*': addToken(TokenType.STAR); break; 
        }
    }

    isAtEnd() {
         
    }
    advance() {
        current++;
        return source.charAt(current - 1);
      }
    
    addToken(type) {
        addToken(type, null);
    }

    addToken(type, literal) {
        const text = source.substring(start, current);
        tokens.push(new Token(type, text, literal, line));
    }
}