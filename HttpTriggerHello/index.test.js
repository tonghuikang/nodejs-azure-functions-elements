const httpFunction = require('./index');
const context = require('../test/defaultContext')

test('Http trigger should return known text', async () => {

    const request = {
        query: { name: 'Bill' }
    };

    await httpFunction(context, request);

    expect(context.log.mock.calls.length).toBe(1);
    expect(context.res.body).toEqual(expect.anything());
    expect(context.res.body).toEqual('Hello Bill');

});