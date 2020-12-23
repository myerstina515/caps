'use strict';

require('../caps')
require('../vendor/vendor');
require('../driver/driver');
// const events = require('../events');


describe('console logs', () => {
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('will log something into the console', () => {
        caps.emit('delivered', {orderID: 1});
        expect(consoleSpy).toBeCalled();
    });
    it('will log properly into the console', () => {
        caps.emit('pickup', {orderID: 1});
        expect(consoleSpy).toBeCalled();
    });
    it('will log inTransit into the console', () => {
        caps.emit('inTransit', {orderID: 1});
        expect(consoleSpy).toBeCalled();
    });
});



