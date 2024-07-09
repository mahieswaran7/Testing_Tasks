 //const{expect,assert}=require('chai');
// const should = require('chai').should();


//const expect = require('chai').expect

const axios = require('axios')

let assert;
(async () => {
    const chai = await import('chai');
    assert = chai.assert;
})();

let expect ;
(async ()=> {
    const chai = await import ('chai');
    expect =chai.expect;
})();



describe('Chai Assertion',()=>{
    const a=20,
    arr=[30,40,50]
    obj={name:'Eswaran',age:21},
    myFunc=(a,b)=>a + b,
    isTrue=true,
    nan=NaN,
    myUndefined=undefined;
    it.only('Assert Style',()=>{
        assert.ok(true);
    
        // assert.isOk('everyting','everything is ok');
        // assert.typeOf(arr,'array');
        // assert.include(arr,30,"30 isn't there in the array");
        // assert.LengthOf(arr,3,"Length isn't 3");
        // assert.deepEqual(arr,[30,40,50])
        // assert.equal(arr,[30,40,50])
        // assert.sameOrderedMembers(arr,[30,40,50])
    });
    
})




// it('Except Style',()=>{
//    // expect(true).to.be.false;
//     // expect(arr).to.be.a('array');
//     // expect(arr).to.have.Length(3);
//     // expect(arr).to.eql(30,40,50);
//     // expect(arr).to.have.keys(["name","age"]);

// })

// it('Should Style',()=>{
//     expect(true).to.be.true;
//     expect(arr).to.include(30);

// });