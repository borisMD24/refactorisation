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
  manageSpecialItem(item){
    let unvalueFactor = 1;
    if(item.name.toUpperCase().includes('CONJURED'))
      unvalueFactor *= 2;
    if (!this.isMaxQuality(item)) {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.quality -= unvalueFactor;
      }
    }
    return item;
  }
  manageNonSpecialItem(item){
    if (!this.isMaxQuality(item)) {
      item.quality++;
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 11) {
          if (!this.isMaxQuality(item)) {
            item.quality++;
          }
        }
        if (item.sellIn < 6 && !this.isMaxQuality(item)) {
          item.quality++;
        }
      }
    }
    return item;
  }
  manageNegativeSellin(item){
    if (item.name != 'Aged Brie') {
      if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (!this.isMinQuality(item)) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality++;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else if (!this.isMaxQuality(item)) {
        item.quality++;
    }
    return item;
  }
  updateQuality() {
    this.items.forEach(item =>{
      if (item.name != 'Aged Brie' && 
          item.name != 'Backstage passes to a TAFKAL80ETC concert') 
      {
        item = this.manageSpecialItem(item);
      } else {
       item = this.manageNonSpecialItem(item)
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      }
      if (item.sellIn < 0) {
        item = this.manageNegativeSellin(item);
      }
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
