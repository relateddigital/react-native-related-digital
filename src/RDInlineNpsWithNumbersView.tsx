/* Copyright Related Digital and Contributors */

'use strict';

import React from 'react';
import { requireNativeComponent, NativeSyntheticEvent } from 'react-native';

const RDRCTInlineNpsWithNumbersView =
  requireNativeComponent<RDRCTInlineNpsWithNumbersViewProps>(
    'RDRCTInlineNpsWithNumbersView'
  );

interface RDRCTInlineNpsWithNumbersViewProps {
  properties: Record<string, string> | null;
  npsItemClicked: (event: NativeSyntheticEvent<NpsItemClickedEvent>) => void;
}

export interface NpsItemClickedEvent {
  npsLink: string;
}

export interface InlineNpsWithNumbersViewProps {
  properties: Record<string, string> | null;
  npsItemClicked: (event: NpsItemClickedEvent) => void;
}

export class InlineNpsWithNumbersView extends React.Component<InlineNpsWithNumbersViewProps> {
  _npsItemClicked = (event: NativeSyntheticEvent<NpsItemClickedEvent>) => {
    if (!this.props.npsItemClicked) {
      return;
    }
    this.props.npsItemClicked(event.nativeEvent);
  };

  render() {
    return (
      <RDRCTInlineNpsWithNumbersView
        {...this.props}
        properties={this.props.properties}
        npsItemClicked={this._npsItemClicked}
      />
    );
  }
}
