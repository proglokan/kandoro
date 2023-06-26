'use strict';
class Animal {
	readonly name: string;
	readonly toy: string;

	constructor(name: string, toy: string) {
		this.name = name;
		this.toy = toy;
	}

	speak(): void {
		console.log(`${this.name} makes a sound.`);
	}
}

class Dog extends Animal {
	private breed: string;
	constructor(name: string, toy: string, breed: string) {
		super(name, toy);
		this.breed = breed;
	}

	fetch(): void {
		console.log(`${this.name}, the ${this.breed} fetches a ${this.toy}.`);
	}
}
const dog: Dog = new Dog('Buddy', 'ball', 'Labrador');
dog.speak();
dog.fetch(); 
