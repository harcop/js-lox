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
                addToken(match('=') ? BANG_EQUAL : BANG);
                break;
            case '=':
                addToken(match('=') ? EQUAL_EQUAL : EQUAL);
                break;
            case '<':
                addToken(match('=') ? LESS_EQUAL : LESS);
                break;
            case '>':
                addToken(match('=') ? GREATER_EQUAL : GREATER);
                break;
            case '/':
                if (match('/')) {
                    // A comment goes until the end of the line.
                    while (peek() != '\n' && !isAtEnd()) advance();
                } else {
                    addToken(SLASH);
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
            default:
            Lox.error(line, "Unexpected character.");
            break;
        }
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