import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  ActivityIndicator,
  Platform
} from 'react-native';


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
import Widget from './components/Widget';

const App = () => {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [widget, setWidget] = useState(null)

  const appAlias = Platform.OS === 'android' ? 'RnPushSdk' : 'rniostestapp'

  const siteId = "356467332F6533766975593D";
  const organizationId = "676D325830564761676D453D";
  const dataSource = "visistore";

  const euroMessageApi = new EuroMessageApi(appAlias)
  const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource)

  useEffect(() => {
    logToConsole(true)
    setGeofencingIntervalInMinute(30)

    addListeners()

    return () => removeListeners()
  }, [])

  const addListeners = () => {
    console.log('adding listeners...')
    addEventListener('register', async (token) => {
      console.log('token is ', token)
      setToken(token)

      euroMessageApi.subscribe(token)

      visilabsApi.register(token, (result) => {
        console.log('visilabsApi result', result)
      })
    }, (notificationPayload) => {
      console.log('notification payload', notificationPayload)
    }, euroMessageApi, visilabsApi)

    addEventListener('registrationError', async (registrationError) => {
      console.log('registrationError is ', registrationError)
    }, euroMessageApi)

    addEventListener('carouselItemClicked', async (carouselItemInfo) => {
      console.log('carouselItemInfo is ', carouselItemInfo)
    }, euroMessageApi)
  }

  const login = async () => {
    // await euroMessageApi.setUserProperty('ConsentTime', '2021-06-05 10:00:00')
    // await euroMessageApi.setUserProperty('RecipientType', "BIREYSEL")
    // await euroMessageApi.setUserProperty('ConsentSource', "HS_MOBIL")

    // await euroMessageApi.setUserProperty('Email', "examplemail@euromsg.com")
    // await euroMessageApi.setUserProperty('keyid', "123456")

    // OR

    let userData = {
      "Keyid": "baris.arslan123@euromsg.com",
      "Email": "baris.arslan123@euromsg.com",
      "ConsentTime": "2022-06-05 10:00:00",
      "RecipientType": "BIREYSEL",
      "ConsentSource": "HS_MOBIL",
      "PushPermit": "Y"
    }

    euroMessageApi.setUserProperties(userData).then(()=>{
      euroMessageApi.subscribe(token)
    })
  }

  const logout = async () => {
    let userData = {
      "Keyid": "baris.arslan@euromsg.com",
      "Email": "baris.arslan@euromsg.com",
      "ConsentTime": "2022-06-05 10:00:00",
      "RecipientType": "BIREYSEL",
      "ConsentSource": "HS_MOBIL",
      "PushPermit": "Y"
    }

    euroMessageApi.setUserProperties(userData).then(()=>{
      euroMessageApi.subscribe(token)
    })
  }
  const setBadgeNumber = () => {
    const number = 3
    setApplicationIconBadgeNumber(number)
  }

  const sendCustomEvent = () => {
    visilabsApi.customEvent('HomePage', {
      'OM.pv': '77',
      'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
      'OM.ppr': '39',
      'OM.exVisitorID': "baris.arslan@euromsg.com",
      'OM.uri': 'CheckoutViewed',
    })
  }

  const nps = () => {
    visilabsApi.customEvent("NPSINAPP", {
      'OM.exVisitorID': "baris.arslan@euromsg.com"
    })
  }

  const mailSubsForm = () => {
    visilabsApi.customEvent("home", {
      'OM.inapptype': "mailsubsform"
    })
  }

  const getRecommendations = async () => {
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

      const recommendations = await visilabsApi.getRecommendations(zoneId, productCode, properties, filters)
      setWidget(recommendations)

    }
    catch (e) {
      console.log('recommendations error', e)
    }
  }

  const trackRecommendationClick = (qs) => {
    visilabsApi.trackRecommendationClick(qs)
  }

  const getFavoriteAttributeActions = async () => {
    try {
      const actionId = '474'

      const favoriteAttrs = await visilabsApi.getFavoriteAttributeActions(actionId)
      console.log('favoriteAttributeActions', favoriteAttrs)
    }
    catch (e) {
      console.log('favoriteAttributeActions error', e)
    }
  }

  const showSpinToWin = () => {
    visilabsApi.customEvent('home', {
      'OM.inapptype': 'spintowin'
    })
  }

  const trackInstalledApps = async () => {
    await visilabsApi.sendTheListOfAppsInstalled()
  }

  const sendLocationPermissionEvent = async () => {
    await visilabsApi.sendLocationPermission()
  }

  const showScratchToWin = () => {
    visilabsApi.customEvent('home', {
      'OM.inapptype': 'scratchToWin'
    })
  }

  const halfScreenInapp = () => {
    visilabsApi.customEvent('home', {
      'OM.inapptype': 'halfscreen',
    })
  }

  const baris_drawerpopup = () => {
    visilabsApi.customEvent('baaris_drawerpopup', {
      'OM.inapptype': 'drawer',
    })
  }

  const inAppCarousel = () => {
    visilabsApi.customEvent('home', {
      'OM.inapptype': 'inappcarousel',
    })
  }


  const productStatNotif = () => {
    visilabsApi.customEvent('home', {
      'OM.pv': '50194393030',
      'OM.inapptype': 'productStatNotifier',
    })
  }

  const getPushMessages = async () => {
    const messages = await euroMessageApi.getPushMessages()
    console.log('messages', messages)
  }

  const getUser = async () => {
    const user = await visilabsApi.getUser()
    console.log('USER DATA', user)
  }

  const removeListeners = () => {
    removeEventListener('register')
    removeEventListener('registrationError')
    removeEventListener('carouselItemClicked')
  }

  return (
    <SafeAreaView>
      {
        loading ?
          <ActivityIndicator
            size='large'
            animating={loading} /> :
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <RDStoryView
              // actionId={'459'} // 459 banner, 497 normal optional
              onItemClicked={(data) => {
                console.log('Story data', data)
              }}
              style={{ flex: 1 }}
            />
            {widget && <Widget widgetData={widget} trackRecommendationClick={trackRecommendationClick} />}
            <Text>Token:{token}</Text>
            <Button
              title='REQUEST PERMISSONS'
              onPress={() => {
                const isProvisional = false
                requestPermissions(isProvisional)
              }}
            />
            <Button
              title='REQUEST IDFA'
              onPress={() => {
                requestIDFA()
              }}
            />
            <Button
              title='REQUEST LOCATION PERMISSION'
              onPress={() => {
                requestLocationPermission()
              }}
            />
            <Button
              title='LOGIN'
              onPress={() => {
                login()
              }}
            />

            <Button
              title='LOGOUT'
              onPress={() => {
                logout()
              }}
            />

            <Button
              title='KULAKÇIK'
              onPress={() => {
                baris_drawerpopup()
              }}
            />

            <Button
              title='SET BADGE NUMBER TO 3 (IOS)'
              onPress={() => {
                setBadgeNumber()
              }}
            />

            <Button
              title='SEND CUSTOM EVENT'
              onPress={() => {
                sendCustomEvent()
              }}
            />

            <Button
              title='GET RECOMMENDATIONS'
              onPress={async () => {
                await getRecommendations()
              }}
            />

            <Button
              title='Track Recommendation Click'
              onPress={() => {
                trackRecommendationClick("OM.zn=You Viewed-w60&OM.zpc=1147091")
              }} />

            <Button
              title='GET FAVORITE ATTRIBUTE ACTIONS'
              onPress={async () => {
                await getFavoriteAttributeActions()
              }}
            />

            <Button
              title='SPIN TO WIN'
              onPress={() => {
                showSpinToWin()
              }}
            />

            <Button
              title='IN APP CAROUSEL'
              onPress={() => {
                inAppCarousel()
              }}
            />

            <Button
              title='SCRATCH TO WIN'
              onPress={() => {
                showScratchToWin()
              }}
            />

            <Button
              title='MAIL SUBS FORM'
              onPress={() => {
                mailSubsForm()
              }}
            />
            <Button
              title='TRACK INSTALLED APPS'
              onPress={() => {
                trackInstalledApps()
              }}
            />

            <Button
              title='SEND LOCATION PERMISSION'
              onPress={() => {
                sendLocationPermissionEvent()
              }}
            />

            <Button
              title='HALF SCREEN INAPP'
              onPress={() => {
                halfScreenInapp()
              }}
            />

            <Button
              title='GET PUSH MESSAGES'
              onPress={() => {
                getPushMessages()
              }}
            />

            <Button
              title='GET USER DATA'
              onPress={() => {
                getUser()
              }}
            />

            <Button
              title='NPS'
              onPress={() => {
                nps()
              }} />

            <Button
              title='Product Stat Notifier'
              onPress={() => {
                productStatNotif()
              }} />

          </ScrollView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
    padding: 20
  },
  divider: {
    height: 20
  }
});

export default App;
