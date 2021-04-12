module.exports = {
    root: true,
    env: {
        es6: true,
        commonjs: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 11
    },
    rules: {
        // 大括号风格要求
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],

        // 驼峰
        camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],

        // 缩进使用 4 个空格，并且 switch 语句中的 Case 需要缩进
        indent: ['error', 4, { SwitchCase: 1, flatTernaryExpressions: true }],

        // 数组的括号内的前后禁止有空格
        'array-bracket-spacing': ['error', 'never'],

        'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],

        // 要求把换行符放在操作符前面
        'operator-linebreak': ['error', 'before'],

        // 禁止空语句（可在空语句写注释避免），允许空的 catch 语句
        'no-empty': ['error', { allowEmptyCatch: true }],

        // 禁止在语句末尾使用分号
        semi: ['error', 'never'],

        // 禁用不必要的分号
        'no-extra-semi': 'error',

        // 函数圆括号之前有一个空格
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always', // 匿名函数表达式
                named: 'always', // 命名的函数表达式
                asyncArrow: 'always' // 异步的箭头函数表达式
            }
        ],

        // 禁止行尾有空格
        'no-trailing-spaces': [
            'error',
            {
                skipBlankLines: true // 允许在空行使用空白符
            }
        ],

        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['*package', '!', '/', ',', '=']
                },
                block: {
                    // 前后空格是否平衡
                    balanced: false,
                    markers: ['*package', '!', ',', ':', '::', 'flow-include'],
                    exceptions: ['*']
                }
            }
        ],

        // 行尾逗号
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }
        ],

        quotes: ['error', 'single', { allowTemplateLiterals: true }],

        'quote-props': ['error', 'as-needed'],

        'space-in-parens': ['error', 'never'],

        'no-multi-spaces': ['error', { ignoreEOLComments: true }],

        'key-spacing': ['error', { mode: 'strict' }],

        // 等号左右空格
        'space-infix-ops': ['error', { int32Hint: false }],

        // 箭头函数使用括号
        'arrow-parens': ['error', 'always'],

        // 逗号后空格
        'comma-spacing': ['error', { before: false, after: true }]
    }
}
