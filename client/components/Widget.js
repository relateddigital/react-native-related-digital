import { ScrollView, Text, View,StyleSheet } from 'react-native';
import React, { Component } from 'react';
import WidgetItem from './WidgetItem';

export default class Widget extends Component {
    renderWidgetItems = () => (
        this.props.widgetData.recommendations.map((product, i) => {
            return (
                <WidgetItem key={i} product={product} trackRecommendationClick={this.props.trackRecommendationClick} />
            )
        })
    );

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.widgetData.title}</Text>
                <ScrollView
                    style={styles.scrollView}
                    horizontal>
                    {this.renderWidgetItems()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderBottomWidth:1,
        borderColor:"#ddd",
    },
    scrollView:{ flex: 1, width: "100%",marginBottom:5 },
    title:{ 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginHorizontal: 5,
        marginVertical:10 
    }
});
