const request = require('supertest');
const server = require('../server.js');

//import user model
const User = require("../Model/User/user");


describe("Post routes", () => {
  //chech update post
  var auth = {};
  beforeAll(loginUser(auth));
//test all the routes
//test get all users
  test('GET All Users', async () => {
    await request(server)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });
  //create user, get profile and delete
  test("CREATE user and GET PROFILE and DELETE", async () => {
    const user = await User.create({
      firstName:"test",
      lastName:"test",
      userName:"test",
      email:"test@test.com",
      password:"123"
    })

    await request(server)
      .get("/api/users/" + user.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(user.id)
        expect(response.body.firstName).toBe(user.firstName)
        expect(response.body.lastName).toBe(user.lastName)
        expect(response.body.userName).toBe(user.userName)
        expect(response.body.email).toBe(user.email)
      })
      
    await request(server)
      .get("/api/users/" + user.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(user.id)
        expect(response.body.firstName).toBe(user.firstName)
        expect(response.body.lastName).toBe(user.lastName)
        expect(response.body.userName).toBe(user.userName)
        expect(response.body.email).toBe(user.email)
      })
      await request(server)
      .get('/api/users/profile/' + user.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(user.id) 
        expect(response.body.firstName).toBe(user.firstName) 
        expect(response.body.lastName).toBe(user.lastName)
        expect(response.body.userName).toBe(user.userName)
        expect(response.body.email).toBe(user.email)
      })
      
      await request(server)
      .delete("/api/users/" + user.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then(async () => {
        expect(await User.findOne({ _id: user.id })).toBeFalsy()
      })
      
  });
  

  //login Users

    test("LOG User", async () => {
        request(server)
            .post('/api/users/login')
            .send({
                userName: 'adrian',
                password: '001'
            })
            .expect(200)
    });

 


  function loginUser(auth) {
    return function(done) {
       request(server)
            .post('/api/users/login')
            .send({
                userName: 'adrian',
                password: '001'
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