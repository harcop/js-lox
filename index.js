const fs = require('fs');
const prompt = require('prompt-sync')();
const Scanner = require('./src/Scanner');

class Lox {
    constructor () {
        if (process.argv.length > 3) {
            console.log(new Error("invalid lox invocation"))
        } else if (process.argv.length === 3) {
            this.runFile(process.argv[2]);
        } else {
            this.runPrompt();
        }
    }

    runFile(path) {
        const content = fs.readFileSync(path).toString();
        this.run(content);
    }

    runPrompt() {
        const falser = true;
        while (falser) {
            const content = prompt("lox> ");
            if (content === null) {
                break;
            }
            this.run(content);
        }
    }

    run (source) {
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();

        for (const token of tokens) {
            console.log(token);
        }
    }
}

const lox = new Lox();