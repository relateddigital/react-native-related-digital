import React from 'react'
import { View, StyleSheet, Dimensions, UIManager, findNodeHandle, Platform } from 'react-native'
import { RDStoryViewNative, getStoriesNative } from './native'

const { width } = Dimensions.get('window')
const height = 110
const isIos = Platform.OS === 'ios'

export default class RDStoryView extends React.Component {
  constructor(props) {
    super(props)

    this._onItemClicked = this._onItemClicked.bind(this)
    this._getStories = this._getStories.bind(this)
  }

  componentDidMount() {
    if(!isIos) {
      setTimeout(() => {
        this._getStories()
      }, 100)
    }
  }

  componentDidUpdate(prevProps) {
    if(!isIos) {
      if (prevProps.actionId !== this.props.actionId) {
        setTimeout(() => {
          this._getStories()
        }, 100)
      }
    }
  }

  render() {
    const { style = {}, actionId = null } = this.props

    return (
        <RDStoryViewNative 
            ref={(ref) => this.storyView = ref}
            style={[styles.container, style]}
            onItemClicked={this._onItemClicked}
            actionId={actionId}
        />
    )
  }

  _onItemClicked(event) {
    const { onItemClicked } = this.props

    if (!onItemClicked) {
      return
    }

    onItemClicked(event.nativeEvent)
  }

  _getStories() {
    if (!this.storyView) {
      return
    }
    
    const viewId = findNodeHandle(this.storyView)
    if (viewId) {
      UIManager.dispatchViewManagerCommand(viewId, 'getStories', [viewId])
    }
  }
}

const styles = StyleSheet.create({
    container: {
        minWidth: width,
        minHeight: height
        // alignSelf: 'stretch'
    }
})