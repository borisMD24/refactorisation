class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  isMaxQuality(item){
    if(item.quality >= 50){return true}
    return false;
  }
  isMinQuality(item){
    if(item.quality <= 0){return true}
    return false;
  }
  updateQuality() {
    this.items.forEach(item =>  {
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.isMaxQuality(item)) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality--;
          }
        }
      } else {
        if (!this.isMaxQuality(item)) {
          item.quality++;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && 
              item.sellIn < 11) 
            {
              if (item.sellIn < 6) {
                item.quality += 3;
              } else {
                item.quality++;
              }
            }
          
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      } else if (item.sellIn < 0) {
        if (item.name != 'Aged Brie' &&
            item.name != 'Backstage passes to a TAFKAL80ETC concert' &&
            !this.isMinQuality(item) && 
            item.name != 'Sulfuras, Hand of Ragnaros') 
            {
              item.quality--;
            }
        } else if (!this.isMaxQuality(item)) {
            item.quality++;
        }
    })

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
