export enum RDInAppNotificationType {
  mini = 'mini',
  full = 'full',
  imageTextButton = 'image_text_button',
  fullImage = 'full_image',
  nps = 'nps',
  imageButton = 'image_button',
  smileRating = 'smile_rating',
  emailForm = 'subscription_email',
  alert = 'alert',
  halfScreenImage = 'half_screen_image',
  scratchToWin = 'scratch_to_win',
  secondNps = 'nps_with_secondpopup',
  inappcarousel = 'inappcarousel',
  spintowin = 'spintowin',
  productStatNotifier = 'product_stat_notifier',
  drawer = 'drawer',
  gamification = 'giftrain',
  findToWin = 'findtowin',
  video = 'video',
  downHsView = 'downHsView',
  shakeToWin = 'ShakeToWin',
  giftBox = 'giftBox',
  choosefavorite = 'Choosefavorite',
}

export const getInApps = (): Record<
  RDInAppNotificationType,
  Record<string, number>
> => {
  return {
    [RDInAppNotificationType.mini]: { [RDInAppNotificationType.mini]: 491 },
    [RDInAppNotificationType.full]: { [RDInAppNotificationType.full]: 485 },
    [RDInAppNotificationType.imageTextButton]: {
      [RDInAppNotificationType.imageTextButton]: 490,
    },
    [RDInAppNotificationType.fullImage]: {
      [RDInAppNotificationType.fullImage]: 495,
    },
    [RDInAppNotificationType.nps]: { [RDInAppNotificationType.nps]: 492 },
    [RDInAppNotificationType.imageButton]: {
      [RDInAppNotificationType.imageButton]: 489,
    },
    [RDInAppNotificationType.smileRating]: {
      [RDInAppNotificationType.smileRating]: 494,
    },
    [RDInAppNotificationType.emailForm]: {
      [RDInAppNotificationType.emailForm]: 417,
    },
    [RDInAppNotificationType.alert]: {
      alert_actionsheet: 487,
      alert_native: 540,
    },
    [RDInAppNotificationType.halfScreenImage]: {
      [RDInAppNotificationType.halfScreenImage]: 704,
    },
    [RDInAppNotificationType.scratchToWin]: {
      [RDInAppNotificationType.scratchToWin]: 592,
    },
    [RDInAppNotificationType.secondNps]: {
      'nps-image-text-button': 585,
      'nps-image-text-button-image': 586,
      'nps-feedback': 587,
    },
    [RDInAppNotificationType.inappcarousel]: {
      [RDInAppNotificationType.inappcarousel]: 927,
    },
    [RDInAppNotificationType.spintowin]: {
      [RDInAppNotificationType.spintowin]: 562,
    },
    [RDInAppNotificationType.productStatNotifier]: {
      [RDInAppNotificationType.productStatNotifier]: 703,
    },
    [RDInAppNotificationType.drawer]: { [RDInAppNotificationType.drawer]: 884 },
    [RDInAppNotificationType.downHsView]: {
      [RDInAppNotificationType.downHsView]: 238,
    },
    [RDInAppNotificationType.video]: { [RDInAppNotificationType.video]: 73 },
    [RDInAppNotificationType.gamification]: {
      [RDInAppNotificationType.gamification]: 131,
    },
    [RDInAppNotificationType.findToWin]: {
      [RDInAppNotificationType.findToWin]: 132,
    },
    [RDInAppNotificationType.shakeToWin]: {
      [RDInAppNotificationType.shakeToWin]: 255,
    },
    [RDInAppNotificationType.giftBox]: {
      [RDInAppNotificationType.giftBox]: 577,
    },
    [RDInAppNotificationType.choosefavorite]: {
      [RDInAppNotificationType.choosefavorite]: 1098,
    },
  };
};

export enum RelatedDigitalEventType {
  login = 'Login',
  loginWithExtraParameters = 'Login with Extra Parameters',
  signUp = 'Sign Up',
  pageView = 'Page View',
  productView = 'Product View',
  productAddToCart = 'Product Add to Cart',
  productPurchase = 'Product Purchase',
  productCategoryPageView = 'Product Category Page View',
  inAppSearch = 'In App Search',
  bannerClick = 'Banner Click',
  addToFavorites = 'Add to Favorites',
  removeFromFavorites = 'Remove from Favorites',
  sendingCampaignParameters = 'Sending Campaign Parameters',
  pushMessage = 'Push Message',
  getExVisitorId = 'Get exVisitor ID',
  logout = 'Logout',
  requestIDFA = 'Request IDFA',
  sendLocationPermission = 'Send Location Permission',
}

export interface RandomProduct {
  randomProductCode1: number;
  randomProductCode2: number;
  randomProductPrice1: number;
  randomProductPrice2: number;
  randomProductQuantity1: number;
  randomProductQuantity2: number;
  randomInventory: number;
  randomBasketID: number;
  randomOrderID: number;
  randomCategoryID: number;
  randomNumberOfSearchResults: number;
  randomBannerCode: number;
  genders: string[];
  randomGender: string;
}

const getRandomNumber = (
  min: number,
  max: number,
  except?: number[]
): number => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  while (except && except.includes(num)) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return num;
};

export const getRandomProductValues = (): RandomProduct => {
  const randomProductCode1 = getRandomNumber(1, 1000);
  const randomProductCode2 = getRandomNumber(1, 1000, [randomProductCode1]);
  const randomProductPrice1 = Math.random() * (10000 - 10) + 10;
  const randomProductPrice2 = Math.random() * (10000 - 10) + 10;
  const randomProductQuantity1 = getRandomNumber(1, 10);
  const randomProductQuantity2 = getRandomNumber(1, 10);
  const randomInventory = getRandomNumber(1, 100);
  const randomBasketID = getRandomNumber(1, 10000);
  const randomOrderID = getRandomNumber(1, 10000);
  const randomCategoryID = getRandomNumber(1, 100);
  const randomNumberOfSearchResults = getRandomNumber(1, 100);
  const randomBannerCode = getRandomNumber(1, 100);
  const genders: string[] = ['f', 'm'];
  const randomGender = genders[getRandomNumber(0, 1)]!;

  return {
    randomProductCode1,
    randomProductCode2,
    randomProductPrice1,
    randomProductPrice2,
    randomProductQuantity1,
    randomProductQuantity2,
    randomInventory,
    randomBasketID,
    randomOrderID,
    randomCategoryID,
    randomNumberOfSearchResults,
    randomBannerCode,
    genders,
    randomGender,
  };
};

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};
