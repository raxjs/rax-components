module.exports = {
  'extends': ['eslint-config-rax/typescript'],
  'globals': {
    "Component": true,
    "Page": true,
    "App": true,
    "my": true,
    "wx": true
  },
  'rules': {
    "no-return-assign": "off",
    "@typescript-eslint/no-use-before-define":"off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "new-cap": ["error", {
      "newIsCap": true,
      "capIsNewExceptions": ["Component", "Page", "App"]
    }],
  }
};
