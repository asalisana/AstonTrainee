// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
console.log('1');
setTimeout(() => console.log('2'), 1);
let promiseNew = new Promise((resolve) => {
    console.log('3');
    resolve();
});
promiseNew.then(() => console.log('4'));
setTimeout(() => console.log('5'));
console.log('6');

//1
//3
//6
//4
//2
//5
//////////////////////////////
// 2)
let promiseTree = new Promise((resolve, reject) => {
    resolve("a");
    console.log("1");
    setTimeout(() => {
        console.log("2");
    }, 0);
    console.log("3");
});

//1
//3
//2

/////////////////////////
// 3)
let promiseTwo = new Promise((resolve, reject) => {
    resolve("a");
});
promiseTwo
    .then((res) => {
        return res + "b";
    })
    .then((res) => {
        return res + "с";
    })
    .finally((res) => {
        return res + "!!!!!!!";
    })
    .catch((res) => {
        return res + "d";
    })
    .then((res) => {
        console.log(res);
    });

//abc
/////////////////////////////
// 4)
function doSmth() {
    return Promise.resolve("123");
}
doSmth()
    .then(function (a) {
        console.log("1", a); //
        return a;
    })
    .then(function (b) {
        console.log("2", b);
        return Promise.reject("321");
    })
    .catch(function (err) {
        console.log("3", err);
    })
    .then(function (c) {
        console.log("4", c);
        return c;
    });

//1, 123
//2, 123
//3, 321
//4, undefined
///////////////////////////
// 5)
console.log("1");
setTimeout(function () {
    console.log("2");
}, 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

//1
//4
//3
//2
////////////////////////////
//7)
async function a() {
  console.log("a");
}

console.log("1");

(async function () {
  console.log("f1");
  await a();
  console.log("f2");
})();
console.log("2");

//1
//f1
//a
//2
//f2

////////////////////////////////
//8)
console.log(1);

setTimeout(() => console.log(2));

async function func() {
  console.log(3);

  await new Promise((resolve) => {
    console.log(4);
    resolve();
    console.log(5);
  })
    .then(() => console.log(6))
    .then(() => console.log(7));

  console.log(8);
}

setTimeout(() => console.log(9));

func();

console.log(10);

// 1
// 3
// 4
// 5
// 10
// 6
// 7
// 8
// 2
// 9


///////////////////////////////////
// 9)*
function foo(callback) {
    setTimeout(() => {
        callback('A');
    }, Math.random() * 100);
}
function bar(callback) {
    setTimeout(() => {
        callback('B');
    }, Math.random() * 100);
}
function baz(callback) {
    setTimeout(() => {
        callback('C');
    }, Math.random() * 100);
}

function fooPromise(){
    return new Promise(resolve => {
       foo(arg => {
           console.log(arg);
           resolve()
       })
    })
}
function barPromise(){
    return new Promise(resolve => {
        bar(arg => {
            console.log(arg);
            resolve()
        })
    })
}
function bazPromise(){
    return new Promise(resolve => {
        baz(arg => {
            console.log(arg);
            resolve()
        })
    })
}

Promise.resolve().then(fooPromise).then(barPromise).then(bazPromise)


///////////////
// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
// function resolveAfter2Seconds(x) {
//     console.log(`Какой Х пришёл -> ${x}`)
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x); //
//         }, 5000);
//     });
// }
// async function add1(x) {
//     console.log('add1 Hello')
//     const a = await resolveAfter2Seconds(20);
//     const b = await resolveAfter2Seconds(30);
//     console.log('add1 Bye')
//     return x + a + b;
// }
//
// add1(10).then(console.log)

//'add1 Hello' - синхронный код
//`Какой Х пришёл -> 20`(синхронный код), затем ждем резолв промиса (ждем из-за await)
//`Какой Х пришёл -> 30`, (синхронный код), затем ждем резолв промиса (ждем из-за await)
//'add1 Bye' - синхронный код
//60 - синхронный код
//Мы ждём выполнения setTimeout, потому что каждый вызов await приостанавливает выполнение функции add1 до тех пор, пока соответствующий промис не будет резолвлен, и только после этого продолжается выполнение кода
function resolveAfter2Seconds(x) {
    console.log(`Какой Х пришёл -> ${x}`)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x); //
        }, 5000);
    });
}


async function add1(x) {
    console.log('add1 Hello')
    let a;
    return Promise.resolve(resolveAfter2Seconds(20)).then((result) => {
        a = result
        return Promise.resolve(resolveAfter2Seconds(30)).then(result2 => {
            console.log('add1 Bye')
            return a + result2 + x
        })
    });
}

add1(10).then(console.log)
