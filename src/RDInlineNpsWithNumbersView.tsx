/* Copyright Related Digital and Contributors */

'use strict';

import React from 'react';
import {
  requireNativeComponent,
  NativeSyntheticEvent,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

const RDRCTInlineNpsWithNumbersView =
  requireNativeComponent<RDRCTInlineNpsWithNumbersViewProps>(
    'RDRCTInlineNpsWithNumbersView'
  );

interface RDRCTInlineNpsWithNumbersViewProps {
  properties: Record<string, string> | null;
  onClicked: (event: NativeSyntheticEvent<NpsButtonClickedEvent>) => void;
  style?: StyleProp<ViewStyle>;
}

export interface NpsButtonClickedEvent {
  url: string;
}

export interface InlineNpsWithNumbersViewProps {
  properties: Record<string, string> | null;
  onClicked: (url: string) => void;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  defaultStyle: {
    minHeight: 110,
  },
});

export class InlineNpsWithNumbersView extends React.Component<InlineNpsWithNumbersViewProps> {
  _onClicked = (event: NativeSyntheticEvent<NpsButtonClickedEvent>) => {
    if (!this.props.onClicked) {
      return;
    }
    this.props.onClicked(event.nativeEvent.url);
  };

  render() {
    return (
      <RDRCTInlineNpsWithNumbersView
        {...this.props}
        properties={this.props.properties}
        onClicked={this._onClicked}
        style={[styles.defaultStyle, this.props.style]}
      />
    );
  }
}
