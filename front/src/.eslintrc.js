module.exports = {
    root: true,
    env: {
        es6: true,
        commonjs: true,
        node: true
    },
    extends: [
        'plugin:vue/essential'
        // 'eslint:recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 11,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 大括号风格要求
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],

        // 骆驼拼写法
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

        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: false,
                ignores: []
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

        'vue/no-unused-components': 'off',

        'quote-props': ['error', 'as-needed'],

        'space-in-parens': ['error', 'never'],

        'no-multi-spaces': ['error', { ignoreEOLComments: true }],

        'key-spacing': ['error', { mode: 'strict' }],

        // 等号左右空格
        'space-infix-ops': ['error', { int32Hint: false }],

        // 箭头函数括号
        'arrow-parens': ['error', 'as-needed'],

        // 逗号后空格
        'comma-spacing': ['error', { before: false, after: true }],

        // key
        'vue/require-v-for-key': 'error',

        // v-if v-for
        'vue/no-use-v-if-with-v-for': [
            'error',
            {
                allowUsingIterationVar: false
            }
        ],
        // 允许props修改
        'vue/no-mutating-props': 0,
        
        // 组件顺序
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'data',
                    'computed',
                    'watch',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError'
                ]
            }
        ],
        'vue/no-multi-spaces': [
            'error',
            {
                ignoreProperties: false
            }
        ],
        'vue/no-spaces-around-equal-signs-in-attribute': ['error']
    }
}
