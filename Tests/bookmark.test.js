const request = require('supertest');
const server = require('../server.js');

//import user model
const Bookmark = require("../Model/Bookmark/bookmark");


describe("Bookmarks routes", () => {

    var auth = {};
    beforeAll(loginUser(auth));
//test all the routes
//test get posts
  test('GET ALL Bookmarks /api/bookmark', async () => {
    await request(server)
        .get('/api/bookmark')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });

  //create bookmark, get bookmark and delete
  test("CREATE bookmark and GET", async () => {
    const bookmark = await Bookmark.create({
      user:"6293bcadb1c8ebed3701971a",
    
    })

    await request(server)
      .get("/api/bookmark/" + bookmark.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(bookmark.id)
      })
   
  });




  function loginUser(auth) {
    return function(done) {
       request(server)
            .post('/api/users/login')
            .send({
                userName: 'test',
                password: 'test'
            })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
  }

});