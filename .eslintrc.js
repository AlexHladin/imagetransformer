module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: 'airbnb-base',
    rules: {
        'comma-dangle': [ 'error', 'never' ],
        'max-len': [ 1, 200 ],
        'no-console': 'off',
        skipBlankLines: true,
        'arrow-parens': [ 'error', 'as-needed' ],
        'function-paren-newline': [ 'error', 'multiline' ],
        'padded-blocks': ['error', { blocks: 'never' } ],
        'no-unused-expressions': [ 'error', { allowTernary: true, allowShortCircuit: true } ],
        'no-mixed-operators': [ 'error', { allowSamePrecedence: true } ],
        'no-use-before-define': ['error', { functions: false, classes: true } ],
        'no-param-reassign': 'off',
        radix: [ 'error', 'as-needed' ],
        'consistent-return': 'off',
        'array-bracket-spacing': [ 'error', 'always' ],
        'no-trailing-spaces': [ 'error', { skipBlankLines: true } ],
        'no-restricted-syntax': [ 'error', 'BinaryExpression[operator=\'in\']'],
        'no-plusplus': 'off',
        'no-continue': 'off',
        'no-loop-func': 'off',
        'no-multi-assign': 'off',
        'guard-for-in': 'off',
        'no-prototype-builtins': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'linebreak-style': 'off'
    }
};
