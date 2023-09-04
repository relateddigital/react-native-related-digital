/* Copyright Related Digital and Contributors */

'use strict';

import React from 'react';
import {
  requireNativeComponent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

const RDRCTBannerView =
  requireNativeComponent<RDRCTBannerViewProps>('RDRCTBannerView');

interface RDRCTBannerViewProps {
  properties: Record<string, string> | null;
  onClicked: (event: NativeSyntheticEvent<BannerItemClickedEvent>) => void;
  style?: StyleProp<ViewStyle>;
}

export interface BannerItemClickedEvent {
  url: string;
}

export interface BannerViewProps {
  properties: Record<string, string> | null;
  onClicked: (event: BannerItemClickedEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  defaultStyle: {
    minHeight: 110,
  },
});

export class BannerView extends React.Component<BannerViewProps> {
  _onClicked = (event: NativeSyntheticEvent<BannerItemClickedEvent>) => {
    if (!this.props.onClicked) {
      return;
    }
    this.props.onClicked(event.nativeEvent);
  };

  render() {
    return (
      <RDRCTBannerView
        {...this.props}
        properties={this.props.properties}
        onClicked={this._onClicked}
        style={[styles.defaultStyle, this.props.style]}
      />
    );
  }
}
