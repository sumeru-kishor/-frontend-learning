// Practice 1: Arrow Functions

const greetUser = (name) => {
  return `Hello, ${name}!`;
};

console.log(greetUser("Sumeru"));


// Practice 2: Destructuring

const user = {
  name: "sri",
  age: 25,
  role: "Developer"
};

const { name, role } = user;

console.log(name);
console.log(role);


// Practice 3: Array Methods (map, filter)

const numbers = [1, 2, 3, 4, 5];

// map -> create new array
const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers);

// filter -> select based on condition
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);


// Practice 4: Reduce (sum of numbers)

const total = numbers.reduce((acc, current) => acc + current, 0);
console.log(total);
