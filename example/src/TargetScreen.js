import * as React from 'react';
import { StyleSheet, Text, Button, TextInput, ScrollView, View, } from 'react-native';
import RelatedDigital from 'react-native-related-digital';
import { RDStoryView } from 'react-native-related-digital';
function TargetScreen() {
    const [pageName, setPageName] = React.useState('');
    const [showStory, setShowStory] = React.useState(true);
    const handleCustomEvent = () => {
        let parsedParameters = { key: 'value' };
        RelatedDigital.customEvent(pageName, parsedParameters);
        console.log('Custom event sent.');
        setShowStory(true);
    };
    return (React.createElement(ScrollView, { contentContainerStyle: styles.container },
        React.createElement(Text, { style: styles.heading }, "Targeting Actions"),
        showStory && (React.createElement(View, { style: [styles.main] },
            React.createElement(RDStoryView, { actionId: '', onItemClicked: (data) => {
                    console.log('Story data', data);
                } }))),
        React.createElement(Text, { style: styles.heading }, "Custom Events"),
        React.createElement(Text, null, "Page Name:"),
        React.createElement(TextInput, { style: styles.input, value: pageName, onChangeText: setPageName, placeholder: "Enter page name" }),
        React.createElement(Button, { title: "Send Custom Event", onPress: handleCustomEvent })));
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    main: {
        width: '100%',
        alignSelf: 'center',
        // backgroundColor:'yellow',
    },
});
export default TargetScreen;
