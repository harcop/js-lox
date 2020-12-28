//("Hello World") print
const TokenType = require('./TokenTypes');
// const Lox = require('./lox');
const Token = require('./Token');

module.exports = class Scanner {
    start = 0;
    current = 0;
    line = 1;
    tokens = [];

    
    setKeyWord () {
        const tokenIdentifier = new Map();
        tokenIdentifier.set('and', TokenType.AND);
        tokenIdentifier.set('class', TokenType.CLASS);
        tokenIdentifier.set('or', TokenType.OR);
        tokenIdentifier.set('if', TokenType.IF);
        tokenIdentifier.set('while', TokenType.WHILE);
        tokenIdentifier.set('else', TokenType.ELSE);
        tokenIdentifier.set('for', TokenType.FOR);
        tokenIdentifier.set('return', TokenType.RETURN);
        tokenIdentifier.set('print', TokenType.PRINT);
        tokenIdentifier.set('this', TokenType.THIS);
        tokenIdentifier.set('super', TokenType.SUPER);
        tokenIdentifier.set('nil', TokenType.NIL);
        tokenIdentifier.set('var', TokenType.VAR);
        tokenIdentifier.set('false', TokenType.FALSE);
        tokenIdentifier.set('true', TokenType.TdRUE);
        this.tokenIdentifier = tokenIdentifier;
    }
    
    constructor (source) {
        this.source = source;
        this.setKeyWord();
    }

    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
        return this.tokens;
    }

    scanToken() {
        const c = this.advance();
        switch(c) {
            case '(':
                this.addToken(TokenType.LEFT_PAREN);
                break;
            case ')':
                this.addToken(TokenType.RIGHT_PAREN);
                break;
            case '{':
                this.addToken(TokenType.LEFT_BRACE);
                break;
            case '}':
                this.addToken(TokenType.RIGHT_BRACE);
                break;
            case '.':
                this.addToken(TokenType.DOT);
                break;
            case ';':
                this.addToken(TokenType.SEMI_COLON);
                break;
            case ',':
                this.addToken(TokenType.COMMA);
                break;
            case ',':
                this.addToken(TokenType.COMMA);
                break;
            case '!':
                this.addToken(this.match('=') ? TokenType.BANG_EQUAL: TokenType.BANG);
                break;
            case '=':
                this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL: TokenType.EQUAL);
                break;
            case '>':
                this.addToken(this.match('=') ? TokenType.GREATER_EQUAL: TokenType.GREATER);
                break;
            case '/':
                if (this.match('/')) {
                    while(this.peek() !== '/n' && !this.this.isAtEnd()) this.advance();
                }else {
                    this.addToken(TokenType.SLASH)
                }
                break;
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                this.line++;
                break;
            case '"':
                this.string();
                break;
            default:
                //number, variable, error
                if (this.isDigit(c)) {
                    this.number(c)
                } else if (this.isAlpha(c)) {
                    this.identifier(c);
                } else {
                    // Lox.error(this.line, "unexpected character");
                }
                break;
        }
    }

    identifier(c) {
        while(this.isAlphaNumeric(this.peek())) this.advance();
        const text = this.source.substring(this.start, this.current);
        let type = this.tokenIdentifier.get(text);
        if (!type) type = TokenType.IDENTIFIER;
        this.addToken(type);
    }

    isAlpha(c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'
    }

    isAlphaNumeric(c) {
        return this.isAlpha(c) || this.isDigit(c);
    }

    isDigit(c) {
        return c >= '0' && c <= '9';
    }

    number() {
        if(this.isDigit(this.peek())) this.advance();
        //looking for fraction
        if (this.peek() === '.' && this.isDigit(this.peekNext())) {
            this.advance();
            while(this.isDigit(this.peek())) this.advance();
        }
        this.advance();
        const num = this.source.substring(this.start, this.current);
        this.addToken(TokenType.NUMBER, num);
    }

    string() {
        while(this.source.charAt(this.current) !== '"' && !this.isAtEnd()) {
            this.advance();
        }
        
        if (this.isAtEnd()) {
            // Lox.error(this.line, "unterminated string");
            return;
        }

        this.advance();

        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType.STRING, value);
    }

    match(expected) {
        if (this.isAtEnd()) return false;
        if (this.source.charAt(this.current) !== expected) 
            return false;
        this.current++;
        return true;
    }

    peek() {
        if (this.isAtEnd()) return '/0';
        return this.source.charAt(this.current);
    }

    peekNext() {
        if (this.current + 1 >= this.source.length) return '\0';   
        return this.source.charAt(this.current + 1);  
    }

    advance() {
        this.current++;
        return this.source.substring(this.start, this.current);
    }

    isAtEnd() {
        return this.current >= this.source.length;
    }

    addToken(type) {
        this.addToken(type, "2");
    }

    addToken(type, literal) {
        const lexeme = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, lexeme, literal, this.line))
    }
}