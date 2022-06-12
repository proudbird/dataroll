const config = {
  verbose: true,
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true
      }
    }
  }
};
export default config;