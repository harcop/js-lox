class Token {
    constructor(type, lexeme, line) {
        this.type = type;
        this.lexeme = lexeme;
        this.line = line;
    }

    toString() {
        return `${this.type} ${this.lexeme} ${this.line}`;
    }
}