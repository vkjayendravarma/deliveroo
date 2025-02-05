const { inferCronField } = require("../cornParser");

describe('Cron Expression Parser', () => {

    test('Ignore check', () => {
        const testCronField = inferCronField("?", 1, 31, ['L', 'W', '?']);
        expect(testCronField).toBe("Ignored");
    });

    test('Ignore check - invalid', () => {
        const testCronField = inferCronField("?, 1", 1, 31, ['L', 'W', '?']);
        expect(testCronField).toBe("Invalid value");
    });

    test('* check - invalid', () => {
        const testCronField = inferCronField("*, 1", 1, 31, ['L', 'W', '?']);
        expect(testCronField).toBe("Invalid value");
    });

    test('* check - valid range 1 to 12', () => {
        const testCronField = inferCronField("*", 1, 12, ['L', 'W', '?']);
        expect(testCronField).toBe("1 2 3 4 5 6 7 8 9 10 11 12");
    });

    test('- check - valid range 1 to 12', () => {
        const testCronField = inferCronField("1-5", 1, 12, ['L', 'W', '?']);
        expect(testCronField).toBe("1 2 3 4 5");
    });

    test('/ check - valid range 1 to 12', () => {
        const testCronField = inferCronField("1/5", 1, 12, ['L', 'W', '?']);
        expect(testCronField).toBe("1 6 11");
    });

    test('L and step range check - valid range 1 to 12', () => {
        const testCronField = inferCronField("1/10 L", 1, 31, ['L', 'W', '?']);
        expect(testCronField).toBe("1 11 21 31");
    });

    test('# check - valid range 1 to 12', () => {
        const testCronField = inferCronField("1#3", 0, 6, ['L', '#', '?']);
        expect(testCronField).toBe("weak number 3 and MON");
    });

    test('const number check - valid range 1 to 12', () => {
        const testCronField = inferCronField("1", 0, 6, ['L', '#', '?']);
        expect(testCronField).toBe("1");
    });
});