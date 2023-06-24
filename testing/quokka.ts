'use strict';
class Test {
	private _num: number;
	private _str: string;

	constructor(num: number, str: string) {
		this._num = num;
		this._str = str;
	}

	logParams() {
		console.log(this._num, this._str);
	}

}
