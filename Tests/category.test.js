const request = require('supertest');
const server = require('../server.js');

//import user model
const Category = require("../Model/Category/categories");


describe("Category routes", () => {

//test all the routes
//test get posts
  test('GET ALL Categories /api/category', async () => {
    await request(server)
        .get('/api/category')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });

  //test get one category by ID and Delete
  test("DELETE category /api/category/:id", async () => {
    const category = await Category.create({
        name:"testing",
    })
  
    await request(server)
      .get("/api/category/" + category.name)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(category.id) 
        expect(response.body.name).toBe(category.name) 
      })

      await request(server)
      .delete("/api/category/" + category.id)
      .expect(200)
      .then(async () => {
        expect(await Category.findOne({ _id: category.id })).toBeFalsy()
      })
      
  });

  //test get one category by slug
  test("GET one category by SLUG /api/category/:slug", async () => {

    await request(server)
      .get("/api/category/aprendizaje")
      .expect(200)
      .then((response) => {
        expect(response.body.slug).toBe('aprendizaje')  
      })
  });


});
