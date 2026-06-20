import type { MenuItemKey } from "@/lib/i18n/menu-item-keys"

export type MenuDataEntry = {
  key: MenuItemKey
  price: number
}

export const breakfastItemsData: MenuDataEntry[] = [
  { key: "classicFullEnglish", price: 7.5 },
  { key: "sharkAttack", price: 10 },
  { key: "veggieBreakfast", price: 8 },
  { key: "breakfastBurrito", price: 7.5 },
  { key: "breakfastButty", price: 4 },
  { key: "scrambledEggOnToast", price: 6 },
  { key: "mixedToastie", price: 4 },
]

export const breakfastDrinksData: MenuDataEntry[] = [
  { key: "whiteCoffee", price: 3 },
  { key: "americanoBreakfast", price: 3 },
  { key: "cappuccinoBreakfast", price: 3 },
  { key: "teaBreakfast", price: 3 },
  { key: "latteBreakfast", price: 3 },
  { key: "hotChocolateBreakfast", price: 4 },
  { key: "icedCoffee", price: 5.5 },
  { key: "freshOrangeJuice", price: 4.5 },
  { key: "fruitJuices", price: 3.5 },
  { key: "water", price: 2 },
  { key: "sparklingWater", price: 2.5 },
  { key: "softDrinksMix", price: 2.5 },
]

export const cocktailsData: MenuDataEntry[] = [
  { key: "sexOnTheBeach", price: 9 },
  { key: "sharksLagoon", price: 9 },
  { key: "pinaColada", price: 9 },
  { key: "tequilaSunrise", price: 9 },
  { key: "cosmopolitan", price: 9 },
  { key: "brandyAlexander", price: 9 },
  { key: "bloodyMary", price: 9 },
  { key: "caipirinha", price: 9 },
  { key: "aperolSpritz", price: 9 },
  { key: "wooWoo", price: 9 },
  { key: "espressoMartini", price: 9 },
  { key: "strawberryDaiquiri", price: 9.5 },
  { key: "strawberryMojito", price: 9.5 },
  { key: "mojito", price: 9.5 },
  { key: "longIslandIcedTea", price: 10 },
]

export const kidsCocktailsData: MenuDataEntry[] = [
  { key: "bubbleBlast", price: 6 },
  { key: "underTheSea", price: 6 },
  { key: "sharkysSunrise", price: 6 },
]

export const milkshakesData: MenuDataEntry[] = [{ key: "milkshakeFlavours", price: 6 }]

export const shotsData: MenuDataEntry[] = [
  { key: "flavouredSours", price: 3.5 },
  { key: "tequilaShot", price: 3.5 },
  { key: "sambuca", price: 3.5 },
  { key: "babyGuinness", price: 3.5 },
  { key: "jagerBomb", price: 4.5 },
]

export const wineItemsData: MenuDataEntry[] = [
  { key: "glassHouseWine", price: 3.8 },
  { key: "bottleWine", price: 18 },
  { key: "glassSangria", price: 4.5 },
  { key: "jugSangria", price: 17 },
  { key: "bottleProsecco", price: 20 },
  { key: "bottleChampagne", price: 30 },
  { key: "porto", price: 4 },
]

export const spiritsData: MenuDataEntry[] = [
  { key: "gordonsGin", price: 5.5 },
  { key: "pinkGordonsGin", price: 6 },
  { key: "beefeaterGin", price: 6.5 },
  { key: "tanquerayGin", price: 6.5 },
  { key: "bombayGin", price: 6.5 },
  { key: "smirnoffVodka", price: 5 },
  { key: "bacardi", price: 5.5 },
  { key: "captainMorgans", price: 5.5 },
  { key: "malibu", price: 5 },
  { key: "baileys", price: 7 },
  { key: "tiaMaria", price: 5.5 },
  { key: "pimms", price: 5.5 },
  { key: "amaretto", price: 5.5 },
  { key: "cointreau", price: 6.5 },
  { key: "licorBeirao", price: 5 },
  { key: "martiniSpirit", price: 5 },
]

export const whiskeysData: MenuDataEntry[] = [
  { key: "jb", price: 5 },
  { key: "williamLawson", price: 5.5 },
  { key: "famousGrouse", price: 5.5 },
  { key: "jameson", price: 5.5 },
  { key: "jackDaniels", price: 5.5 },
  { key: "southernComfort", price: 5.5 },
  { key: "canadianClub", price: 5.5 },
  { key: "glenfiddich", price: 8 },
  { key: "cardu", price: 8 },
  { key: "macieira", price: 5 },
  { key: "drambuie", price: 7 },
  { key: "hennessy", price: 7 },
]

export const draughtLagerData: MenuDataEntry[] = [
  { key: "largeSuperBock", price: 3.8 },
  { key: "smallSuperBock", price: 2 },
  { key: "largeCarlsberg", price: 4 },
  { key: "smallCarlsberg", price: 2 },
]

export const bottlesAndCansData: MenuDataEntry[] = [
  { key: "nonAlcoholicBeer", price: 4 },
  { key: "superBockBottle", price: 3.5 },
  { key: "sagres", price: 3.5 },
  { key: "peroni", price: 5.5 },
  { key: "coors", price: 5 },
  { key: "corona", price: 5 },
  { key: "somersby", price: 5 },
  { key: "kopparberg", price: 6 },
  { key: "magners", price: 7 },
  { key: "strongbow", price: 6 },
  { key: "guinness", price: 6 },
  { key: "smirnoffIce", price: 5.5 },
  { key: "blueWkd", price: 5.5 },
]

export const softDrinksData: MenuDataEntry[] = [
  { key: "colaMix", price: 2.5 },
  { key: "redBull", price: 4 },
  { key: "juices", price: 3.5 },
  { key: "waterSoft", price: 2 },
  { key: "sparklingWaterSoft", price: 2.5 },
  { key: "tonicWater", price: 2.5 },
  { key: "gingerAle", price: 2.5 },
]

export const hotDrinksData: MenuDataEntry[] = [
  { key: "espresso", price: 1.5 },
  { key: "coffeeWithMilk", price: 3 },
  { key: "americanoHot", price: 3 },
  { key: "cappuccinoHot", price: 3 },
  { key: "cafeLatte", price: 3 },
  { key: "teaHot", price: 3 },
  { key: "hotChocolateHot", price: 4 },
  { key: "irishCoffee", price: 6 },
  { key: "iceCoffee", price: 4 },
]
