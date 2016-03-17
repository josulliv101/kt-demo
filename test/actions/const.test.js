import {CURSOR} from '../../app/actions/const';
import { expect } from "chai";
import sinon from "sinon";

const {cursor, FETCHING, FOOBAR} = CURSOR;

describe("Constants", function() {
    
    it("resolves a cursor path to the desired string", function() {
		
        expect(FETCHING.length).to.equal(1);
        expect(FOOBAR.length).to.equal(2);

        expect(cursor(FETCHING)).to.equal('fetching');
        expect(cursor(FOOBAR)).to.equal('foo,bar');
    });

    it("can take a custom resolver", function() {
        
        const custom = (arr) => arr.join('%%');

        expect( cursor(FETCHING, custom) ).to.equal('fetching');
        expect( cursor(FOOBAR, custom) ).to.equal('foo%%bar');
    });

});
