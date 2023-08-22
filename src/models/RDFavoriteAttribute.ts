export enum RDFavoriteAttribute {
  ageGroup = 'ageGroup',
  attr1 = 'attr1',
  attr2 = 'attr2',
  attr3 = 'attr3',
  attr4 = 'attr4',
  attr5 = 'attr5',
  attr6 = 'attr6',
  attr7 = 'attr7',
  attr8 = 'attr8',
  attr9 = 'attr9',
  attr10 = 'attr10',
  brand = 'brand',
  category = 'category',
  color = 'color',
  gender = 'gender',
  material = 'material',
  title = 'title',
}

export interface RDFavoriteAttributeActionResponse {
  favorites: Record<RDFavoriteAttribute, string[]>;
}
