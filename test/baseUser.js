const constants = require('../helpers/global'),
    log = console.log,
    //expect = require('chai').expect,
    should = require('chai').should(),
    _ = require('lodash');

const BaseUser = require('../models/baseUser');

describe("#BaseUser Initial conditions", () => {

    it('Base User should be an object', () => {
        _.isObject(new BaseUser(Math.random())).should.be.true;
    });

    it('Base User "id" should be a finite number (not NaN nor Infinity)', () => {
        _.isFinite(new BaseUser(Math.random())._id).should.be.true;
    });

    it('Base User "username" should be a not empty string', () => {
        const user = new BaseUser(Math.random());
        (_.isString(user.username) && user.username.length > 0).should.be.true;
    });

    it('Base User "username" should start with ' + constants.BaseUserConfig.usernamePrefix, () => {
        const user = new BaseUser(Math.random());
        _.startsWith(user.username, constants.BaseUserConfig.usernamePrefix).should.be.true;
    });

    it('Base User "color" should be a not empty string', () => {
        const user = new BaseUser(Math.random());
        (_.isString(user.color) && user.color.length > 0).should.be.true;
    });

    describe("#userlist property", () => {
        it('On startup should be empty', () => {
            _.isEmpty(BaseUser.userList).should.be.true;
        });
    });

});

// BaseUser Static Methods
describe('#BaseUser', () => {

    describe("#onConnect", () => {
        it("Base User list size must increment by 1 in a 1000 sample size", () => {

            const sample = Array(1000);
            _.fill(sample, 0);

            const onConnectSapmles = _.map(sample, item => {
                BaseUser.onConnect({ id: Math.random() });
                return _.size(BaseUser.userList);
            });
            const notConnecteddUser = _.filter(onConnectSapmles, (size, index) => {
                return size !== index + 1
                    || size === undefined;
            })
            BaseUser.userList = {};

            notConnecteddUser.length.should.equals(0);
        });
    });
    describe("#onDisconnect", () => {
        it("Base User list size must decrement by 1 in a 1000 sample size", () => {

            const sample = Array(1000);
            _.fill(sample, 0);

            const onConnectSapmles = _.map(sample, item => {
                var randomId = Math.random();
                BaseUser.onConnect({ id: randomId });
                return randomId;
            });
            _.forEach(onConnectSapmles, item => BaseUser.onDisconnect({ id: item }));

            _.size(BaseUser.userList).should.equals(0);
        });
    });

});