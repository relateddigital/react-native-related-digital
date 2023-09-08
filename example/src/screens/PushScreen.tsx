import * as React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import styles from './../Styles';
import {
  RDEventType,
  RelatedDigital,
} from '@relateddigital/react-native-huawei';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  <View style={styles.button}>
    <Button title={title} onPress={onPress} />
  </View>
);

export function PushScreen() {
  const [email, setEmail] = React.useState('');
  const [relatedDigitalUserId, setRelatedDigitalUserId] = React.useState('');

  const handlePushPermission = (permission: boolean) => {
    RelatedDigital.setIsPushNotificationEnabled(
      permission,
      'RDIOSExample',
      'relateddigital-android-test',
      'relateddigital-android-huawei-test',
      permission
    );
  };

  const handlePhonePermission = (permission: boolean) => {
    RelatedDigital.setPhoneNumber('05559990000', permission);
  };

  const handleEmailPermission = (permission: boolean) => {
    RelatedDigital.setEmail(email, permission);
  };

  const handleRegisterEmail = () => {
    RelatedDigital.registerEmail(email, true, true);
  };

  const handleGetToken = () => {
    RelatedDigital.getToken().then((token) => {
      console.log(token);
      Alert.alert('Push Token', token);
    });
  };

  const handleGetPushMessages = (withId: boolean) => {
    const fetchMethod = withId
      ? RelatedDigital.getPushMessagesWithId
      : RelatedDigital.getPushMessages;

    fetchMethod().then(console.log);
  };

  const handleCreateListeners = () => {
    RelatedDigital.addListener(
      RDEventType.NotificationRegistered,
      async (event) => {
        console.log('Push Notification Registered: ' + JSON.stringify(event));
      }
    );

    RelatedDigital.addListener(
      RDEventType.NotificationReceived,
      async (event) => {
        console.log('Push Notification Received: ' + JSON.stringify(event));
      }
    );

    RelatedDigital.addListener(
      RDEventType.NotificationOpened,
      async (event) => {
        console.log('Push Notification Opened: ' + JSON.stringify(event));
      }
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomButton
          title={'Ask For Push Notification Permission'}
          onPress={() => RelatedDigital.askForNotificationPermission()}
        />
        <CustomButton
          title={'Ask For Push Notification Permission Provisional'}
          onPress={() =>
            RelatedDigital.askForNotificationPermissionProvisional()
          }
        />
        <Text>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text>User Id:</Text>
        <TextInput
          style={styles.input}
          value={relatedDigitalUserId}
          onChangeText={setRelatedDigitalUserId}
        />
        <CustomButton
          title={'Enable Push Notification'}
          onPress={() => handlePushPermission(true)}
        />
        <CustomButton
          title={'Disable Push Notification'}
          onPress={() => handlePushPermission(false)}
        />
        <CustomButton
          title={'Enable Phone Permission'}
          onPress={() => handlePhonePermission(true)}
        />
        <CustomButton
          title={'Disable Phone Permission'}
          onPress={() => handlePhonePermission(false)}
        />
        <CustomButton
          title={'Enable Email Permission'}
          onPress={() => handleEmailPermission(true)}
        />
        <CustomButton
          title={'Disable Email Permission'}
          onPress={() => handleEmailPermission(false)}
        />
        <CustomButton
          title={'Set Email'}
          onPress={() => handleEmailPermission(true)}
        />
        <CustomButton
          title={'Register Email'}
          onPress={() => handleRegisterEmail()}
        />
        <CustomButton
          title={'Set Twitter Id'}
          onPress={() => RelatedDigital.setTwitterId('123456789')}
        />
        <CustomButton
          title={'Set Facebook Id'}
          onPress={() => RelatedDigital.setFacebookId('123456789')}
        />
        <CustomButton
          title={'Set Related Digital Id'}
          onPress={() =>
            RelatedDigital.setRelatedDigitalUserId(relatedDigitalUserId)
          }
        />
        <CustomButton
          title={'Set Notification Login Id'}
          onPress={() => RelatedDigital.setNotificationLoginId('987654321')}
        />
        <CustomButton
          title={'Set User Property'}
          onPress={() => RelatedDigital.setUserProperty('key', 'value')}
        />
        <CustomButton
          title={'Remove User Property'}
          onPress={() => RelatedDigital.removeUserProperty('key')}
        />
        <CustomButton title={'Get Token'} onPress={handleGetToken} />
        <CustomButton
          title={'Get Push Messages'}
          onPress={() => handleGetPushMessages(false)}
        />
        <CustomButton
          title={'Get Push Messages With Id'}
          onPress={() => handleGetPushMessages(true)}
        />
        <CustomButton
          title={'Create Listeners'}
          onPress={() => handleCreateListeners()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
