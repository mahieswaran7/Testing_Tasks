const {suite,test} =require('mocha');
const {AreaOfCircle} = require('../src/app1')

suite('Suite 1', ()=>{
    it ('AreaOfCircle(2) should return 12.566370614359172',()=>{
        expect(AreaOfCircle(2)).to.be.equal(12.566370614359172)
    })
})

let expect;
(async ()=> {
    const chai = await import('chai');
    expect = chai.expect;
})();