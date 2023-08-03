import * as React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Button, View, } from 'react-native';
import { RDStoryView } from '@relateddigital/react-native-huawei';
export function StoryScreen() {
    function showStory() { }
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container },
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: 'Show Story', onPress: () => showStory() })),
            React.createElement(RDStoryView, { style: styles.container, onItemClicked: (event) => console.log(event), actionId: '459' }))));
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
    },
});
