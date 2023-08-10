/**
 * @format
 */

import { logout } from 'react-native-related-digital'
logout();
import {AppRegistry} from 'react-native';
import Home from './Home';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => Home);
