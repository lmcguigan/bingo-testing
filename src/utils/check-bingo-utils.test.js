import { BingoValidator } from "./check-bingo-utils"

//vertical === | 
//horizontal === ----
describe('Testing methods that build line indexes for comparison', () => {
    const validator = new BingoValidator(5)
    describe("Testing the methods that build single lines", () => {
        it('should build a vertical line as multiples of n plus the index passed in as the second param', () => {
            const firstVerticalLine = validator.getVerticalLine(5, 0)
            expect(firstVerticalLine).toEqual([0, 5, 10, 15, 20])
            expect(firstVerticalLine.every(value => value % 5 === 0)).toBeTruthy()
            expect(validator.getVerticalLine(5, 1)).toEqual([1, 6, 11, 16, 21])
            expect(validator.getVerticalLine(3, 0)).toEqual([0, 3, 6])
        })
        it('should build a horizontal line as a range between (0 + a multiple of n) and (a multiple of n) minus 1', () => {
            expect(validator.getHorizontalLine(5, 0)).toEqual([0, 1, 2, 3, 4])
            expect(validator.getHorizontalLine(5, 5)).toEqual([5, 6, 7, 8, 9])
        })
        
    })
    describe('Testing the methods that build arrays of lines', () => {
        it('should build an array of n correct vertical line arrays, each with length n', () => {
            const verticalLines = validator.getVerticalLines(5)
            expect(verticalLines).toHaveLength(5)
            expect(verticalLines.every((line) => line.length === 5)).toBeTruthy()
            expect(verticalLines).toContainEqual([0, 5, 10, 15, 20])
            expect(verticalLines).toContainEqual([1, 6, 11, 16, 21])
            expect(verticalLines).toContainEqual([2, 7, 12, 17, 22])
        })
        it('should build an an array of n correct horizontal line arrays, each with length n', () => {
            const horizontalLines = validator.getHorizontalLines(5)
            expect(horizontalLines).toHaveLength(5)
            expect(horizontalLines.every((line) => line.length === 5)).toBeTruthy()
            expect(horizontalLines).toContainEqual([0, 1, 2, 3, 4])
        })
        it('should build an array of 2 correct vertical lines', () => {
            const diagonalLines = validator.getDiagonalLines(5)
            expect(diagonalLines).toHaveLength(2)
            expect()
        })
    })
})

describe('Testing the constructor', () => {
    const bingoCardValidator = new BingoValidator(5)
    it('should have all the correct properties', () => {
        expect(bingoCardValidator).toHaveProperty('diagonalLines')
    })
    it('should throw an error if we try to use a number for n that is even', () => {
        function get4by4CardValidator () {
            return new BingoValidator(4)
        }
        expect(get4by4CardValidator).toThrow()
    })
    it('should contain the correct diagonal line matches in the diagonal lines property array', () => {
        const diagonals = bingoCardValidator.diagonalLines
        expect(diagonals).toHaveLength(2)
        expect(diagonals).toContainEqual([0, 6, 12, 18, 24])
        expect(diagonals).toContainEqual([4, 8, 12, 16, 20])
    })
    it('should contain the correct vertical line matches in the vertical lines property array', () => {
        const verticals = bingoCardValidator.verticalLines
        expect(verticals).toHaveLength(5)
        expect(verticals).toContainEqual([4, 9, 14, 19, 24])

    })
    it('should contain the correct horizontal line matches in the horizontal lines property array', () => {
        const horizontals = bingoCardValidator.horizontalLines
        expect(horizontals).toHaveLength(5)
        expect(horizontals).toContainEqual([20, 21, 22, 23, 24])
    })
})
describe('Testing the validations', () => {
    const validator = new BingoValidator(5)
    it('should correctly determine if the array of marked values is a match for a line', () => {
        expect(validator.hasLine([1, 7, 13, 19], [1, 6, 11, 16, 21])).toBeFalsy()
    })
    it('should correctly identify when the card has a diagonal line', () => {
        expect(validator.hasLineMatchForOrientation([1, 7, 13, 19], validator.diagonalLines)).toBeFalsy()
    })
    it('should correctly identify when the card has a vertical line', () => {
        expect(validator.hasLineMatchForOrientation([1, 3, 7, 13, 18, 19, 23], validator.verticalLines)).toBeFalsy()
        expect(validator.hasLineMatchForOrientation([1, 3, 7, 8, 13, 18, 19, 23], validator.verticalLines)).toBeTruthy()
    })
    it('should correctly identify when the card has a horizontal line', () => {
        expect(validator.hasLineMatchForOrientation([1, 7, 9, 16, 17, 18, 19, 22], validator.horizontalLines)).toBeFalsy()
        expect(validator.hasLineMatchForOrientation([1, 7, 9, 15, 16, 17, 18, 19, 22], validator.horizontalLines)).toBeTruthy()
    })
    it('should stop checking if we identify a diagonal match', () => {
        const card = [{"value":70,"marked":false},{"value":18,"marked":false},{"value":69,"marked":true},{"value":30,"marked":false},{"value":32,"marked":true},{"value":29,"marked":false},{"value":46,"marked":false},{"value":17,"marked":false},{"value":22,"marked":true},{"value":23,"marked":false},{"value":69,"marked":false},{"value":36,"marked":true},{"value":65,"marked":true},{"value":1,"marked":true},{"value":2,"marked":false},{"value":20,"marked":false},{"value":41,"marked":true},{"value":10,"marked":false},{"value":12,"marked":false},{"value":12,"marked":true},{"value":43,"marked":true},{"value":5,"marked":false},{"value":1,"marked":false},{"value":1,"marked":false},{"value":51,"marked":false}]
        const lineMatchSpy = jest.spyOn(validator, 'hasLineMatchForOrientation')
        validator.hasBingo(card)
        expect(lineMatchSpy).toHaveBeenCalledTimes(1)
        const marked = validator.getMarkedItemIndexes(card)
        expect(lineMatchSpy).toHaveBeenCalledWith(marked, validator.diagonalLines)
    })
})