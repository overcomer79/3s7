import * as _ from 'lodash';
import chai = require('chai');
var should = chai.should();

import { TrisTable } from '../../../shared/models/tables/trisTables';
import { User } from '../../../src/models/user';

describe("#TrisTable Initial conditions", () => {
    it("Tris Table should be an object", () => {
        // Arrange
        const user = new User();
        
        // Act
        const table = new TrisTable(user);
        
        // Assert
        _.isObject(table).should.be.true;
    });
});

