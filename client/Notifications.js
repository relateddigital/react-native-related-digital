import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { EuroMessageApi } from 'react-native-related-digital'

const appAlias = Platform.OS === 'android' ? 'rnandroidtestapptest' : 'rniostestapptest'
// const appAlias = Platform.OS === 'android' ? 'rnandroidtestappprod' : 'rniostestapp'
const euroMessageApi = new EuroMessageApi(appAlias)

const Notifications = () => {
  const [notifList, setNotifList] = useState([]);

  const markAllAsRead = async () => {
    const result = await euroMessageApi.readPushMessages(null);
    console.log("result", result);
    
    result && refreshNotifs();
  };

  const refreshNotifs = async () => {
    const msgs = await euroMessageApi.getPushMessages();
    setNotifList(msgs);
    console.log("msgs", msgs[0].extraData.map);
  }

  const deleteAllNotifications = async () => {
    const result = await euroMessageApi.deletePushMessages();
    console.log("result", result);
    
    result && refreshNotifs();
  };

  const renderNotification = ({ item }) => (
    <View style={[styles.item, item.status === 'O' && { backgroundColor: '#ddd' }]}>
      <View style={[styles.col]}>
        <Text style={styles.title}>{Platform.OS === 'ios' ? item.aps.alert.title : item.title}</Text>
        <Text style={styles.message}>{Platform.OS === 'ios' ? item.aps.alert.body : item.message}</Text>
        <Text style={styles.date}>{Platform.OS === 'ios' ? item.formattedDateString : item.date}</Text>
      </View>
      <View style={[styles.row]}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => { euroMessageApi.deletePushMessages(Platform.OS === 'ios' ? item.pushId : item.notificationId.toString()) }}>
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => { euroMessageApi.readPushMessages(item.pushId) }}>
          <Text style={styles.buttonText}>Okundu İşaretle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => refreshNotifs()}><Text style={styles.buttonText}>Yenile</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => markAllAsRead()}><Text style={styles.buttonText}>Tümünü Oku</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteAllNotifications()}><Text style={styles.buttonText}>Tümünü Sil</Text></TouchableOpacity>
      </View>

      <FlatList
        data={notifList}
        renderItem={renderNotification}
        keyExtractor={item => Platform.OS === 'ios' ? item.pushId : item.notificationId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  notificationContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationContent: {
    flex: 1,
  },
  // title: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  message: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 8,
    backgroundColor: '#2196F3',
    margin: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
  },

  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default Notifications;
