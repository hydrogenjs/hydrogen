module.exports = {
  "settings": {
      "import/resolver": {
          "node": {
          "extensions": [".js",".ts"]
          }
      }
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "env": {
      "commonjs": true,
      "es6": true,
      "node": true,
      "jest": true,
      "browser": true,
  },
  "extends": ["plugin:@typescript-eslint/recommended", "airbnb-base"],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly",
      "routes": "readonly",
      "CACHE_VERSION": "readonly",
      "DEV": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "rules": {
      "import/newline-after-import": 'off',
      "@typescript-eslint/indent": ["error", 2],
      "import/prefer-default-export": 'off',
      "max-len": ["error", { code: 200 }],
      "consistent-return": 'off',
      "linebreak-style": ["error", "windows"],
      "@typescript-eslint/no-var-requires": "off",
      "no-nested-ternary": "off",
      "no-console": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "no-restricted-globals": "off",
      "no-restricted-syntax": "off",
      "import/extensions": "off"
  },
  overrides: [
    {
        files: ['storybook/**/*.js'],
        rules: {
            semi: 'off'
        }
    }
  ]
};