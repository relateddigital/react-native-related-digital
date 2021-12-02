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

import { addEventListener, removeEventListener, requestPermissions, requestIDFA, EuroMessageApi, VisilabsApi, setApplicationIconBadgeNumber, logToConsole, RDStoryView, RecommendationAttribute, RecommendationFilterType } from 'react-native-related-digital'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)

  const appAlias = Platform.OS === 'android' ? 'RnPushSdk' : 'RnPushSdkIOS'

  const siteId = "356467332F6533766975593D";
  const organizationId = "676D325830564761676D453D";
  const dataSource = "visistore";

  const euroMessageApi = new EuroMessageApi(appAlias)
  const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource)

  useEffect(() => {
    logToConsole(true)
    
    addExtra()
    addListeners()

    return () => removeListeners()
  }, [])

  const addListeners = () => {
    console.log('adding listeners...')
    addEventListener('register', async (token) => {
      console.log('token is ', token)
      setToken(token)
      addExtra().then((res) => euroMessageApi.subscribe(token));

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

  const addExtra = async () => {
    await euroMessageApi.setUserProperty('extra', 1)

    await euroMessageApi.setUserProperty('ConsentTime', '2021-06-05 10:00:00')
    await euroMessageApi.setUserProperty('RecipientType', "BIREYSEL")
    await euroMessageApi.setUserProperty('ConsentSource', "HS_MOBIL")

    await euroMessageApi.setUserProperty('Email', "baris.arslan@euromsg.com")
    await euroMessageApi.setUserProperty('keyid', "baris.arslan@euromsg.com")
  }

  const setBadgeNumber = () => {
    const number = 3
    setApplicationIconBadgeNumber(number)
  }

  const sendCustomEvent = () => {
    visilabsApi.customEvent('*pragmahome*', {
      'OM.pv': '77',
      'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
      'OM.ppr': '39',
      'OM.exvisitorid':"baris.arslan@euromsg.com"
    })
  }

  const getRecommendations = async () => {
    try {
      const zoneId = '55'
      const productCode = ''

      const properties =  {
        "OM.cat":"2",
        // "OM.cat":{"asd":"qwe"},// Category code
        "asdf":undefined,
        "qwer":null,
        "qwe":"qwe",
        "sdfgsd":123,
        "asdffv":true,
        "ff":false,
      }

      // optional
      const filters = [{
        attribute: RecommendationAttribute.PRODUCTNAME,
        filterType: RecommendationFilterType.like,
        value: 'laptop'
      }]
  
      const recommendations = await visilabsApi.getRecommendations(zoneId, productCode, properties)
      console.log('recommendations', recommendations)
    }
    catch (e) {
      console.log('recommendations error', e)
    }
  }

  const showMailSubscriptionForm = () => {
    visilabsApi.customEvent('*pragmamail*', {
      'OM.pv': '77',
      'OM.pn': 'Product',
      'OM.ppr': '39'
    })
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
      'OM.inapptype':'spinToWin'
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
      // 'OM.pv': '77',
      // 'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
      // 'OM.ppr': '39',
      'OM.inapptype':'scratchToWin'
    })
  }

  const halfScreenInapp = () => {
    visilabsApi.customEvent('home', {
      'OM.inapptype': 'halfscreen',
    })
  }

  const getPushMessages = async () => {
    const messages = await euroMessageApi.getPushMessages()
    console.log('messages', messages)
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
              actionId={'454'} // optional
              onItemClicked={(data) => {
                console.log('Story data', data)
              }}
              style={{ flex: 1 }}
            />
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
              title='SHOW MAIL FORM'
              onPress={() => {
                showMailSubscriptionForm()
              }}
            />

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
              title='SCRATCH TO WIN'
              onPress={() => {
                showScratchToWin()
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
