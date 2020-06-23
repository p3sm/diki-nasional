module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'prettier',
        'react-hooks'
    ],
    rules: {
        'prettier/prettier': 2,
        "no-multiple-empty-lines": [2, {
            "max": 1,
            "maxEOF": 0,
            "maxBOF": 0
        }],
        "quotes": [2, "single", "avoid-escape"],
        "no-use-before-define": [2, {
            "functions": false,
            "variables": false
        }],
        "semi": [2, "always"],
        "prefer-const": 2,
        "react/prefer-es6-class": 2,
        "react/jsx-filename-extension": 2,
        "react/jsx-indent": [2, 2],
        "react/prop-types": [0],
        "react/no-array-index-key": [1],
        "class-methods-use-this": [1],
        "no-undef": [2],
        "no-case-declarations": [1],
        "no-return-assign": [1],
        "no-param-reassign": [0],
        "no-shadow": [0],
        "camelcase": [1],
        "no-underscore-dangle": [0, "always"],
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'react-hooks/exhaustive-deps': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0
    },
};
