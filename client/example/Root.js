import { Text, View, Linking, AppState, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import crossroads from 'crossroads';
import { Actions, Router, Scene, Stack, Drawer, Reducer } from 'react-native-router-flux';

import App from './pages/App';
import Orders from './pages/Orders';

crossroads.addRoute('App', () => Actions.App());
crossroads.addRoute('Orders', () => Actions.Orders());
crossroads.addRoute('Profile', () => Actions.Profile());

export default class Root extends Component {
    constructor(props) {
        super(props)
        this.appState = AppState.currentState


        // this.createReducer = this.createReducer.bind(this);
    }


    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        Linking
            .getInitialURL()
            .then(url => {
                this.handleOpenURL({ url });
            })
            .catch(error => console.error(error));
        Linking.addEventListener('url', this.handleOpenURL);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL(event) {
        console.log("handle url", event);
        if (event.url && event.url.indexOf('rnrd://') === 0) {
            // remove "test://" and try to match
            console.log("event.url.slice(7)", event.url.slice(7));
            crossroads.parse(event.url.slice(7));
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log("handleAppStateChange", nextAppState);
        }
        this.appState = nextAppState
    };



    // createReducer(params) {
    //     const defaultReducer = Reducer(params);
    //     return (state, action) => {
    //         // this.props.dispatch(action);
    //         return defaultReducer(state, action);
    //     };
    // }


    render() {
        return (
            <Router 
                drawerLockMode={'locked-closed'}
                // createReducer={this.createReducer}
                >
                <Stack key="root" headerLayoutPreset={'center'}>
                    <Scene
                        key="App"
                        component={App}
                        renderRightButton={<TouchableOpacity onPress={() => Actions.Orders()}><Text>Orders</Text></TouchableOpacity>}
                        renderLeftButton={<TouchableOpacity onPress={() => Actions.Profile()}><Text>Profile</Text></TouchableOpacity>}
                        initial
                    />
                    <Scene
                        key="Orders"
                        component={Orders}
                        back={true}
                    />
                    <Scene
                        key="Profile"
                        component={Orders}
                        back={true}
                    />
                </Stack>
            </Router>
        );
    }
}