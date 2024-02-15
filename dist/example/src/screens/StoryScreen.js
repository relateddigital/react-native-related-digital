import * as React from 'react';
import { SafeAreaView, Button, View, TextInput } from 'react-native';
import { StoryView, InlineNpsWithNumbersView, BannerView, } from '@relateddigital/react-native-huawei';
import styles from './../Styles';
var ViewType;
(function (ViewType) {
    ViewType[ViewType["None"] = 0] = "None";
    ViewType[ViewType["Story"] = 1] = "Story";
    ViewType[ViewType["Nps"] = 2] = "Nps";
    ViewType[ViewType["Banner"] = 3] = "Banner";
})(ViewType || (ViewType = {}));
const CustomButton = ({ title, onPress }) => (React.createElement(View, { style: styles.button },
    React.createElement(Button, { title: title, onPress: onPress })));
export function StoryScreen() {
    const [viewType, setViewType] = React.useState(ViewType.None);
    const [actionId, setActionId] = React.useState('310');
    const getContentComponent = () => {
        switch (viewType) {
            case ViewType.Story:
                return (React.createElement(StoryView, { actionId: actionId, onClicked: (event) => console.log(event), style: styles.flex1 }));
            case ViewType.Nps:
                return (React.createElement(InlineNpsWithNumbersView, { properties: { 'OM.inapptype': 'inapp_nps_with_numbers_inline' }, onClicked: (event) => console.log(event), style: styles.flex1 }));
            case ViewType.Banner:
                return (React.createElement(BannerView, { properties: { 'OM.inapptype': 'banner_carousel' }, onClicked: (event) => console.log(event) }));
            default:
                return null;
        }
    };
    return (React.createElement(SafeAreaView, { style: styles.container },
        React.createElement(TextInput, { style: styles.storyActionIdInput, placeholder: "Action Id(optional)", value: actionId, onChangeText: setActionId }),
        React.createElement(CustomButton, { title: 'Show Story', onPress: () => setViewType(ViewType.Story) }),
        React.createElement(CustomButton, { title: 'Show Inline Nps With Numbers', onPress: () => setViewType(ViewType.Nps) }),
        React.createElement(CustomButton, { title: 'Show Banner', onPress: () => setViewType(ViewType.Banner) }),
        viewType !== ViewType.None && (React.createElement(View, { style: styles.storyBackgroundContainer }, getContentComponent()))));
}
