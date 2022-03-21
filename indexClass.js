class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable (currentAvailable) {
        this.available = currentAvailable;
    }
}

class GoodsList {
    #goods = new Array();
    constructor (filter, sortPrice, sortDir) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() {
        let filterName = new RegExp(`${this.filter}`, 'iu');
        let listFilter = this.#goods.filter(good => filterName.test(good.name));
        if (this.sortPrice == true && this.sortDir == false) {
            let priceSortDown = listFilter.sort((a, b) => Number(a.price) - Number(b.price));
            return priceSortDown.filter((good) => good.available == true);
        }
        else if (this.sortPrice == true && this.sortDir == true) {
            let priceSortUp = listFilter.sort((a, b) => Number(b.price) - Number(a.price));
            return priceSortUp.filter((good) => good.available == true);
        }
        
    }
    add (good) {
        return this.#goods.push(good);
    }
    remove(goodId) {
        for(let i = 0; i < this.#goods.length; i++) {
            if(goodId == this.#goods[i].id) {
                let namegood = this.#goods[i].name;
                this.#goods.splice(i, 1);
                return `Товар ${namegood} удален`;
            };
        };
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
    this.goods = new Array();
    }
    get totalAmount() {
        let countGoods = 0;
        for(let i = 0; i < this.goods.length; i++) {
            countGoods = countGoods + this.goods[i].amount;
            return countGoods;
        }
    }
    get totalSum() {
        let summa = 0;
        for(let i = 0; i < this.goods.length; i++) {
            summa = summa + (this.goods[i].amount * this.goods[i].price);
            return summa;
        }
    }
    add(good, amount) {
        for (let i=0; i < this.goods.length; i++) {
            if (good.name == this.goods[i].name) { 
                this.goods[i].amount = this.goods[i].amount + amount;
                return 'ок'
            }
        }
        let basketGood = new BasketGood(good, amount);
        this.goods.push(basketGood);
    }
    remove(good, amount) {
        for (let i=0; i < this.goods.length; i++) {
            if (good.name == this.goods[i].name) { 
                this.goods[i].amount = this.goods[i].amount - amount;
                if (this.goods[i].amount <= 0) {
                    this.goods.splice(i, 1);
                }
            }
        }
    }
    clear() {
        this.goods.length = 0;
    }
    removeUnavailable() {
        let falseList = this.goods.filter((good) => good.available === false);
        for (let i=0; i<falseList.length; i++) {
            for(let j=0; j<this.goods.length; j++) {
                if (this.goods[j].name == falseList[i].name) {
                this.goods.splice(j, 1);
                }
            }
        }
    }
}

const good1 = new Good (1, 'рубашка', 'синий', '48', '100', true);
const good2 = new Good (2, 'брюки', 'черный', '52', '150', true);
const good3 = new Good (3, 'футболка', 'зеленый', '50', '70', true);
const good4 = new Good (4, 'штаны', 'черный', '48', '60', true);
const good5 = new Good (5, 'кепка', 'красный', '52', '80', true);

good1.setAvailable(false);
good5.setAvailable(false);

const list1 = new GoodsList('к', true, true);
list1.add(good1);
list1.add(good2);
list1.add(good3);
list1.add(good4);
list1.add(good5);
console.log (list1.list);

const list2 = new GoodsList('к', true, false);
list2.add(good1);
list2.add(good2);
list2.add(good3);
list2.add(good4);
list2.add(good5);
console.log (list2.list);

list1.remove(4);

let basket1 = new Basket();
basket1.add(good1, 5);
basket1.add(good1, 3);
basket1.add(good2, 4);
basket1.add(good5, 9);
basket1.remove(good1, 8);
basket1.add(good3, 5);
basket1.removeUnavailable();
console.log(basket1.totalAmount);
console.log(basket1.totalSum);
basket1.clear();