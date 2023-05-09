'use strict';
import React from 'react';
import { requireNativeComponent, StyleSheet, Dimensions, } from 'react-native';
const RNRDStoryView = requireNativeComponent('RDStoryView');
export var RDStoryLoadError;
(function (RDStoryLoadError) {
    RDStoryLoadError["NotAvailable"] = "MESSAGE_NOT_AVAILABLE";
    RDStoryLoadError["FetchFailed"] = "FAILED_TO_FETCH_MESSAGE";
    RDStoryLoadError["LoadFailed"] = "MESSAGE_LOAD_FAILED";
})(RDStoryLoadError || (RDStoryLoadError = {}));
export class RDStoryView extends React.Component {
    /*
    _onLoadStarted = (event: NativeSyntheticEvent<RDStoryLoadStartedEvent>) => {
      if (!this.props.onLoadStarted) {
        return;
      }
      this.props.onLoadStarted(event.nativeEvent);
    };
  
    _onLoadFinished = (event: NativeSyntheticEvent<RDStoryLoadFinishedEvent>) => {
      if (!this.props.onLoadFinished) {
        return;
      }
      this.props.onLoadFinished(event.nativeEvent);
    };
  
    _onLoadError = (event: NativeSyntheticEvent<RDStoryLoadErrorEvent>) => {
      if (!this.props.onLoadError) {
        return;
      }
      this.props.onLoadError(event.nativeEvent);
    };
  
    _onClose = (event: NativeSyntheticEvent<RDStoryClosedEvent>) => {
      if (!this.props.onClose) {
        return;
      }
      this.props.onClose(event.nativeEvent);
    };
    */
    _onItemClicked = (event) => {
        if (!this.props.onItemClicked) {
            return;
        }
        this.props.onItemClicked(event.nativeEvent);
    };
    render() {
        return (React.createElement(RNRDStoryView, { ...this.props, onItemClicked: this._onItemClicked, style: styles.container }));
    }
}
const { width } = Dimensions.get('window');
const height = 110;
const styles = StyleSheet.create({
    container: {
        minWidth: width,
        minHeight: height,
        // alignSelf: 'stretch'
    },
});
