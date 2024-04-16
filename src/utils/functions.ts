/* eslint-disable no-inner-declarations */
import { DATA_USER } from "./globalVariables";

const sleepTemporary = function (ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const generateRandomNumber = (min: number = 1500, max: number = 2500): number => {
    if (min >= max) {
        throw new Error('El valor mínimo debe ser menor que el valor máximo');
    }

    const random = Math.random();
    const randomNumber = Math.round(random * (max - min) + min);

    return randomNumber;
}



export {
    sleepTemporary,
    generateRandomNumber
};