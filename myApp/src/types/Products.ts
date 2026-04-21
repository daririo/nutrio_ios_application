export interface Products {
  id: number
  name: string
  image_url: string
  macros: Macros
  micros: Micros
  vitamins: Vitamins
}

export interface Macros {
  kcal: number
  protein?: number
  fat?: number
  sugar?: number
  fiber?: number
}

export interface Micros {
  iron?: number
  zinc?: number
  magnesium?: number
  calcium?: number
  phosphorus?: number
  selenium?: number
}

export interface Vitamins {
  a?: number
  e?: number
  c?: number
  d?: number
  b1?: number
  b6?: number
  b12?: number
  omega3?: number
}

export type MicroKey = keyof Products['micros'];
export type VitaminKey = keyof Products['vitamins'];
export type NutrientKey = MicroKey | VitaminKey;