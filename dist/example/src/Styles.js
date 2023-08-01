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
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
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
});
