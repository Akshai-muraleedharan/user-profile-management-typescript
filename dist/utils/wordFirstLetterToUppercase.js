"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstLetterToUpperCase = void 0;
const firstLetterToUpperCase = (str) => {
    const letterToUppercase = str[0].toUpperCase() + str.substring(1);
    return letterToUppercase;
};
exports.firstLetterToUpperCase = firstLetterToUpperCase;
