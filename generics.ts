//generics are a powerful feature in TypeScript that allow you to create reusable components and functions that can work with a variety of types. They enable you to write code that is flexible and type-safe, while still maintaining the benefits of static typing. Generics can be used with classes, interfaces, functions, and even type aliases. By using generics, you can create data structures and algorithms that can operate on any type, without sacrificing type safety or code readability.

class Queue<T> {
  private items: T[] = [];
  enqueue(item: T) {
    this.items.push(item);
  }
  dequeue(): T | undefined {
    return this.items.shift();
  }
}
const q = new Queue<string>();
q.enqueue("apple");
q.enqueue("banana");
console.log(q.dequeue());
// apple
console.log(q.dequeue());
// banana
q.enqueue(100); // Error