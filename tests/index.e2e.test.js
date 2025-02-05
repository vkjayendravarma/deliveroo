const index = require("..");


describe('Cron Expression end to end testing', () => {

    let consoleLogMock;

    beforeEach(() => {
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleLogMock.mockRestore();
    });

    test('Invalid command - when number of arguments are less', () => {
        process.argv = ['node', 'index.js'];
        index();
        expect(consoleLogMock).toHaveBeenCalledWith('Invalid command');
    });

    test('command node index.js "*/15 0 W * 1#3" /usr/bin/find', () => {
        process.argv = ['node', 'index.js', "*/15 0 W * 1#3 /usr/bin/find -v foo"];
        index();

        expect(consoleLogMock.mock.calls[0][0].trim()).toBe('minute');
        expect(consoleLogMock.mock.calls[0][1].trim()).toBe('0 15 30 45');

        expect(consoleLogMock.mock.calls[1][0].trim()).toBe('hour');
        expect(consoleLogMock.mock.calls[1][1].trim()).toBe('0');

        expect(consoleLogMock.mock.calls[2][0].trim()).toBe('day of month');
        expect(consoleLogMock.mock.calls[2][1].trim()).toBe('6');

        expect(consoleLogMock.mock.calls[3][0].trim()).toBe('month');
        expect(consoleLogMock.mock.calls[3][1].trim()).toBe('1 2 3 4 5 6 7 8 9 10 11 12');

        expect(consoleLogMock.mock.calls[4][0].trim()).toBe('day of week');
        expect(consoleLogMock.mock.calls[4][1].trim()).toBe('weak number 3 and MON');

        expect(consoleLogMock.mock.calls[5][0].trim()).toBe('command');
        expect(consoleLogMock.mock.calls[5][1].trim()).toBe('/usr/bin/find -v foo');
    });

    test('command node index.js "*/15 0 1,15 * 4-1 2005 /usr/bin/find"', () => {
        process.argv = ['node', 'index.js', "*/15 0 1,15 * 4-1 2005 /usr/bin/find -v foo"];
        index();

        expect(consoleLogMock.mock.calls[0][0].trim()).toBe('minute');
        expect(consoleLogMock.mock.calls[0][1].trim()).toBe('0 15 30 45');

        expect(consoleLogMock.mock.calls[1][0].trim()).toBe('hour');
        expect(consoleLogMock.mock.calls[1][1].trim()).toBe('0');

        expect(consoleLogMock.mock.calls[2][0].trim()).toBe('day of month');
        expect(consoleLogMock.mock.calls[2][1].trim()).toBe('1 15');

        expect(consoleLogMock.mock.calls[3][0].trim()).toBe('month');
        expect(consoleLogMock.mock.calls[3][1].trim()).toBe('1 2 3 4 5 6 7 8 9 10 11 12');

        expect(consoleLogMock.mock.calls[4][0].trim()).toBe('day of week');
        expect(consoleLogMock.mock.calls[4][1].trim()).toBe('4 5 6 0');

        expect(consoleLogMock.mock.calls[5][0].trim()).toBe('year');
        expect(consoleLogMock.mock.calls[5][1].trim()).toBe('2005');

        expect(consoleLogMock.mock.calls[6][0].trim()).toBe('command');
        expect(consoleLogMock.mock.calls[6][1].trim()).toBe('/usr/bin/find -v foo');
    });

});