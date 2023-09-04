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

const RDRCTStoryView =
  requireNativeComponent<RDRCTStoryViewProps>('RDRCTStoryView');

interface RDRCTStoryViewProps {
  actionId: string | null;
  onClicked: (event: NativeSyntheticEvent<StoryItemClickedEvent>) => void;
  style?: StyleProp<ViewStyle>;
}

export interface StoryItemClickedEvent {
  url: string;
}

export interface StoryViewProps {
  actionId: string | null;
  onClicked: (event: StoryItemClickedEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  defaultStyle: {
    minHeight: 110,
  },
});

export class StoryView extends React.Component<StoryViewProps> {
  _onClicked = (event: NativeSyntheticEvent<StoryItemClickedEvent>) => {
    if (!this.props.onClicked) {
      return;
    }
    this.props.onClicked(event.nativeEvent);
  };

  render() {
    return (
      <RDRCTStoryView
        {...this.props}
        actionId={this.props.actionId}
        onClicked={this._onClicked}
        style={[styles.defaultStyle, this.props.style]}
      />
    );
  }
}
