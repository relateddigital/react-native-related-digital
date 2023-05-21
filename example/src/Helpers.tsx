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
