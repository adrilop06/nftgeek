const request = require('supertest');
const server = require('../server.js');

//import user model
const User = require("../Model/User/user");


describe("Post routes", () => {
  //chech update post
  var auth = {};
  beforeAll(loginUser(auth));

//test all the routes
//POST user
test("POST /api/users/registration", async () => {
  const data= {
    firstName:"test",
    lastName:"test",
    userName:"testA",
    email:"testA@test.com",
    password:"test"
  }
  await request(server)
  .post("/api/users/registration",)
  .send(data)
  .expect(200)
  .then(async (response) => {
    // Check the response
    expect(response.body._id).toBeTruthy()
    expect(response.body.firstName).toBe(data.firstName)
    expect(response.body.userName).toBe(data.userName)

    // Check the data in the database
    const user = await User.findOne({ _id: response.body._id })
    expect(user).toBeTruthy()
    expect(user.userName).toBe(data.userName)
  })
})

//Delete user
test("DELETE /api/users/:id", async () => {
  const user = await User.create({
    firstName:"test",
    lastName:"test",
    userName:"testB",
    email:"testB@test.com",
    password:"test"
  })

  await request(server)
  .delete("/api/users/" + user.id)
  .expect(200)
  .then(async (response) => {
    // Check the data in the database
    const user = await User.findOne({ _id: response.body._id })
    expect(user).toBeFalsy()
  })
})
  
//PUT user
test("PUT Password /api/users/:id", async () => {

  const data= {
    firstName:"test",
    lastName:"test",
    userName:"test",
    email:"test@test.com",
    password:"test"
  }

  await request(server)
  .put("/api/users/password")
  .set('Authorization', 'GEEK ' + auth.token)
  .send(data)
  .expect(200)
  .then(async (response) => {
    // Check the response
    expect(response.body._id).toBeTruthy()
    expect(response.body.firstName).toBe(data.firstName)
    expect(response.body.userName).toBe(data.userName)

    // Check the data in the database
    const user = await User.findOne({ _id: response.body._id })
    expect(user).toBeTruthy()
    expect(user.userName).toBe(data.userName)
  })
});

//test get all users
  test('GET All Users', async () => {
    await request(server)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });
  //create user, get profile and delete
  test("GET PROFILE and DELETE", async () => {
    const user = await User.create({
      firstName:"test",
      lastName:"test",
      userName:"test",
      email:"test@test.com",
      password:"test"
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