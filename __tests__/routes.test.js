'use strict';


require('../vendor');
require('../driver');
const { it, expect } = require('@jest/globals');
const events = require('../events');


describe('console logs', () => {
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('will log something into the console', () => {
        events.emit('delivered', {orderID: 1});
        expect(consoleSpy).toBeCalled();
    });
    it('will log properly into the console', () => {
        events.emit('pickup', {orderID: 1});
        expect(consoleSpy).toBeCalled();
    });
    it('will log inTransit into the console', () => {
        events.emit('inTransit', {orderID: 1});
        expect(consoleSpy).toBeCalled();
    });
});



