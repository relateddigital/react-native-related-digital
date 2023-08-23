/* Copyright Airship and Contributors */

'use strict';

import React from 'react';
import { requireNativeComponent, NativeSyntheticEvent } from 'react-native';

const RDRCTStoryView =
  requireNativeComponent<RDRCTStoryViewProps>('RDRCTStoryView');

interface RDRCTStoryViewProps {
  actionId: string | null;
  onItemClicked: (event: NativeSyntheticEvent<StoryItemClickedEvent>) => void;
}

export interface StoryItemClickedEvent {
  storyItemUrl: string;
}

export interface StoryViewProps {
  actionId: string | null;
  onItemClicked: (event: StoryItemClickedEvent) => void;
}

export class StoryView extends React.Component<StoryViewProps> {
  _onItemClicked = (event: NativeSyntheticEvent<StoryItemClickedEvent>) => {
    if (!this.props.onItemClicked) {
      return;
    }
    this.props.onItemClicked(event.nativeEvent);
  };

  render() {
    return (
      <RDRCTStoryView
        {...this.props}
        actionId={this.props.actionId}
        onItemClicked={this._onItemClicked}
      />
    );
  }
}
