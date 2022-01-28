module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  rules: {
    'no-unused-vars': 'off',
    'no-unused-labels': 'off',
    'vue/name-property-casing': 'off',
    'vue/valid-template-root': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-unused-components': 'off',
    'no-useless-escape': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-v-html': 'off'
  }
}
