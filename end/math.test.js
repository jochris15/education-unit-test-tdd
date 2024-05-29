// 1 test = 1 unit test'
// declarenya bisa pake test / it
// 1 unit test => ada ekspetasi
// 1 ekspetasi => ada hasil(matchers)
// toBe => disebut matchers

const sum = (a, b) => {
    return a + b
}

const multiply = (a, b) => {
    return a * b
}

describe.only('mathematical operation', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3)
        expect(sum(3, 4)).toBe(7);
    });

    it('multiply 3 * 5 to equal 15', () => {
        expect(multiply(3, 5)).toBe(15)
        expect(multiply(10, 5)).toBe(50)
    })
})
