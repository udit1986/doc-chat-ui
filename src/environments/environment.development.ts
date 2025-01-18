// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version } = require('../../package.json');

export const environment = {
  production: false,
  appVersion: `${version}-dev`,

  apiUrl: '',

  settings: {
    auth: {

      // keys to store tokens at local storage
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
    },
  },
};