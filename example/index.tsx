import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import RelatedDigital from 'react-native-related-digital';

RelatedDigital.initialize(
  '676D325830564761676D453D',
  '356467332F6533766975593D',
  'visistore',
  false
);

AppRegistry.registerComponent(appName, () => App);
