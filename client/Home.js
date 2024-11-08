import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, StatusBar, Alert } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
// import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  logout,
  getUserAllData,
  setApplicationIconBadgeNumber,
  setGeofencingIntervalInMinute,
  logToConsole,
  RDStoryView,
  RDBannerView,
  RecommendationAttribute,
  RecommendationFilterType
} from 'react-native-related-digital'
import CustomButton from './components/CustomButton'
import Widget from './components/Widget'

import messaging from '@react-native-firebase/messaging';


const _RNRD = true;
const _FIREBASE = true;


// test app alias = rniostestapptest
// test app alias = rniostestapp

// test app test alias = rnandroidtestapptest
// test app prod alias = RnPushSdk

const appAlias = Platform.OS === 'android' ? 'rnandroidtestapptest' : 'rniostestapptest'
// const appAlias = Platform.OS === 'android' ? 'rnandroidtestappprod' : 'rniostestapp'
const siteId = "356467332F6533766975593D";
const organizationId = "676D325830564761676D453D";
const dataSource = "visistore";

let euroMessageApi, visilabsApi;
if (_RNRD) {
  euroMessageApi = new EuroMessageApi(appAlias)
  visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource)
}

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: null,
      inapps: false,
      story: false,
      banner: false,
      widget: null,
      others: false,
      subsStatus: null,
      pushPermit: false,
      search: false,
      productSearchResults: [],
      categorySearchResults: [],
      brandSearchResults: [],
      popularSearchSearchResults: [],
      userData: {
        "keyID": "",
        "email": "",
        "ConsentTime": "2029-01-01 10:00:00",
        "RecipientType": "BIREYSEL",
        "ConsentSource": "HS_MOBIL",
      },
      searchKeyword: "",
      searchType: "web",
    }


    // this.getUser(false)

  }

  pushPermitRequest = async () => {
    if (_RNRD) {
      const pushPermit = await requestPermissions(false)
      console.log("Device Push Permit", pushPermit);
      euroMessageApi.setUserProperties({ pushPermit: pushPermit ? 'Y' : 'N' }).then(() => {
        euroMessageApi.subscribe(this.state.token)
      })
    }
  }

  componentDidMount() {
    _RNRD && this.addListeners()
    _RNRD && this.pushPermitRequest()
    _FIREBASE && messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("onNotificationOpenedApp remoteMessage", remoteMessage);
    });
    _FIREBASE && messaging().getInitialNotification().then(initialMessage => {
      console.log("_FIREBASE Initial Message: ", initialMessage); 
   })
    _FIREBASE && this.firebaseTokenListener()
    _FIREBASE && this.firebaseRequestUserPermission()
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
    // addEventListener('ActionButtonClicked', async (actionButtonData) => { console.log('actionButtonData ', actionButtonData) }, euroMessageApi)
  }

  firebaseTokenListener = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log("FIREBASE TOKEN",token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      console.log("FIREBASE TOKEN onTokenRefresh",token);
    });
  }

  firebaseRequestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  login = async () => {
    if (!this.state.userData.email) {
      Alert.alert("Hata", "Email adresinizi girin");
      return false
    }

    this.setState({ subsStatus: true })

    let userData = { ...this.state.userData, "pushPermit": "Y" }

    euroMessageApi.setUserProperties(userData).then(() => {
      euroMessageApi.subscribe(this.state.token)
      visilabsApi.customEvent("Login", { 'OM.exVisitorID': this.state.userData.keyID, 'OM.b_login': '1' })
      Alert.alert("Başarılı", "Başarılı şekilde giriş yaptınız.");
    })
  }

  logout = async () => {
    logout(false);
    alert("Success logout");
    this.getUser(false);
  }

  togglePushPermit = (value) => {
    this.setState({ pushPermit: value })
    let userData = { ...this.state.userData, "pushPermit": (value ? "Y" : "N") }

    euroMessageApi.setUserProperties(userData).then(() => {
      euroMessageApi.subscribe(this.state.token)
      console.log("Success Turn off");
    })
  }

  changeEmail = (email) => {
    let userData = { ...this.state.userData, "email": email, "keyID": email }

    this.setState({ userData, subsStatus: false })
  }

  sendCustomEvent = (type) => {
    console.log("type", type);
    let parameters = { 'OM.inapptype': type };
    if (type == 'product_stat_notifier') {
      parameters['OM.pv'] = 'CV7933-837-837';
    }
    visilabsApi.customEvent("InAppTest", parameters);
  }

  getUser = async (isAlert) => {
    const result = await getUserAllData();
    isAlert && Alert.alert(
      JSON.stringify(result),
      "",
      [
        {
          text: "Copy",
          onPress: () => { this.cpy(JSON.stringify(result)) },
        },
        {
          text: "Close",
          onPress: () => { },
          style: 'cancel',
        },
      ], {
      cancelable: true
    }
    )

    console.log("Euromsg - keyID", result.euromsg.extra.keyID);
    console.log("Euromsg - email", result.euromsg.extra.email);
    console.log("Euromsg - pushPermit", result.euromsg.extra.pushPermit);

    let userData = {
      ...this.state.userData,
      "email": result.euromsg.extra.email,
      "keyID": result.euromsg.extra.keyID,
      "pushPermit": result.euromsg.extra.pushPermit
    }

    this.setState({
      userData,
      subsStatus: (result.euromsg.extra.email ? true : false),
      pushPermit: (result.euromsg.extra.pushPermit ? (result.euromsg.extra.pushPermit == "Y" ? true : false) : false)
    })
  }

  tokenControl = () => { ////////
    let status = this.state.token ? true : false;
    let statusData = {
      title: "Token Durumu",
      status,
      desc: status ? "Başarılı" : "Token Yakalanamamış olabilir. Çözüm için push bildirim ayarlarınızı kontrol edin."
    }
    return statusData
  }

  subsControl = () => { ////////
    let status = (this.state.userData.email && this.state.subsStatus) ? true : false;
    let statusData = {
      title: "Üyelik Durumu",
      status,
      desc: status ? "Eşleşme Başarılı" : "Kullanıcı ile token ile eşleşmemiş gözüküyor. Bu durumda sadece bulk pushları alabilirsiniz. Email adresinizi yazıp Login butonuna dokunun."
    }
    return statusData
  }

  permitControl = () => { ////////
    let status = this.state.pushPermit ? true : false;
    let statusData = {
      title: "Push İzin Durumu",
      status,
      desc: status ? "İzin Verilmiş" : "Push izni kapalı. Bu durumda pushlar ulaşmayacaktır."
    }
    return statusData
  }


  healthCheck = () => {
    let ts = this.tokenControl()
    let ss = this.subsControl()
    let ps = this.permitControl()


    if (ts.status && ss.status && ps.status) {
      return true
    } else {
      return false
    }
  }

  loginLogoutButton = (type) => {
    return (
      <CustomButton style={{ width: "45%" }} data={type == "login" ? { name: "Login" } : { name: "Logout" }} action={type == "login" ? this.login : this.logout} />
    )
  }

  title = (title, fontSize) => {
    return (
      <Text style={[this.styles.title, fontSize && { fontSize }]}>{title}</Text>
    )
  }

  input = () => {
    return (
      <TextInput
        style={this.styles.textInput}
        placeholder={"Email"}
        placeholderTextColor="gray"
        value={this.state.userData.email}
        onChangeText={(v) => { this.changeEmail(v) }}
        editable
      />
    )
  }

  styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "95%",
      alignSelf: 'center',
      backgroundColor: 'white'
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
      color: 'black',
      borderColor: 'gray',

    },
    buttonTitle: {
      color: 'green',
      fontWeight: "500",
      textAlign: 'center',
      fontSize: 18
    },
    tokenContainer: {
      width: "95%",
      backgroundColor: 'rgba(0,0,0,.25)',
      // borderWidth:1,
      borderRadius: 5,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    token: {
      // backgroundColor:'red',
      width: "95%",
      marginVertical: 3
    },
    main: {
      width: "95%",
      alignSelf: 'center',
      // backgroundColor:'green',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      width: "95%",
      alignSelf: 'center',
      marginTop: 15
    },
    row: {
      flexDirection: 'row',
      // borderWidth:1,
      width: "70%",
      marginVertical: 10,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    permitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // backgroundColor:'red',
      width: "95%"
    }
  });

  hr = () => {
    return (
      <View style={this.styles.hr}></View>
    )
  }

  push = () => {
    return (
      <View>
        {this.title("Push Notifications", 25)}
        <View style={[this.styles.section]}>
          {this.userStatus()}
          {this.input()}
          {this.pushPermit()}
          <View style={{ flexDirection: 'row' }}>
            {this.loginLogoutButton("logout")}
            {this.loginLogoutButton("login")}
          </View>
          <View style={this.styles.tokenContainer}>
            {this.title("User Details", 18)}
            <Text style={this.styles.token}>{'Email: ' + (this.state.userData.email ? this.state.userData.email : "Anonim")}</Text>
            <Text style={this.styles.token}>{'keyID(ExVisitorID): ' + (this.state.userData.keyID ? this.state.userData.keyID : "Anonim")}</Text>
            <Text style={this.styles.token}>{'Token: ' + this.state.token}</Text>
            <CustomButton mini style={{ width: "90%" }} data={{ name: "Copy User Data" }} action={() => { this.copyOperations() }} />
          </View>
        </View>
      </View>
    )
  }

  pushPermit = () => {
    return (
      <View style={this.styles.permitRow}>
        <Text style={{ fontWeight: 'bold', color: 'gray' }}>Push İzni : </Text>
        <Switch
          style={{ transform: [{ scale: 1 }] }}
          onValueChange={(value) => this.togglePushPermit(value)}
          value={this.state.pushPermit}
        />

        {this.title(this.state.pushPermit ? "Aktif" : "Pasif", 15)}
      </View>
    )
  }

  userStatus = () => {
    return (
      <View style={this.styles.main}>
        <View style={[this.styles.tokenContainer, { width: "100%" }]}>
          {this.title("Durum Bilgisi", 18)}
          {this.title((this.healthCheck() ? "Bu cihaza push atılabilir" : "Eksik işlemler var, pushlar ulaşmayabilir"), 15)}
          <View>
            {this.statusRow(this.tokenControl())}
            {this.statusRow(this.subsControl())}
            {this.statusRow(this.permitControl())}
          </View>
        </View>
      </View>
    )
  }

  statusRow = (statusData) => { //////
    return (
      <View style={this.styles.row}>
        {statusData.status ?
          <FontAwesome name={"check"} size={18} color={"green"} style={{ marginTop: -2 }} />
          :
          <FontAwesome name={"times"} size={18} color={"red"} style={{ marginTop: -2 }} />
        }
        <Text>{statusData.title}:</Text>
        <Text>{statusData.desc}</Text>
      </View>
    )
  }



  render() {
    return (
      <SafeAreaView style={[this.styles.container]}>
        <StatusBar
          barStyle={'dark-content'}
          hidden={false}
        />
        <ScrollView>
          {this.push()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}