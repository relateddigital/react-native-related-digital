import React from 'react'
import { View, StyleSheet, Dimensions, UIManager, findNodeHandle, Platform } from 'react-native'
import { RDBannerViewNative } from './native'

const isIos = Platform.OS === 'ios'

export default class RDBannerView extends React.Component {
  constructor(props) {
    super(props)

    this._onItemClicked = this._onItemClicked.bind(this)
    this._onRequestResult = this._onRequestResult.bind(this)
    this._requestBannerCarousel = this._requestBannerCarousel.bind(this)

    this.state = {height:null, width:null}
  }

  componentDidMount() {
    if(!isIos) {
      setTimeout(() => {
        this._requestBannerCarousel()
      }, 100)
    }
  }

  componentDidUpdate(prevProps) {
    if(!isIos) {
      if (prevProps.properties !== this.props.properties) {
        setTimeout(() => {
          this._requestBannerCarousel()
        }, 100)
      }
    }
  }

  render() {
    const { style = {}, properties = null } = this.props

    return (
        <RDBannerViewNative 
            ref={(ref) => this.bannerView = ref}
            style={[style, this.state.height && {height:this.state.height}, this.state.width && {width:this.state.width}]}
            onItemClicked={this._onItemClicked}
            onRequestResult={this._onRequestResult}
            properties={properties}
        />
    )
  }

  _onItemClicked(event) {
    const { onItemClicked } = this.props

    if (!onItemClicked) {
      return
    }

    const bannerLink = {"bannerLink":event.nativeEvent.bannerLink}
    onItemClicked(bannerLink)
  }

  _onRequestResult(event) {
    const { onRequestResult } = this.props
    const { isAvailable, height, width } = event.nativeEvent

    if (!onRequestResult) {
      return
    }

    if (height) {
      this.setState({height:height})
    }

    if (width && width != 600) {
      this.setState({width:width})
    }
    
    onRequestResult({"isAvailable":isAvailable})
  }

  _requestBannerCarousel() {
    if (!this.bannerView) {
      return
    }
    
    const viewId = findNodeHandle(this.bannerView)
    if (viewId) {
      UIManager.dispatchViewManagerCommand(viewId, 'requestBannerCarousel', [viewId])
    }
  }
}