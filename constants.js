const DIGITS = '0123456789'

const TT_INT = 'INT'
const TT_FLOAT = 'FLOAT'

const TT_PLUS = 'PLUS'
const TT_MINUS = 'MINUS'
const TT_MUL = 'MUL'
const TT_DIV = 'DIV'
const TT_POW = 'POW'

const TT_LPAREN = 'LPAREN'           // (
const TT_RPAREN = 'RPAREN'           // )    
const TT_LBRACE = 'LBRACE'   // {
const TT_RBRACE = 'RBRACE' // }

const TT_EQ = 'EQ'
const TT_EE = 'EE'
const TT_NE = 'NE'    // !=
const TT_LT = 'LT'    // <
const TT_GT = 'GT'    // >
const TT_LTE = 'LTE'  // <=
const TT_GTE = 'GTE'  // >=

const TT_IDENTIFIER = 'IDENTIFIER'
const TT_KEYWORD = 'KEYWORD'

const TT_EOF = 'EOF'

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LETTERS_DIGITS = LETTERS + DIGITS + '_'

const KEYWORDS = [
    'var',
    'and',
    'or',
    'not',
    'if',
    'elif',
    'else',
]

module.exports = {
    DIGITS,
    LETTERS,
    LETTERS_DIGITS,
    KEYWORDS,
    TT_IDENTIFIER,
    TT_KEYWORD,
    TT_INT,
    TT_FLOAT,
    TT_PLUS,
    TT_MINUS,
    TT_MUL,
    TT_DIV,
    TT_POW,
    TT_LPAREN,
    TT_RPAREN,
    TT_LBRACE,
    TT_RBRACE,
    TT_EQ,
    TT_EE,
    TT_NE,
    TT_LT,
    TT_GT,
    TT_LTE,
    TT_GTE,
    TT_EOF
}