//aliases types are a way to create a new name for an existing type. They can be used to simplify complex types, improve code readability, and provide more meaningful names for types. Aliases can be used with primitive types, union types, intersection types, and even other aliases.

type ID = string | number;
type Name = string;
type Age = number;
type User = {
 id: ID;
 name: Name;
 age: Age;
};
let u: User = { id: 1, name: "Dave Parker", age: 21};
console.log(`User: ID: ${u.id}, ${u.name}, Age: ${u.age}`);
