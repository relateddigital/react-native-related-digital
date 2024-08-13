import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { Component } from 'react'
import { height, width } from './constants/Constants';

export default class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notifs: this.props.route.params.notifs
    }

    console.log("notifs", this.props.route.params);
    this.setNotif()
  }

  setNotif = () => {
    console.log("euroMessageApi", this.props.route.params.euroMessageApi)
  }

  deleteMessage = async (pushId) => {
    const result = await this.props.route.params.euroMessageApi.deletePushNotificationsFromLocalNotificationCenter(pushId);
    alert(result);
    this.refreshNotifs();
  }

  refreshNotifs = async () => {
    this.setState({
      notifs: await this.props.route.params.euroMessageApi.getPushMessages()
    })
  }

  readMessage = async (pushId) => {
    const result = await this.props.route.params.euroMessageApi.readPushMessages(pushId);
    alert(result);
    this.refreshNotifs();
  }

  renderItem = () => (
    this.state.notifs.map((item, i) => {
      return (
        <View style={[styles.item, item.status === 'O' && { backgroundColor: 'red' }]}>
          <Text style={styles.title}>{Platform.OS === 'ios' ? item.formattedDateString : item.date}</Text>
          <Text style={styles.title}>{Platform.OS === 'ios' ? item.aps.alert.title : item.title}</Text>
          <Text style={styles.title}>{Platform.OS === 'ios' ? item.aps.alert.body : item.message}</Text>
          <View style={[styles.row]}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => { this.deleteMessage(Platform.OS === 'ios' ? item.pushId : item.notificationId) }}>
              <Text>Sil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button]}
              onPress={() => { this.readMessage(item.pushId) }}>
              <Text>Okundu İşaretle</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    })
  );

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={async () => {
            const result = await this.props.route.params.euroMessageApi.deletePushNotificationsFromLocalNotificationCenter();
            alert(result);
            this.refreshNotifs();
          }}>
          <Text>Tümünü sil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={async () => {
            const result = await this.props.route.params.euroMessageApi.readPushMessages();
            alert(result);
            this.refreshNotifs();
          }}>
          <Text>Tümünü Oku</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={async () => {
            this.refreshNotifs();
          }}>
          <Text>Yenile</Text>
        </TouchableOpacity>
        <ScrollView> {this.renderItem()} </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollview: {
    flex: 1,
    padding: 10,
    backgroundColor: "purple"
  },
  item: {
    backgroundColor: '#ccc',
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
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: '#ededed',
    borderRadius: 5
  }
});

