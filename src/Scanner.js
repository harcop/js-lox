const Token = require('./Token');
const TokenTypes = require('./TokenTypes');
const Lox = require('../index');
class Scanner {
    start = 0;
    current = 0;
    line = 1;

    constructor(source) {
        this.source = source;
        this.tokens = [];
        setKeywords();
    }

    keywords = new Map();

    static setKeywords () {
        keywords.set("and",    TokenType.AND);
        keywords.set("class",  TokenType.CLASS);
        keywords.set("else",   TokenType.ELSE);
        keywords.set("false",  TokenType.FALSE);
        keywords.set("for",    TokenType.FOR);
        keywords.set("fun",    TokenType.FUN);
        keywords.set("if",     TokenType.IF);
        keywords.set("nil",    TokenType.NIL);
        keywords.set("or",     TokenType.OR);
        keywords.set("print",  TokenType.PRINT);
        keywords.set("return", TokenType.RETURN);
        keywords.set("super",  TokenType.SUPER);
        keywords.set("this",   TokenType.THIS);
        keywords.set("true",   TokenType.TRUE);
        keywords.set("var",    TokenType.VAR);
        keywords.set("while",  TokenType.WHILE);
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
            case '!':
                addToken(match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
                break;
            case '=':
                addToken(match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
                break;
            case '<':
                addToken(match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
                break;
            case '>':
                addToken(match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
                break;
            case '/':
                if (match('/')) {
                    // A comment goes until the end of the line.
                    while (peek() != '\n' && !isAtEnd()) advance();
                } else {
                    addToken(TokenType.SLASH);
                }
                break;
            case ' ':
                case '\r':
                case '\t':
                    // Ignore whitespace.
                    break;
            
            case '\n':
                line++;
                break;
            case '"': string(); break;
            case 'o':
                if (peek() == 'r') {
                    addToken(TokenType.OR);
                }
                break;
            default:
                if (isDigit(c)) {
                    number();
                  } else if (isAlpha(c)) {
                    identifier();
                  }else {
                    Lox.error(line, "Unexpected character.");
                  }
            break;
        }
    }

    identifier() {
        while (isAlphaNumeric(peek())) advance();
        addToken(TokenType.IDENTIFIER);
      }

    number() {
        while (isDigit(peek())) advance();
    
        // Look for a fractional part.
        if (peek() == '.' && isDigit(peekNext())) {
          // Consume the "."
          advance();
    
          while (isDigit(peek())) advance();
        }
    
        addToken(TokenType.NUMBER,
            // Double.parseDouble(source.substring(start, current)));
            parseFloat(this.source.substring(start, current)));
    }
    

    string() {
        while (peek() != '"' && !isAtEnd()) {
          if (peek() == '\n') line++;
          advance();
        }
    
        if (isAtEnd()) {
          Lox.error(line, "Unterminated string.");
          return;
        }
    
        // The closing ".
        advance();
    
        // Trim the surrounding quotes.
        const value = source.substring(start + 1, current - 1);
        addToken(STRING, value);
    }

    match(expected) {
        if (isAtEnd()) return false;
        if (source.charAt(current) != expected) return false;
    
        current++;
        return true;
    }

    peek() {
        if (isAtEnd()) return '\0';
        return source.charAt(current);
    }

    peekNext() {
        if (current + 1 >= source.length()) return '\0';
        return source.charAt(current + 1);
    } 

    isAlpha(c) {
        return (c >= 'a' && c <= 'z') ||
               (c >= 'A' && c <= 'Z') ||
                c == '_';
    }
    
    isAlphaNumeric(c) {
        return isAlpha(c) || isDigit(c);
    }

    isDigit(number) {
        return number >= '0' && number <= '9';
    } 

    isAtEnd() {
        return current >= source.length();
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