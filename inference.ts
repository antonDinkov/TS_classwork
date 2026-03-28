const user = {
    name: "Alice",
    age: 30,
    isAdmin: true,
};
user.name = 23; // Error: Type 'number' is not assignable to type 'string'.
console.log(user.name, user.isAdmin); //TypeScript knows that user.name is a string and user.isAdmin is a boolean, so it can provide type checking and autocompletion for these properties.
console.log(user.email); // Error: Property 'email' does not exist on type '{ name: string; age: number; isAdmin: boolean; }'. 