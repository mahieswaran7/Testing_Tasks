// const expect = require("chai").expect
const axios = require("axios")

let expect;
(async ()=>{
    const chai = await import('chai'); // importing chai explicitly
    expect = chai.expect;
})();
describe("async test suite", ()=>{
    it("Promised based way",()=>{

        return axios.get("http://localhost:8888/users").then(res =>{
            expect(res.data[1].useremail).to.be.equal("siva123@gmail.com")
            expect(res.data[1].carname).to.be.equal("suzuki-nexa")
            expect(res.data[1].username).to.be.equal("tempuser")
            expect(res.data[1].password).to.be.equal("1234567890")
            // expect(res.data[1].carprice).to.be.equal("34567")

        })



    })
    it("Done based way",(done)=>{
         axios.get("http://localhost:8888/users").then(res =>{
            expect(res.data[5].id).to.be.equal("9a44")
             
            expect(res.data[5].useremail).to.be.equal("basilahamed12345@gmail.com")
            done()
          

        }).catch(err =>{
            done(err)
        })



    })
    it("async await based way", async ()=>{

        const res = await axios.get("http://localhost:8888/users")
        expect(res.data[6].username).to.be.equal("finaltesting06")

    })










})