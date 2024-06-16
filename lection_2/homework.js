//Как исправить "одни пятёрки"?

var result = [];
for (let i = 0; i < 5; i++) {
    result[i] = function () {
        console.log(i);
    };
}
result[0](); //5
result[1](); //5
result[2](); //5
result[3](); //5
result[4](); //5

//////////////////////////////////////////////////

function getGroup() {
    let students = [];
    let i = 0;
    while (i < 10) {
        let j = i;
        students[i] = function() {
            console.log(j);
        }
        i++
    }
    return students;
}

let group = getGroup();

group[0](); // 10 как исправить на 0
group[5](); // 10                  5

//////////////////////////////////////////////////

// Напишите функцию multiply, должна принимать произвольное количество аргументов и возвращать их произведение.

function multiply(x) {
    let result = x;
    return function inner(y) {
        if (typeof y !== 'undefined'){
            result *= y;
            return multiply(result);
        } else {
            return result;
        }
    }
}

const result1 = multiply(2)(3)(4)();
console.log(result1); // Вывод: 24

/////////////////////////

// Написать функцию getUniqArray(arr), которая на вход принимает массив чисел и
// возвращает массив уникальных чисел.
//     Если аргумент arr состоит не из чисел, тогда функция должна выбросить ошибку.
//     Текст ошибки: "В getUniqArray был передан невалидный параметр. Аргумент arr
// должен быть массивом чисел".
function  getUniqArray(arr){
    if(arr.every(item => typeof item === 'number' || isNaN(item))){
        return Array.from(new Set(arr))
    } else return "В getUniqArray был передан невалидный параметр. Аргумент arr должен быть массивом чисел"
}

console.log(getUniqArray([1,2,3,3,4,4,5,5,5,6,10]))
console.log(getUniqArray([1,2,3,3,4,4,5,5,5,6,10, 'a']))
