export var RelatedDigitalEventType;
(function (RelatedDigitalEventType) {
    RelatedDigitalEventType["login"] = "Login";
    RelatedDigitalEventType["loginWithExtraParameters"] = "Login with Extra Parameters";
    RelatedDigitalEventType["signUp"] = "Sign Up";
    RelatedDigitalEventType["pageView"] = "Page View";
    RelatedDigitalEventType["productView"] = "Product View";
    RelatedDigitalEventType["productAddToCart"] = "Product Add to Cart";
    RelatedDigitalEventType["productPurchase"] = "Product Purchase";
    RelatedDigitalEventType["productCategoryPageView"] = "Product Category Page View";
    RelatedDigitalEventType["inAppSearch"] = "In App Search";
    RelatedDigitalEventType["bannerClick"] = "Banner Click";
    RelatedDigitalEventType["addToFavorites"] = "Add to Favorites";
    RelatedDigitalEventType["removeFromFavorites"] = "Remove from Favorites";
    RelatedDigitalEventType["sendingCampaignParameters"] = "Sending Campaign Parameters";
    RelatedDigitalEventType["pushMessage"] = "Push Message";
    RelatedDigitalEventType["getExVisitorId"] = "Get exVisitor ID";
    RelatedDigitalEventType["logout"] = "Logout";
    RelatedDigitalEventType["requestIDFA"] = "Request IDFA";
    RelatedDigitalEventType["sendLocationPermission"] = "Send Location Permission";
})(RelatedDigitalEventType || (RelatedDigitalEventType = {}));
const getRandomNumber = (min, max, except) => {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    while (except && except.includes(num)) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
};
export const getRandomProductValues = () => {
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
    const genders = ['f', 'm'];
    const randomGender = genders[getRandomNumber(0, 1)];
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
export const formatPrice = (price) => {
    return price.toFixed(2);
};
