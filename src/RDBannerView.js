'use strict';
import React from 'react';
import { requireNativeComponent, StyleSheet, Dimensions, } from 'react-native';
const RNRDBannerView = requireNativeComponent('RDBannerView');
export class RDBannerView extends React.Component {
    _onItemClicked = (event) => {
        if (!this.props.onItemClicked) {
            return;
        }
        this.props.onItemClicked(event.nativeEvent);
    };
    render() {
        return (React.createElement(RNRDBannerView, { ...this.props, onItemClicked: this._onItemClicked, style: styles.container }));
    }
}
const { width } = Dimensions.get('window');
const height = 110;
const styles = StyleSheet.create({
    container: {
        minWidth: width,
        minHeight: height,
    },
});
