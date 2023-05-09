'use strict';

import React from 'react';
import {
  requireNativeComponent,
  NativeSyntheticEvent,
  StyleSheet,
  Dimensions,
} from 'react-native';

const RNRDStoryView = requireNativeComponent<RNRDStoryViewProps>('RDStoryView');

interface RNRDStoryViewProps {
  actionId: string;
  onItemClicked: (event: NativeSyntheticEvent<RDStoryItemClickedEvent>) => void;
  style?: any;
  //onLoadStarted: (event: NativeSyntheticEvent<RDStoryLoadStartedEvent>) => void;
  //onLoadFinished: (
  //  event: NativeSyntheticEvent<RDStoryLoadFinishedEvent>
  //) => void;
  //onLoadError: (event: NativeSyntheticEvent<RDStoryLoadErrorEvent>) => void;
  //onClose: (event: NativeSyntheticEvent<RDStoryClosedEvent>) => void;
}

export interface RDStoryItemClickedEvent {
  actionId: string;
}

export enum RDStoryLoadError {
  NotAvailable = 'MESSAGE_NOT_AVAILABLE',
  FetchFailed = 'FAILED_TO_FETCH_MESSAGE',
  LoadFailed = 'MESSAGE_LOAD_FAILED',
}

export interface RDStoryLoadStartedEvent {
  actionId: string;
}

export interface RDStoryLoadFinishedEvent {
  actionId: string;
}

export interface RDStoryLoadErrorEvent {
  actionId: string;
  retryable: boolean;
  error: RDStoryLoadError;
}

export interface RDStoryClosedEvent {
  actionId: string;
}

export interface RDStoryViewProps {
  actionId: string;
  onItemClicked: (event: RDStoryItemClickedEvent) => void;
  style?: any;
}

export class RDStoryView extends React.Component<RDStoryViewProps> {
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

  _onItemClicked = (event: NativeSyntheticEvent<RDStoryItemClickedEvent>) => {
    if (!this.props.onItemClicked) {
      return;
    }
    this.props.onItemClicked(event.nativeEvent);
  };

  render() {
    return (
      <RNRDStoryView
        {...this.props}
        onItemClicked={this._onItemClicked}
        style={styles.container}
        //onLoadError={this._onLoadError}
        //onLoadStarted={this._onLoadStarted}
        //onLoadFinished={this._onLoadFinished}
        //onClose={this._onClose}
      />
    );
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
