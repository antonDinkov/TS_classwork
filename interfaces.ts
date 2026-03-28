// interfaces are used to define the structure of an object. They can be used to define the shape of an object, including the properties and their types. Interfaces can also be used to define the structure of a class, including the methods and their signatures.
// they can be extended to create new interfaces that inherit the properties and methods of the parent interface. This allows for code reuse and helps to keep the code organized and maintainable. Interfaces can also be used to define the structure of a function, including the parameters and their types, as well as the return type.    
interface IStudent {
 name: string;
 grades: number[];
}
interface IStudentWithGrade extends IStudent {
 avgGrade: number;
}
let ann: IStudent = {name:"Ann", grades:[5, 6]};
console.log(ann);
let bob: IStudentWithGrade = {name:"Bob", grades:[6, 6, 5], avgGrade:5.67};
console.log(bob);