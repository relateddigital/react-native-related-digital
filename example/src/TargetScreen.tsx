import * as React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Targeting Actions</Text>
      {showStory && (
        <View style={[styles.main]}>
          <RDStoryView
            actionId={''} // 459 banner, 497 normal optional
            onItemClicked={(data) => {
              console.log('Story data', data);
            }}
          />
        </View>
      )}
      <Text style={styles.heading}>Custom Events</Text>
      <Text>Page Name:</Text>
      <TextInput
        style={styles.input}
        value={pageName}
        onChangeText={setPageName}
        placeholder="Enter page name"
      />
      <Button title="Send Custom Event" onPress={handleCustomEvent} />
    </ScrollView>
  );
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
