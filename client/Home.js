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


  // test app alias = rniostestapptest
  // test app alias = rniostestapp

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
      banner: false,
      widget: null,
      others: false,
      subsStatus:null,
      pushPermit:false,
      userData: {
        "keyID": "",
        "email": "",
        "ConsentTime": "2029-01-01 10:00:00",
        "RecipientType": "BIREYSEL",
        "ConsentSource": "HS_MOBIL",
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
            'key': 'banner_carousel',
            'name': 'Banner Carousel'
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

    this.getUser(false)
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
    if (!this.state.userData.email) {
      Alert.alert("Hata", "Email adresinizi girin");
      return false
    }

    this.setState({subsStatus:true})

    let userData = { ...this.state.userData, "pushPermit": "Y" }

    euroMessageApi.setUserProperties(userData).then(() => {
      euroMessageApi.subscribe(this.state.token)
      visilabsApi.customEvent("Login", { 'OM.exVisitorID': this.state.userData.keyID, 'OM.b_login': '1' })
      Alert.alert("Başarılı", "Başarılı şekilde giriş yaptınız.");
    })
  }

  logout = async () => {
    logout();
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

    this.setState({ userData,subsStatus:false })
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
            onPress: () => {  },
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
      subsStatus: (result.euromsg.extra.email ? true : false) ,
      pushPermit: (result.euromsg.extra.pushPermit ? (result.euromsg.extra.pushPermit == "Y" ? true : false ) : false)
    })
  }

  getRecommendations = async () => {
    try {
      visilabsApi.customEvent("qwe", {"OM.pv":"50239832021"});

      const zoneId = '62'
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

      const recommendations = await visilabsApi.getRecommendations(zoneId, productCode, properties)
      // const recommendations = {
      //   "recommendations": [
      //     {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     }, {
      //       "attr1": "420494",
      //       "attr10": "",
      //       "attr2": "",
      //       "attr3": "",
      //       "attr4": "",
      //       "attr5": "",
      //       "attr6": "",
      //       "attr7": "",
      //       "attr8": "",
      //       "attr9": "",
      //       "brand": "Related Digital",
      //       "code": "1159092",
      //       "comment": 0,
      //       "cur": "TRY",
      //       "dcur": "TRY",
      //       "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
      //       "discount": 0,
      //       "dprice": 5.25,
      //       "freeshipping": false,
      //       "img": "https://picsum.photos/200/300",
      //       "price": 5.25,
      //       "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
      //       "rating": 0,
      //       "samedayshipping": false,
      //       "title": "Titiz TP-115 Soba Boru Fırçası Yeşil"
      //     },
      //   ],
      //   "title": "Display You Viewed"
      // };
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

  toggleBanner = () => {
    this.setState({
      banner: !this.state.banner
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

  copyOperations = () => {
    const tmpUserData = {
      email:this.state.userData.email,
      keyid:this.state.userData.keyID,
      pushPermit:this.state.userData.pushPermit,
      token:this.state.token
    }

    this.cpy(JSON.stringify(tmpUserData))
  }

  cpy = async (text) => {
    try {
      Clipboard.setString(text)
      alert("Kopyalandı")
    } catch (error) {
      console.log("Copy Error",error);
      alert("Kopyalama sırasında hata oluştu")
    }
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
    }else{
      return false
    }
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
        placeholderTextColor="gray" 
        value={this.state.userData.email}
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
          <CustomButton mini style={{ width: "20%" }} data={{ name: "Get" }} action={() => { this.getUser(true) }} />
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

  bannerToggleButton = () => {
    return (
      <CustomButton mini style={{ width: "50%" }} data={{ name: (!this.state.banner ? "Show Banner" : "Hide Banner") }} action={this.toggleBanner} />
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
      alignSelf: 'center',
      backgroundColor:'white'
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
      color:'black',
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
      marginVertical:3
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
    hr:{
      borderBottomWidth:1,
      borderBottomColor:'gray',
      width:"95%",
      alignSelf:'center',
      marginTop:15
    },
    row:{
      flexDirection:'row',
      // borderWidth:1,
      width:"70%",
      marginVertical:10,
      alignItems:'flex-start',
      justifyContent:'flex-start',
    },
    permitRow:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      // backgroundColor:'red',
      width:"95%"
    }
  });

  hr = () => {
    return(
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
            <CustomButton mini style={{ width: "90%" }} data={{ name: "Copy User Data" }} action={()=>{ this.copyOperations() }} />
          </View>
        </View>
      </View>
    )
  }

  pushPermit = () => {
    return(
      <View style={this.styles.permitRow}>
        <Text style={{fontWeight:'bold', color: 'gray'}}>Push İzni : </Text>
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
    return(
      <View style={this.styles.main}>
        <View style={[this.styles.tokenContainer,{width:"100%"}]}>
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
    return(
      <View style={this.styles.row}>
        {statusData.status ? 
        <FontAwesome name={"check"} size={18} color={"green"} style={{marginTop:-2}}/>
        : 
        <FontAwesome name={"times"} size={18} color={"red"} style={{marginTop:-2}}/>
        }
        <Text>{statusData.title}:</Text>
        <Text>{statusData.desc}</Text>
      </View>
    )
  }


  banner = () => {
    return (
      <View>
        <View style={this.styles.titleContainer}>
          {this.title("Banner", 25)}
          {this.bannerToggleButton()}
        </View>
        {this.state.banner && <View style={[this.styles.main]}>
          <RDBannerView
            properties={{ 
               'OM.inapptype': 'banner_carousel',
            }}
            onRequestResult={isAvailable => 
              console.log('Related Digital - Banners', isAvailable) 
            }
            onItemClicked={data => 
              console.log('Related Digital - Banner data', data)
            }
            style={{
              flex: 1,
            }}
          />
        </View>}
      </View>
    )
  }


  reco = () => {
    return (
      <View>
        <View style={this.styles.titleContainer}>
          {this.title("Widget", 25)}
          {this.getRecoButton()}
        </View>
        <View style={[this.styles.main]}>
          {this.state.widget && <Widget widgetData={this.state.widget} trackRecommendationClick={this.trackRecommendationClick} />}
        </View>
      </View>
    )
  }


  inapp = () => {
    return (
      <View>
        <View style={this.styles.titleContainer}>
          {this.title("In App", 25)}
          {this.inappToggleButton()}
        </View>
        {this.state.inapps && <View style={[this.styles.section, this.styles.inAppContainer]}>
          {this.renderInApptitles()}
        </View>}
      </View>
    )
  }

  others = () => {
    return (
      <View>
        <View style={this.styles.titleContainer}>
          {this.title("Others", 25)}
          {this.othersToggleButton()}
        </View>
        {this.state.others && <View style={[this.styles.inAppContainer]}>
          {this.renderOthers()}
        </View>}
      </View>
    )
  }

  story = () => {
    return (
      <View>
        <View style={this.styles.titleContainer}>
          {this.title("Story", 25)}
          {this.storyToggleButton()}
        </View>
        {this.state.story && <View style={[this.styles.main]}>
          <RDStoryView
            // actionId={'44'} // 459 banner, 497 normal optional
            onItemClicked={(data) => {
              console.log('Story data', data)
            }}
          />
        </View>}
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
          {this.hr()}
          {this.inapp()}
          {this.story()}
          {this.reco()}
          {this.banner()}
          {this.others()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}