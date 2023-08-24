import * as React from 'react';
import { SafeAreaView, Button, View, TextInput } from 'react-native';
import { StoryView } from '@relateddigital/react-native-huawei';
import styles from './../Styles';
export function StoryScreen() {
    const [showingStory, setShowingStory] = React.useState(false);
    const [showingNps, setShowingNps] = React.useState(false);
    const [actionId, setActionId] = React.useState('310');
    function showStory() {
        setShowingStory(false);
        setShowingStory(true);
        setShowingNps(false);
    }
    function showNpsWithNumbers() {
        setShowingNps(false);
        setShowingNps(true);
        setShowingStory(false);
    }
    return (React.createElement(SafeAreaView, { style: styles.container },
        React.createElement(TextInput, { style: styles.storyActionIdInput, placeholder: "Action Id(optional)", value: actionId, onChangeText: setActionId }),
        React.createElement(View, { style: styles.button },
            React.createElement(Button, { title: 'Show Story', onPress: () => showStory() })),
        React.createElement(View, { style: styles.button },
            React.createElement(Button, { title: 'Show Nps With Numbers', onPress: () => showNpsWithNumbers() })),
        showingStory && (React.createElement(View, { style: styles.storyBackgroundContainer },
            React.createElement(StoryView, { actionId: actionId, onItemClicked: (event) => console.log(event), 
                // @ts-ignore
                style: styles.flex1 }))),
        showingNps && (React.createElement(View, { style: styles.storyBackgroundContainer },
            React.createElement(StoryView, { actionId: actionId, onItemClicked: (event) => console.log(event), 
                // @ts-ignore
                style: styles.flex1 })))));
}
