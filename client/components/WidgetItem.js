import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { Component } from 'react';

export default class WidgetItem extends Component {
    render() {
        return (
            <TouchableOpacity
                key={this.props.k}
                style={styles.container}
                onPress={() => this.props.trackRecommendationClick(this.props.product.qs)}>
                    <Image source={{uri:this.props.product.img}} style={styles.image}/>
                    <View style={styles.info}>
                        <Text style={styles.name}>{this.props.product.title.substr(0,12)+"..."}</Text>
                        <Text style={styles.price}>{this.props.product.dprice} TL</Text>
                    </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: "100%",
        marginHorizontal: 5,
        backgroundColor:'gray'
    },
    image: {
        height: 100,
        width: 100,
        backgroundColor: 'pink',
        // borderRadius:10
    },
    name:{
        backgroundColor:'rgba(0,0,0,.5)',
        fontSize:12,
        padding:4,
        color:'#fff'
    },
    price:{
        fontSize:12,
        padding:4,
        color:'#fff'
    },
    info:{
        backgroundColor:'rgba(0,0,0,.5)',
        width:"100%",
        marginTop:2,
        borderRadius:5,
        overflow:'hidden'
    }
});