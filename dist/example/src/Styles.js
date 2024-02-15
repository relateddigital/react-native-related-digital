import { StyleSheet } from 'react-native';
export default StyleSheet.create({
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
        borderColor: '#eeeeee',
        borderWidth: 0.5,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16,
    },
    button: {
        borderBottomWidth: 0.25,
        borderTopWidth: 0.5,
        borderColor: '#eeeeee',
        paddingTop: 8,
        paddingBottom: 8,
    },
    sectionHeaderContainer: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#0000FF',
    },
    sectionSubtitle: {
        fontSize: 15,
        color: '#000000',
    },
    cellTitle: {
        fontSize: 20,
        color: '#000000',
    },
    storyContainer: {
        flexGrow: 1,
        padding: 0,
        backgroundColor: '#fff',
    },
    storyActionIdInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        margin: 16,
    },
    storyBackgroundContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    flex1: {
        flex: 1,
    },
});
