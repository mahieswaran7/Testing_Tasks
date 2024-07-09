const {add,sub,mul,div}= require('../src/app')
//const expect = require('chai').expect

let expect;

(async () =>{
    const chai=await import('chai');
    expect =chai.expect;
})();


describe('HookSuite 1',()=>{
    before(()=>{
        console.log('before')
    });

    after(()=>{
        console.log('after')
    });

    beforeEach(()=>{
        console.log('beforeEach')
    });
    
    afterEach(()=>{
        console.log('afterEach')
    });

    describe('Suite 1',()=>{
        it ('add (2,3) should return 5',()=>{
            expect(add(2,3)).to.be.equal(5);
        })
    })

    describe('Suite 2',()=>{
        it ('sub (10,3) should return 7',()=>{
            expect(sub(10,3)).to.be.equal(7);
        })
    })
    
    describe('Suite 3',()=>{
        it ('mul (10,3) should return 30',()=>{
            expect(mul(10,3)).to.be.equal(30);
        })
    })
    
    describe('Suite 4',()=>{
        it ('div (30,3) should return 10',()=>{
            expect(div(30,3)).to.be.equal(10);
        })
    })

    
})