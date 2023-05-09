import * as React from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function ScreenWrapper({ children, withScrollView = true, style, contentContainerStyle, ...rest }) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const containerStyle = [
        styles.container,
        {
            backgroundColor: theme.colors.background,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.left,
        },
    ];
    return (React.createElement(React.Fragment, null, withScrollView ? (React.createElement(ScrollView, { ...rest, contentContainerStyle: contentContainerStyle, alwaysBounceVertical: false, showsVerticalScrollIndicator: false, style: [containerStyle, style] }, children)) : (React.createElement(View, { style: [containerStyle, style] }, children))));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
