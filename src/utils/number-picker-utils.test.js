import { getRandomNumber, buildArrayOfRandomNumbers } from "./number-picker-utils"

describe('Testing the method that generates a random number', () => {
    it('should return a number that is greater than 1 and less than or equal to 75', () => {
        const number = getRandomNumber()
        expect(number).toBeGreaterThan(0)
        expect(number).toBeLessThan(76)
    })
})
describe('Testing the method that builds an array of random numbers', () => {
    const arrayFiveByFive = buildArrayOfRandomNumbers(5)
    const arrayThreeByThree = buildArrayOfRandomNumbers(3)
    it('should return an array with length of the argument squared ', () => {
        expect(arrayFiveByFive).toHaveLength(25)
        expect(arrayThreeByThree).toHaveLength(9)
    })
    it('should be comprised of numbers that are each between 1 and 75', () => {
        expect(arrayFiveByFive[13]).toBeGreaterThan(0)
        expect(arrayFiveByFive.every(number => number > 0)).toBeTruthy()
        expect(arrayFiveByFive[8]).toBeLessThan(75)
        expect(arrayFiveByFive.every(number => number < 76)).toBeTruthy()
    })
})