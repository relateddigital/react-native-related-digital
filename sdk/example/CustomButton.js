import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import React, { Component } from 'react'

export default class CustomButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            touching: false
        }
    }
    touchingStart = () => {
        this.setState({ touching: true })
    }
    touchingStop = () => {
        this.setState({ touching: false })
    }

    styles = StyleSheet.create({
        buyButtonContainer: {
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: this.props.mini ? 28 : 50,
            width: "100%",
            overflow: 'hidden'
        },
        buyButtonText: {
            fontSize: this.props.mini ? 13 : 18,
            fontWeight: "bold",
            color: "black",
        },
    })
    render() {
        return (
            <TouchableHighlight
                onPressIn={() => { this.touchingStart() }}
                onPressOut={() => { this.touchingStop() }}
                onPress={()=>{ this.props.action(this.props.data.key)}}
                underlayColor={'rgba(0,0,0,0)'}
                style={[{margin:10},this.props.style]}>
                <View style={[this.styles.buyButtonContainer]}>
                    <View 
                        style={[
                            { backgroundColor:'#d9aea2',borderColor:'#BF9A8F',borderWidth:3,width: "100%", height: '80%', zIndex: 9, borderRadius: 10, position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center' },
                            !this.state.touching ? { top: 0 } : { bottom: 0 }
                        ]}>
                        <Text style={[this.styles.buyButtonText, this.props.childStyle]}>{this.props.data.name}</Text>
                    </View>
                    {!this.state.touching && <View 
                        style={{ backgroundColor:'#594843',width: "100%", height: "100%", zIndex: 8, position: 'absolute', bottom: 0, borderRadius: 10, overflow: 'hidden' }}>
                    </View>}
                </View>
            </TouchableHighlight>
        )
    }
}