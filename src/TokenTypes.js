module.exports = TokenType = {
  // TokenType = {
      LEFT_PAREN: 'LEFT_PAREN',
      RIGHT_PAREN: 'RIGHT_PAREN',
      LEFT_BRACE: 'LEFT_BRACE',
      RIGHT_BRACE: 'RIGHT_BRACE',
      COMMA: 'COMMA',
      SEMI_COLON: 'SEMI_COLON',
      STAR: 'STAR',
      PLUS: 'PLUS',
      MINUS: 'MINUS',
      SLASH: 'SLASH',
      EQUAL: 'EQUAL',
      BANG: 'BANG',
      BANG_EQUAL: 'BANG_EQUAL',
      GREATER: 'GREATER',
      GREATER_EQUAL: 'GREATER_EQUAL',
      LESS: 'LESS',
      LESS_EQUAL: 'LESS_EQUAL',
      EQUAL_EQUAL: 'EQUAL_EQUAL',
      IDENTIFIER: 'IDENTIFIER',
      STRING: 'STRING',
      NUMBER: 'NUMBER',
      AND: 'AND',
      CLASS: 'CLASS',
      OR: 'OR',
      IF: 'IF',
      WHILE: 'WHILE',
      ELSE: 'ELSE',
      FOR: 'FOR',
      RETURN: 'RETURN',
      PRINT: 'PRINT',
      THIS: 'THIS',
      SUPER: 'SUPER',
      NIL: 'NIL',
      EOF: 'EOF'
  }
  // let _f = '';
  // for(let n in TokenType) {
  //     _f += `tokenIdentifier.set('${n.toLowerCase()}', ${n});\n`
  // }
  // console.log(_f);