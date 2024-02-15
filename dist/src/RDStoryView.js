/* Copyright Related Digital and Contributors */
'use strict';
import React from 'react';
import { requireNativeComponent, StyleSheet, } from 'react-native';
const RDRCTStoryView = requireNativeComponent('RDRCTStoryView');
const styles = StyleSheet.create({
    defaultStyle: {
        minHeight: 110,
    },
});
export class StoryView extends React.Component {
    _onClicked = (event) => {
        if (!this.props.onClicked) {
            return;
        }
        this.props.onClicked(event.nativeEvent.url);
    };
    render() {
        return (React.createElement(RDRCTStoryView, { ...this.props, actionId: this.props.actionId, onClicked: this._onClicked, style: [styles.defaultStyle, this.props.style] }));
    }
}
