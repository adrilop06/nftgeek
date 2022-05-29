const request = require('supertest');
const server = require('../server.js');

//import user model
const Tag = require("../Model/Tag/tag");


describe("Tag routes", () => {

//test all the routes
//test get tags
  test('GET ALL Tag /api/tag', async () => {
    await request(server)
        .get('/api/tag')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });

  //test get one category by ID and Delete
  test("POST and DELETE tag", async () => {
    const tag = await Tag.create({
        name:"testing",
    })
  
    await request(server)
      .get("/api/tag/" + tag.name)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toEqual(tag.id.toString())    
        expect(response.body.name).toEqual(tag.name.toString()) 
      })

      await request(server)
      .delete("/api/tag/" + tag._id)
      .expect(200)
      .then(async () => {
        expect(await Tag.findOne({ _id: tag.id })).toBeFalsy()
      })
      
  });

  //test get one category by slug
  test("GET one tag by SLUG /api/tag/:slug", async () => {

    await request(server)
      .get("/api/tag/nft")
      .expect(200)
      .then((response) => {
        expect(response.body.slug).toBe('nft')  
      })
  });


});
