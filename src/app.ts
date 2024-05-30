// Code goes here!
const names: Array<string> = []; //same as string[];
//names[0].split('')
//! Another generic type - Promise
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Done!');
//     }, 2000);
// });

// promise.then((data) => {
//     data.split('')
// });

function merge<T extends object, U extends object>(objA: T, objB: U): T & U{
    return Object.assign(objA, objB);
}

//console.log(merge({name:'Skyy', hobbies: ['music', 'reading']}, {age:28})); //{name: 'Skyy', hobbies: Array(2), age: 28}

//! The problem - 
const mergedObj = merge({name:'Skyy'}, {age:28});
//mergedObj.age; 🔴⚠️
//Soln. - Generics <>
//console.log(mergedObj.age, mergedObj.name); //28 'Skyy'

//! Another Generic fx()..
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
    let descTxt = `Got no value..`;
    if(element.length === 1){
        descTxt = `Got 1 element`;
    }else if(element.length>1){
        descTxt = `Got ${element.length} elements`;
    }else{
        descTxt = 'Got no value!';
    }
return [element, descTxt];
}

//console.log(countAndDescribe('Hi there!')); //(2) ['Hi there!', 'Got 9 elements']
//console.log(countAndDescribe(['Videospiel spielen', 'Deutsch lernen', 'Wandern gehen'])); //(2) [Array(3), 'Got 3 elements']
//console.log(countAndDescribe([])); //(2) [Array(0), 'Got no value!']

//The 'keyof' constraint

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Value: '+ obj[key];
}

//console.log(extractAndConvert({name:'Skyy', age:28}, 'name')); //Value: Skyy

//Generic Classes
class DataStorage<T extends string | number | boolean>{
    private data: T[]= [];
    addItem(item:T){
        this.data.push(item);
    }
    removeItem(item:T){
        if(this.data.indexOf(item)===-1){
            console.log(`${item} not found!`);
            return;
        }
        this.data.splice(this.data.indexOf(item),1);
    }
    getItems(){
        return [...this.data];
    }
}

//storage for text/string
const txtStorage = new DataStorage<string>();
txtStorage.addItem('Max');
txtStorage.addItem('Manu');
txtStorage.removeItem('Max');
//console.log(txtStorage.getItems()); //['Manu']

//storage for numbers
const numStorage = new DataStorage<number>();
numStorage.addItem(28);

//...Problem: Objects are reference types

// const objStorage = new DataStorage<object>();
// const skyyObj = {name: 'Skyy'};
// objStorage.addItem(skyyObj);
// objStorage.addItem({name: 'Banerjee'});

//...
// objStorage.removeItem(skyyObj);

//todo: Generic Utility Types
interface CourseGoal{
    title: string;
    desc: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    desc: string,
    date: Date,
): 
CourseGoal{
// return {title: title, desc: desc, completeUntil: date}
let courseGoal: Partial< CourseGoal> = {}; //Partial: Make all properties in T optional
courseGoal.title = title;
courseGoal.desc = desc;
courseGoal.completeUntil = date;
return courseGoal as CourseGoal;
}

//! Another builtin utility type
const people: Readonly<string[]> = ['Ash', 'Misty']; //Make all properties in T readonly
// ⚠️ people.push('Brock'); //Property 'push' does not exist on type 'readonly string[]'





