/* Copyright Airship and Contributors */
'use strict';
import React from 'react';
import { requireNativeComponent } from 'react-native';
const RDRCTStoryView = requireNativeComponent('RDRCTStoryView');
export class StoryView extends React.Component {
    _onItemClicked = (event) => {
        if (!this.props.onItemClicked) {
            return;
        }
        this.props.onItemClicked(event.nativeEvent);
    };
    render() {
        return (React.createElement(RDRCTStoryView, { ...this.props, actionId: this.props.actionId, onItemClicked: this._onItemClicked }));
    }
}
