import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { width } from './constants/Constants'
import {
  addEventListener,
  removeEventListener,
  requestPermissions,
  requestLocationPermission,
  requestIDFA,
  EuroMessageApi,
  VisilabsApi,
  setApplicationIconBadgeNumber,
  setGeofencingIntervalInMinute,
  logToConsole,
  RDStoryView,
  RecommendationAttribute,
  RecommendationFilterType
} from 'react-native-related-digital'
import CustomButton from './components/CustomButton'


const appAlias = Platform.OS === 'android' ? 'RnPushSdk' : 'RnPushSdkIOS'

const siteId = "356467332F6533766975593D";
const organizationId = "676D325830564761676D453D";
const dataSource = "visistore";

const euroMessageApi = new EuroMessageApi(appAlias)
const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource)

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: null,
      userData: {
        "Keyid": "baris.arslan@euromsg.com",
        "Email": "baris.arslan@euromsg.com",
        "ConsentTime": "2022-11-11 10:00:00",
        "RecipientType": "BIREYSEL",
        "ConsentSource": "HS_MOBIL",
        "PushPermit": "Y"
      },

    }

    this.inAppTypes = [
      'drawer',
      'inappcarousel',
      'product_stat_notifier',
      'half_screen_image',
      'spintowin',
      'nps-feedback',
      'nps-image-text-button-image',
      'nps-image-text-button',
      'scratch_to_win',
      'subscription_email',
      'alert_actionsheet',
      'alert_native',
      'nps',
      'nps_with_numbers',
      'smile_rating',
      'image_text_button',
      'image_button',
      'full_image',
      'full',
      'mini'
    ]
    // this.inAppTypes = {
    //   "InApps":{
    //     'full_image': 'Full Image',
    //     'full': 'Full Screen',
    //     'mini': 'Mini',
    //     'image_text_button': 'Image Text Button',
    //     'image_button': 'Image Button',
    //     'half_screen_image': 'Half Screen Image',
    //     'inappcarousel':'In App Carousel',
    //     'drawer':'Drawer',
    //   },
    //   "NPS":{
    //     'nps-feedback': 'NPS (Feedback)',
    //     'nps': 'NPS',
    //     'nps_with_numbers': 'NPS (NUMBERS)',
    //     'nps-image-text-button-image': 'NPS (IMG-TXT-BTN-IMG)',
    //     'nps-image-text-button': 'NPS (IMG-TXT-BTN)',
    //     'smile_rating': 'Smile Rating',
    //   },
    //   "Gamifications":{
    //     'spintowin': 'Spin to Win',
    //     'scratch_to_win': 'Scratch To Win',
    //   },
    //   "Others":{
    //     'subscription_email': 'Subscription Email Form',
    //     'product_stat_notifier': 'Product Stat Notifier',
    //     'alert_actionsheet': 'Action Sheet Alert',
    //     'alert_native': 'Native Alert',
    //   },
    // }

  }

  componentDidMount() {
    this.addListeners()
    logToConsole(true)
    setGeofencingIntervalInMinute(30)
    requestPermissions(false)
  }

  componentWillUnmount() {
    removeEventListener('register')
    removeEventListener('registrationError')
    removeEventListener('carouselItemClicked')
  }

  // FX
  addListeners = () => {
    console.log('adding listeners...')

    addEventListener('register', async (token) => {
      console.log('token is ', token)
      this.setState({ token })

      euroMessageApi.subscribe(token)

      visilabsApi.register(token, (result) => {
        console.log('visilabsApi result', result)
      })
    }, (notificationPayload) => { console.log('notification payload', notificationPayload) }, euroMessageApi, visilabsApi)
    addEventListener('registrationError', async (registrationError) => { console.log('registrationError is ', registrationError) }, euroMessageApi)
    addEventListener('carouselItemClicked', async (carouselItemInfo) => { console.log('carouselItemInfo is ', carouselItemInfo) }, euroMessageApi)
  }


  login = async () => {
    let userData = { ...this.state.userData, "PushPermit": "Y" }

    euroMessageApi.setUserProperties(userData).then(() => {
      euroMessageApi.subscribe(this.state.token)
      console.log("Success login");
    })
  }

  logout = async () => {
    let userData = { ...this.state.userData, "PushPermit": "N" }

    euroMessageApi.setUserProperties(userData).then(() => {
      euroMessageApi.subscribe(this.state.token)
      console.log("Success logout");
    })
  }

  changeEmail = (email) => {
    let userData = { ...this.state.userData, "Email": email, "KeyID": email }

    this.setState({ userData })
  }

  sendCustomEvent = (pageName, data) => {
    let parameters = { 'OM.inapptype': data };
    if (data == 'product_stat_notifier') {
      parameters['OM.pv'] = 'CV7933-837-837';
    }
    relatedDigitalPlugin.customEvent("InAppTest", parameters)
    relatedDigitalPlugin.customEvent(pageName, data)
  }

  // UI
  renderInApps = () => (
    this.inAppTypes.map((item, i) => {
      return (
        // <TouchableOpacity
        //   key={i}
        //   style={[this.styles.inAppBox]}
        //   onPress={() => {
        //     let parameters = { 'OM.inapptype': item };
        //     if (item == 'product_stat_notifier') {
        //       parameters['OM.pv'] = 'CV7933-837-837';
        //     }
        //     relatedDigitalPlugin.customEvent("InAppTest", parameters)
        //   }}>
        //   <Text style={this.styles.buttonTitle}>{item}</Text>
        // </TouchableOpacity>

        <CustomButton style={{ width: (item.length > 15 ? width*.5 : width * .26) }} childStyle={{fontSize:15,padding:5}} title={item} action={this.sendCustomEvent} />
      );
    })
  );

  loginLogoutButton = (type) => {
    return (
      <CustomButton style={{ width: "45%" }} title={type == "login" ? "Login" : "Logout"} action={type == "login" ? this.login : this.logout} />
    )
  }

  title = (title) => {
    return (
      <Text style={this.styles.title}>{title}</Text>
    )
  }

  input = () => {
    return (
      <TextInput
        style={this.styles.textInput}
        placeholder={"Email"}
        value={this.state.userData.Email}
        onChangeText={(v) => { this.changeEmail(v) }}
        editable
      />
    )
  }

  styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "95%",
      alignSelf: 'center'
    },
    section: {
      // borderWidth: 1,
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center'
    },
    inAppBox: {
      width: width * .2,
      height: width * .2,
      // backgroundColor: "green",
      borderWidth: 2,
      borderColor: 'green',
      margin: 6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10
    },
    inAppContainer: {
      flexWrap: 'wrap',
      width: "100%",
      flexDirection: 'row',
      // backgroundColor:'red'
    },
    loginLogoutButton: {
      // backgroundColor: 'red',
      width: "47%",
      margin: 3,
      padding: 5,
      borderRadius: 5
    },
    title: {
      paddingLeft: 20,
      marginVertical: 25,
      fontWeight: 'bold',
      fontSize: 25,
      color: 'rgba(0,0,0,1)'
    },
    textInput: {
      width: "95%",
      borderRadius: 10,
      height: 35,
      marginVertical: 10,
      paddingLeft: 15,
      // backgroundColor:'red',
      borderWidth: 1,
      borderColor: 'gray'
    },
    buttonTitle: {
      color: 'green',
      fontWeight: "500",
      textAlign: 'center',
      fontSize: 18
    },

  });

  render() {
    return (
      <SafeAreaView
        style={[
          this.styles.container,
        ]}>
        <ScrollView>
          {this.title("Push Notifications")}
          <View style={[this.styles.section]}>
            {this.input()}
            <View style={{ flexDirection: 'row' }}>
              {this.loginLogoutButton("logout")}
              {this.loginLogoutButton("login")}
            </View>
          </View>
          {this.title("In App Pop-up")}
          <View style={[this.styles.section, this.styles.inAppContainer]}>
            {this.renderInApps()}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}