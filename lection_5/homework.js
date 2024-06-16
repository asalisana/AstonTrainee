//1.
const a = {b: 1},
    c = Object.create(a);

console.log(c.b); // 1
delete c.b;
console.log(c.b); // 1
delete a.b;
console.log(c.b); // undefined
a.z = 2;
console.log(c.z); // 2
c.z = 3;
console.log(a.z); // 2

// 2.

const promise = new Promise(() => {
})

console.log(promise.prototype === Promise.__proto__) // false

const obj = {}
console.log(obj.__proto__ === Object.prototype) // true

console.log(new Array([]).__proto__ === Array.prototype)// true

function Fn1 () {}
function Fn2 () {}

console.log(Fn1.constructor === Fn2.constructor) // true

console.log(Fn1.prototype === Fn2.prototype) // false
//3.

// У вас есть два конструктора, Animal и Bird.
// Каждый объект типа Bird должен наследовать метод speak от Animal.
// Однако, Bird также должен иметь свой собственный метод fly.

// Создайте функцию-конструктор Animal, который принимает параметр name и устанавливает его как свойство объекта.
// Добавьте метод speak в Animal, который выводит в консоль звук, издаваемый животным (например, "Some generic sound").
// Создайте конструктор Bird, который принимает параметр name и вызывает конструктор Animal с тем же именем.
// Добавьте метод fly в Bird, который выводит в консоль сообщение о том, что птица летит (например, "Flying high!").
// Создайте объекты animal и bird с использованием соответствующих конструкторов и вызовите их методы speak и fly.
// Решите задачу, используя прототипное наследование, чтобы Bird наследовал от Animal.

//функция-конструктор
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function (){
    console.log("Some generic sound")
}

function Bird(name){
    Animal.call(this, name)
}

Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.fly = function (){
    console.log("Flying high!")
}

let animal =  new Animal('Ruby')
let bird = new Bird('Jenny')

console.log(animal.name)
console.log(bird.name)
animal.speak()
bird.speak()
bird.fly()


//на классах
// class Animal{
//     constructor(name) {
//         this.name = name;
//     }
//     speak(){
//         console.log('something')
//     }
// }
//
// class Bird extends Animal{
//     constructor(name) {
//         super(name);
//     }
//     fly() {
//         console.log('fly high')
//     }
// }
//
// let animal = new Animal('Ruby');
// let bird = new Bird('Jenny')
//
// console.log(bird.name)
// console.log(animal.name)
// animal.speak()
// bird.speak()
// bird.fly()