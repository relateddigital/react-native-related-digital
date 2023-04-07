import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, TextInput, ClipboardStatic } from 'react-native'
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
  RecommendationAttribute,
  RecommendationFilterType
} from 'react-native-related-digital'
import CustomButton from './components/CustomButton'
import Widget from './components/Widget'


const appAlias = Platform.OS === 'android' ? 'RnPushSdk' : 'rniostestapp'

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
      inapps: false,
      story: false,
      widget: null,
      others: true,
      userData: {
        "Keyid": "baris.arslan@euromsg.com",
        "Email": "baris.arslan@euromsg.com",
        "ConsentTime": "2022-11-12 10:00:00",
        "RecipientType": "BIREYSEL",
        "ConsentSource": "HS_MOBIL",
        "PushPermit": "Y"
      },
    }

    this.inAppTypes = [
      {
        'type': 'Pop-up',
        'values': [
          {
            'key': 'full_image',
            'name': 'Full Image'
          },
          {
            'key': 'full',
            'name': 'Full Screen'
          },
          {
            'key': 'mini',
            'name': 'Mini'
          },
          {
            'key': 'image_text_button',
            'name': 'Image Text Button'
          },
          {
            'key': 'image_button',
            'name': 'Image Button'
          },
          {
            'key': 'half_screen_image',
            'name': 'Half Screen Image'
          },
          {
            'key': 'inappcarousel',
            'name': 'In App Carousel'
          },
          {
            'key': 'drawer',
            'name': 'Drawer'
          },
        ],
      },
      {
        'type': 'NPS',
        'values': [
          {
            'key': 'nps-feedback',
            'name': 'NPS (Feedback)'
          },
          {
            'key': 'nps',
            'name': 'NPS'
          },
          {
            'key': 'nps_with_numbers',
            'name': 'NPS (NUMBERS)'
          },
          {
            'key': 'nps-image-text-button-image',
            'name': 'NPS (IMG-TXT-BTN-IMG)'
          },
          {
            'key': 'nps-image-text-button',
            'name': 'NPS (IMG-TXT-BTN)'
          },
          {
            'key': 'smile_rating',
            'name': 'Smile Rating'
          },
        ],
      },
      {
        'type': 'Gamifications',
        'values': [
          {
            'key': 'spintowin',
            'name': 'Spin to Win'
          },
          {
            'key': 'scratch_to_win',
            'name': 'Scratch To Win'
          },
        ],
      },
      {
        'type': 'Others',
        'values': [
          {
            'key': 'subscription_email',
            'name': 'Subscription Email Form'
          },
          {
            'key': 'product_stat_notifier',
            'name': 'Product Stat Notifier'
          },
          {
            'key': 'alert_actionsheet',
            'name': 'Action Sheet Alert'
          },
          {
            'key': 'alert_native',
            'name': 'Native Alert'
          },
        ],
      },
    ]

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
      visilabsApi.customEvent("Login", { 'OM.exVisitorID': this.state.userData.Keyid, 'OM.b_login': '1' })
      console.log("Success login");
    })
  }

  logout = async () => {
    logout();
    console.log("Success logout");
  }

  PushPermitOff = async () => {
    let userData = { ...this.state.userData, "PushPermit": "N" }

    euroMessageApi.setUserProperties(userData).then(() => {
      euroMessageApi.subscribe(this.state.token)
      console.log("Success Turn off");
    })
  }

  changeEmail = (email) => {
    let userData = { ...this.state.userData, "Email": email, "KeyID": email }

    this.setState({ userData })
  }

  sendCustomEvent = (type) => {
    console.log("type", type);
    let parameters = { 'OM.inapptype': type };
    if (type == 'product_stat_notifier') {
      parameters['OM.pv'] = 'CV7933-837-837';
    }
    visilabsApi.customEvent("InAppTest", parameters);
  }

  getUser = async () => {
    const result = await getUserAllData();
    console.log("ALL Storage Data", result);
    console.log("Visilabs - Exvisitorid", result.visilabs.exVisitorId);
    console.log("Euromsg - Keyid", result.euromsg.extra.Keyid);
    console.log("Euromsg - Email", result.euromsg.extra.Email);
    console.log("JS Euromsg - Keyid", result.js.euromsgsubextra?.Keyid);
    console.log("JS Euromsg - Email", result.js.euromsgsubextra?.Email);
  }

  getRecommendations = async () => {
    try {
      const zoneId = '5'
      const productCode = ''

      const properties = {
        // "OM.cat": "409",
      }

      // optional
      const filters = [{
        attribute: RecommendationAttribute.PRODUCTCODE,
        filterType: RecommendationFilterType.equals,
        value: '78979,21312,45345'
      }]

      // const recommendations = await visilabsApi.getRecommendations(zoneId, productCode, properties, filters)
      const recommendations = {
        "recommendations": [
          {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          }, {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://picsum.photos/200/300",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
          },
        ],
        "title": "Display You Viewed"
      };
      this.setState({ widget: recommendations })

    }
    catch (e) {
      console.log('recommendations error', e)
    }
  }

  trackRecommendationClick = (qs) => {
    visilabsApi.trackRecommendationClick(qs)
  }


  toggleStory = () => {
    this.setState({
      story: !this.state.story
    })
  }

  toggleInapps = () => {
    this.setState({
      inapps: !this.state.inapps
    })
  }

  toggleOthers = () => {
    this.setState({
      others: !this.state.others
    })
  }

  requestIDFA = async () => {
    requestIDFA().then((idfa) => {
      console.log("IDFA", idfa);
    })
  }

  // UI
  renderInApptitles = () => (
    this.inAppTypes.map((item, i) => {
      return (
        <View>
          {this.title(item.type, 18)}
          <View style={this.styles.inAppContainer}>
            {this.renderInApps(item.values)}
          </View>
        </View>
      );
    })
  );

  renderInApps = (data) => (
    data.map((item, i) => {
      return (
        <CustomButton key={i} style={{ width: width * .4 }} childStyle={{ fontSize: 15, padding: 5 }} data={item} action={this.sendCustomEvent} />
      );
    })
  );

  inappToggleButton = () => {
    return (
      <CustomButton mini style={{ width: "50%" }} data={{ name: (!this.state.inapps ? "Show In Apps" : "Hide In Apps") }} action={this.toggleInapps} />
    )
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
        value={this.state.userData.Email}
        onChangeText={(v) => { this.changeEmail(v) }}
        editable
      />
    )
  }

  renderOthers = () => {
    return (
      <View>
        <View style={this.styles.titleContainer}>
          {this.title("Get User", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Get" }} action={() => { this.getUser() }} />
        </View>

        <View style={this.styles.titleContainer}>
          {this.title("Get Push Messages", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Get" }} action={async () => { console.log('Push Messages', await euroMessageApi.getPushMessages()) }} />
        </View>

        <View style={this.styles.titleContainer}>
          {this.title("Request IDFA (iOS)", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Get" }} action={async () => { console.log('IDFA', this.requestIDFA()) }} />
        </View>

        <View style={this.styles.titleContainer}>
          {this.title("Get Fav. Attr. Actions", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Get" }} action={async () => { console.log('Favorite Attribute Actions', await visilabsApi.getFavoriteAttributeActions('474')) }} />
        </View>

        <View style={this.styles.titleContainer}>
          {this.title("List Of Installed Apps", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Send" }} action={async () => { await visilabsApi.sendTheListOfAppsInstalled() }} />
        </View>

        <View style={this.styles.titleContainer}>
          {this.title("Set Badge Number (3)", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Set" }} action={async () => { setApplicationIconBadgeNumber(3) }} />
        </View>

        <View style={this.styles.titleContainer}>
          {this.title("Send Location Permission Event", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Send" }} action={async () => { await visilabsApi.sendLocationPermission() }} />
        </View>

        <View style={this.styles.titleContainer}>
          {this.title("Turn Off Push Permit", 15)}
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Turn Off" }} action={async () => { PushPermitOff(); console.log("Push Permit = N"); }} />
        </View>
      </View>
    )
  }

  getRecoButton = () => {
    return (
      <CustomButton mini style={{ width: "50%" }} data={{ name: "Get Recommendation" }} action={this.getRecommendations} />
    )
  }

  storyToggleButton = () => {
    return (
      <CustomButton mini style={{ width: "50%" }} data={{ name: (!this.state.story ? "Show Story" : "Hide Story") }} action={this.toggleStory} />
    )
  }

  othersToggleButton = () => {
    return (
      <CustomButton mini style={{ width: "50%" }} data={{ name: (!this.state.others ? "Show Others" : "Hide Others") }} action={this.toggleOthers} />
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
    }
  });

  render() {
    return (
      <SafeAreaView style={[this.styles.container]}>
        <ScrollView>
          {this.title("Push Notifications", 25)}
          <View style={[this.styles.section]}>
            {this.input()}
            <View style={{ flexDirection: 'row' }}>
              {this.loginLogoutButton("logout")}
              {this.loginLogoutButton("login")}
            </View>
            {this.state.token && <View style={this.styles.tokenContainer}>
              <Text style={this.styles.token}>{'Token: ' + this.state.token}</Text>
              <CustomButton mini style={{ width: "90%" }} data={{ name: "Copy Token" }} action={async () => { await ClipboardStatic.setString(this.state.token) }} />
            </View>}
          </View>

          <View style={this.styles.titleContainer}>
            {this.title("Others", 25)}
            {this.othersToggleButton()}
          </View>
          {this.state.others && <View style={[this.styles.inAppContainer]}>
            {this.renderOthers()}
          </View>}

          <View style={this.styles.titleContainer}>
            {this.title("Story", 25)}
            {this.storyToggleButton()}
          </View>
          {this.state.story && <View style={[this.styles.main]}>
            <RDStoryView
              // actionId={'459'} // 459 banner, 497 normal optional
              onItemClicked={(data) => {
                console.log('Story data', data)
              }}
            />
          </View>}

          <View style={this.styles.titleContainer}>
            {this.title("In App", 25)}
            {this.inappToggleButton()}
          </View>
          {this.state.inapps && <View style={[this.styles.section, this.styles.inAppContainer]}>
            {this.renderInApptitles()}
          </View>}

          <View style={this.styles.titleContainer}>
            {this.title("Widget", 25)}
            {this.getRecoButton()}
          </View>
          <View style={[this.styles.main]}>
            {this.state.widget && <Widget widgetData={this.state.widget} trackRecommendationClick={this.trackRecommendationClick} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}