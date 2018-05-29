log = console.log;

expect = require('chai').expect;
should = require('chai').should();
_ = require('lodash');

const BaseUser = require('../models/baseUser');

describe("#BaseUser Initial conditions", () => {

    it('Base User list should be empty', () => {
        _.isEmpty(BaseUser.userList).should.be.true;
    });

    it('Base User should be an object', ()=>{
        _.isObject(new BaseUser(Math.random())).should.be.true;
    });

    it('Base User "id" should be a finite number (not NaN, not infinite)', ()=>{
        _.isFinite(new BaseUser(Math.random())._id).should.be.true;
    });

    it('Base User "username" should be a not empty string', ()=>{
        const user = new BaseUser(Math.random());
        (_.isString(user.username) && user.username.length > 0).should.be.true;
    });

    

});

describe('#BaseUser', () => {
    describe("#onConnect", () => {
        it("On connect Base User list size must increment by 1", () => {
            var initialValue = _.size(BaseUser.userList);
            BaseUser.onConnect(Math.random());
            var finalValue = _.size(BaseUser.userList);
            initialValue.should.equals(--finalValue);

        });
    });
    describe("#onConnect", () => {
        it("On connect Base User list size must reduce by 1", () => {
            var id = Math.random();
            BaseUser.onConnect(id);
            var initialValue = _.size(BaseUser.userList);
            BaseUser.onDisconnect(id);
            var finalValue = _.size(BaseUser.userList);
            initialValue.should.equals(++finalValue);
        });
    });
});