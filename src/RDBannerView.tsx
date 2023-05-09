'use strict';

import React from 'react';
import {
  requireNativeComponent,
  NativeSyntheticEvent,
  StyleSheet,
  Dimensions,
} from 'react-native';

const RNRDBannerView =
  requireNativeComponent<RNRDBannerViewProps>('RDBannerView');

interface RNRDBannerViewProps {
  actionId: string;
  onItemClicked: (
    event: NativeSyntheticEvent<RDBannerItemClickedEvent>
  ) => void;
  style?: any;
}

export interface RDBannerItemClickedEvent {
  actionId: string;
}

export interface RDBannerViewProps {
  actionId: string;
  onItemClicked: (event: RDBannerItemClickedEvent) => void;
  style?: any;
}

export class RDBannerView extends React.Component<RDBannerViewProps> {
  _onItemClicked = (event: NativeSyntheticEvent<RDBannerItemClickedEvent>) => {
    if (!this.props.onItemClicked) {
      return;
    }
    this.props.onItemClicked(event.nativeEvent);
  };

  render() {
    return (
      <RNRDBannerView
        {...this.props}
        onItemClicked={this._onItemClicked}
        style={styles.container}
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
  },
});
