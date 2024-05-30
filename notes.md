#### Intro: Creating a Generic fx()
A generic type is a type which is kinda connected to some other type and is real1ly flexible regarding which exact type the other type is.
Generics help us create data structures that work together or wrap values of a broad variety of types (e.g. an array that can hold any type of data).
```ts
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
//     data.split('');
// });

function merge(objA:object, objB:object):object{
    return Object.assign(objA, objB);
}

console.log(merge({name:'Skyy'}, {age:28})); //{name: 'Skyy', age: 28}

//! The problem - 
const mergedObj = merge({name:'Skyy'}, {age:28});
//mergedObj.age; 🔴⚠️

//The Solution: Generics
function merge<T extends object, U extends object>(objA: T, objB: U): T & U{
    return Object.assign(objA, objB);
}

console.log(merge({name:'Skyy', hobbies: ['music', 'reading']}, {age:28})); //{name: 'Skyy', hobbies: Array(2), age: 28}

console.log(mergedObj.age, mergedObj.name); //28 'Skyy'
//We can use any type we want, even custom types
```
#### Another Generic fx()
```ts
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

console.log(countAndDescribe('Hi there!')); //(2) ['Hi there!', 'Got 9 elements']
console.log(countAndDescribe(['Videospiel spielen', 'Deutsch lernen', 'Wandern gehen'])); //(2) [Array(3), 'Got 3 elements']
console.log(countAndDescribe([])); //(2) [Array(0), 'Got no value!']
```
#### The 'keyof' Constraint
##### Explanation of `keyof`

In TypeScript, `keyof` is a type operator that takes an object type and produces a union type of its keys. It allows you to create a type that represents the keys of an object. This is useful when you want to create a function or a class that works with properties of objects in a type-safe manner.

#### Your Function: `extractAndConvert`
```typescript
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'Skyy', age: 28}, 'name')); // Value: Skyy
```

##### Breakdown:

1. **Generics with Constraints:**
   ```typescript
   function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U)
   ```
   - `T extends object`: The generic type `T` is constrained to be an object. This means `T` can only be an object type.
   - `U extends keyof T`: The generic type `U` is constrained to be a key of the object type `T`. This ensures that `U` is one of the keys of `T`.

2. **Parameters and Return Type:**
   ```typescript
   (obj: T, key: U)
   ```
   - `obj: T`: The parameter `obj` is of type `T`, which must be an object.
   - `key: U`: The parameter `key` is of type `U`, which must be one of the keys of `obj`.

3. **Accessing the Property:**
   ```typescript
   return 'Value: ' + obj[key];
   ```
   - `obj[key]`: This accesses the property of `obj` with the key `key`. Since `key` is guaranteed to be a valid key of `obj`, this access is type-safe.

4. **Usage:**
   ```typescript
   console.log(extractAndConvert({name: 'Skyy', age: 28}, 'name')); // Value: Skyy
   ```
   - `{name: 'Skyy', age: 28}` is passed as `obj`.
   - `'name'` is passed as `key`.
   - The function accesses the `name` property of the object and returns `'Value: ' + obj['name']`, which is `'Value: Skyy'`.

##### `keyof` Example

To illustrate further, let's look at a simple example:

```typescript
type Person = {
    name: string;
    age: number;
};

type PersonKeys = keyof Person; // "name" | "age"

let key: PersonKeys;

key = "name"; // valid
key = "age";  // valid
key = "address"; // error, "address" is not a key of Person
```

In this example:
- `keyof Person` creates a union type of the keys of the `Person` type, which is `"name" | "age"`.
- The variable `key` can be either `"name"` or `"age"` but not `"address"` or any other string.

#### Why `keyof` is Useful

Using `keyof` in your function ensures that the key passed to `extractAndConvert` is always a valid key of the object, making the function type-safe and preventing runtime errors due to accessing non-existent properties.

#### Summary

- `keyof` is a type operator that generates a union type of the keys of an object type.
- In `extractAndConvert<T, U extends keyof T>`, it ensures that `U` is a key of `T`.
- This allows type-safe access to properties of objects based on dynamic keys.

This is a powerful feature in TypeScript that helps to maintain type safety and avoid common errors when working with object properties.
#### Generic Classes
```ts
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
console.log(txtStorage.getItems()); //['Manu']

//storage for numbers
const numStorage = new DataStorage<number>();
numStorage.addItem(28);

//...Problem: Objects are reference types

// const objStorage = new DataStorage<object>();
// const skyyObj = {name: 'Skyy'};
// objStorage.addItem(skyyObj);
// objStorage.addItem({name: 'Banerjee'});

// //...
// objStorage.removeItem(skyyObj);
```
#### Generic Utility Types
```ts
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
```
## Generic Types VS Union Types
Sure, let's dive into the differences between generic types and union types in TypeScript, along with code examples and explanations.

### Generic Types

Generics provide a way to create reusable components that work with a variety of types while maintaining strong type safety. Generics are like placeholders for types that you specify when you use the generic component.

#### Example: Generic Function

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let numberValue = identity<number>(10);  // T is number
let stringValue = identity<string>("hello");  // T is string
```

**Explanation:**
- `function identity<T>(arg: T): T`: Here, `T` is a generic type parameter. The function `identity` takes an argument of type `T` and returns a value of type `T`.
- When calling `identity`, you can specify the type for `T` (`number` and `string` in the examples), and TypeScript ensures that the argument and return type match this type.

#### Example: Generic Class

```typescript
class Box<T> {
    contents: T;
    constructor(value: T) {
        this.contents = value;
    }
}

let numberBox = new Box<number>(100);  // Box<number>
let stringBox = new Box<string>("Hello");  // Box<string>
```

**Explanation:**
- `class Box<T>`: Here, `T` is a generic type parameter for the class `Box`.
- The property `contents` and the constructor parameter are both of type `T`.
- When creating instances of `Box`, you specify the type for `T` (`number` and `string`), and TypeScript ensures that `contents` holds a value of this type.

### Union Types

Union types allow you to specify that a value can be one of several types. They are useful for defining variables, function parameters, or return types that can hold multiple types of values.

#### Example: Union Type Function Parameter

```typescript
function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return `String: ${value}`;
    } else {
        return `Number: ${value}`;
    }
}

console.log(formatValue("hello"));  // String: hello
console.log(formatValue(42));  // Number: 42
```

**Explanation:**
- `value: string | number`: The parameter `value` can be either a `string` or a `number`.
- The function handles both types by checking the type of `value` using `typeof`.

#### Example: Union Type Variable

```typescript
let mixedValue: string | number;
mixedValue = "hello";  // valid
mixedValue = 42;  // valid
mixedValue = true;  // error: Type 'boolean' is not assignable to type 'string | number'
```

**Explanation:**
- `mixedValue: string | number`: The variable `mixedValue` can hold either a `string` or a `number`.
- Assigning a `boolean` to `mixedValue` results in an error, as it is not part of the union type.

### Key Differences

1. **Purpose and Use Cases:**
   - **Generics**: Used for creating reusable, type-safe components (functions, classes, interfaces) that work with various types specified by the user.
   - **Union Types**: Used for specifying that a value can be one of several predefined types, useful for handling multiple types in a single variable or function parameter.

2. **Type Safety:**
   - **Generics**: Provide type safety by allowing the user to define the exact type to be used, ensuring consistent use of this type throughout the component.
   - **Union Types**: Provide type safety by enforcing that a value must be one of the specified types, ensuring proper handling of each type.

3. **Flexibility:**
   - **Generics**: More flexible in defining components that can work with any type provided by the user.
   - **Union Types**: Less flexible, as they are limited to the predefined types specified in the union.

### Combining Generics and Union Types

You can combine generics and union types to create more complex and flexible type definitions.

#### Example: Generic Function with Union Types

```typescript
function getLength<T extends string | any[]>(input: T): number {
    return input.length;
}

console.log(getLength("hello"));  // 5
console.log(getLength([1, 2, 3]));  // 3
```

**Explanation:**
- `T extends string | any[]`: The generic type `T` is constrained to be either a `string` or an array.
- The function `getLength` works with both strings and arrays, returning their length.

By combining generics and union types, you can create versatile, type-safe components that handle a wide range of use cases.