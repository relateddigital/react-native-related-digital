export enum RDProductFilterAttribute {
  PRODUCTCODE = 'PRODUCTCODE',
  PRODUCTNAME = 'PRODUCTNAME',
  COLOR = 'COLOR',
  AGEGROUP = 'AGEGROUP',
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  GENDER = 'GENDER',
  MATERIAL = 'MATERIAL',
  ATTRIBUTE1 = 'ATTRIBUTE1',
  ATTRIBUTE2 = 'ATTRIBUTE2',
  ATTRIBUTE3 = 'ATTRIBUTE3',
  ATTRIBUTE4 = 'ATTRIBUTE4',
  ATTRIBUTE5 = 'ATTRIBUTE5',
  SHIPPINGONSAMEDAY = 'SHIPPINGONSAMEDAY',
  FREESHIPPING = 'FREESHIPPING',
  ISDISCOUNTED = 'ISDISCOUNTED',
}

export enum RDRecommendationFilterType {
  equals = 0,
  notEquals = 1,
  like = 2,
  notLike = 3,
  greaterThan = 4,
  lessThan = 5,
  greaterOrEquals = 6,
  lessOrEquals = 7,
  include = 2,
  exclude = 3,
}

export interface RDRecommendationFilter {
  attribute: RDProductFilterAttribute;
  filterType: RDRecommendationFilterType;
  value: String;
}

export interface RDProduct {
  code: string;
  title: string;
  img: string;
  destUrl: string;
  brand: string;
  price: number;
  dprice: number;
  cur: string;
  dcur: string;
  freeshipping: boolean;
  samedayshipping: boolean;
  rating: number;
  comment: number;
  discount: number;
  attr1: string;
  attr2: string;
  attr3: string;
  attr4: string;
  attr5: string;
  attr6: string;
  attr7: string;
  attr8: string;
  attr9: string;
  attr10: string;
  qs: string;
}

export interface RDRecommendationResponse {
  products: RDProduct[];
  widgetTitle: string;
}
