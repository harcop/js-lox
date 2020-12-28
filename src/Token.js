module.exports = class Token {
    constructor(type, text, literal, line) {
        this.type = type;
        this.text = text;
        this.literal = literal;
        this.line = line;
    }

    toString() {
        return `${this.type}, ${this.text}, ${this.literal}, ${this.line}`;
    }
}