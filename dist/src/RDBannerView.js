/* Copyright Related Digital and Contributors */
'use strict';
import React from 'react';
import { requireNativeComponent, StyleSheet, } from 'react-native';
const RDRCTBannerView = requireNativeComponent('RDRCTBannerView');
const styles = StyleSheet.create({
    defaultStyle: {
        minHeight: 110,
    },
});
export class BannerView extends React.Component {
    _onClicked = (event) => {
        if (!this.props.onClicked) {
            return;
        }
        this.props.onClicked(event.nativeEvent.url);
    };
    render() {
        return (React.createElement(RDRCTBannerView, { ...this.props, properties: this.props.properties, onClicked: this._onClicked, style: [styles.defaultStyle, this.props.style] }));
    }
}
