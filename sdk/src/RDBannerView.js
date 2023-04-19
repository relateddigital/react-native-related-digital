import React from 'react'
import { View, StyleSheet, Dimensions, UIManager, findNodeHandle, Platform } from 'react-native'
import { RDBannerViewNative } from './native'

const { width } = Dimensions.get('window')
const height = 110
const isIos = Platform.OS === 'ios'

export default class RDBannerView extends React.Component {
  constructor(props) {
    super(props)

    this._onItemClicked = this._onItemClicked.bind(this)
    this._onRequestResult = this._onRequestResult.bind(this)
    this._requestBannerCarousel = this._requestBannerCarousel.bind(this)
  }

  componentDidMount() {
      if(!isIos) {
        this._requestBannerCarousel()
      }
  }

  render() {
    const { style = {}, properties = null } = this.props

    return (
        <RDBannerViewNative 
            ref={(ref) => this.bannerView = ref}
            style={[styles.container, style]}
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

    if (!onRequestResult) {
      return
    }
    const isAvailable = {"isAvailable":event.nativeEvent.isAvailable}
    onRequestResult(isAvailable)
  }

  _requestBannerCarousel() {
    const viewId = findNodeHandle(this.bannerView)
    UIManager.dispatchViewManagerCommand(viewId, UIManager.BannerView.Commands.requestBannerCarousel.toString(), [viewId,this.props.properties])
  }
}

const styles = StyleSheet.create({
    container: {
        // minWidth: width,
        minHeight: height,
        // backgroundColor:'orange'
        // alignSelf: 'stretch'
    }
})