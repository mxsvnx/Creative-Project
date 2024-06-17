module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['standard-with-typescript', 'plugin:react/recommended', 'plugin:prettier/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/return-await': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
};
