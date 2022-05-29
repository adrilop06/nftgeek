const request = require('supertest');
const server = require('../server.js');

//import user model
const Post = require("../Model/Post/post.js");


describe("Post routes", () => {

  var auth = {};
  beforeAll(loginUser(auth));
  
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
            auth._id = res.body._id
            return done();
        }
    };
  }
  
//test all the routes
//test get posts
  test('GET Posts', async () => {
    await request(server)
        .get('/api/posts')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });

  //test get one post created
  test("POST and GET ONE POST /api/posts/:id", async () => {
    const post = await Post.create({
        title:"Testeo Jest",
        category:"juegos",
        tag: "Testeo Jest",
        body: "Testeo post",
        user: "6293bcadb1c8ebed3701971a"
    })
  
    await request(server)
      .get("/api/posts/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id)
        expect(response.body.title).toBe(post.title)
        expect(response.body.body).toBe(post.body)
        expect(response.body.tag).toBe(post.tag)
        expect(response.body.category).toBe(post.category)
        expect(response.body.user._id).toEqual(post.user.toString())    
      })

      await request(server)
      .delete("/api/posts/" + post.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then(async () => {
        expect(await Post.findOne({ _id: post._id })).toBeFalsy()
      }) 
  });

  //PUT post by ID
  test('PUT /users/:id', async () => {
    const post = Post.create({
      title:"Testeo Jest updated",
      category:"juegos",
      tag: "Testeo Jest",
      body: "Testeo post",
      user: "6293bcadb1c8ebed3701971a"
    })
    const data ={
      title:"Post Updated",
      category:"juegos",
      tag: "Testeo Jest",
      body: "Testeo post",
      user: "6293bcadb1c8ebed3701971a"
    }
    await request(server)
        .put(`/api/posts/${post.id}`)
        .set('Authorization', 'GEEK ' + auth.token)
        .send(data)
        .expect(200)
        .then((response) => {
          expect(response.body._id).toBe(post.id)
          expect(response.body.title).toBe(data.title)
          expect(response.body.body).toBe(data.body)
          expect(response.body.tag).toBe(data.tag)
          expect(response.body.category).toBe(data.category)
          expect(response.body.user._id).toEqual(data.user.toString())     
        }) 
      await request(server)
        .delete("/api/posts/" + post.id)
        .set('Authorization', 'GEEK ' + auth.token)
        .expect(200)
        .then(async () => {
          expect(await Post.findOne({ _id: post.id })).toBeFalsy()
        })
  });

//test likes posts
test('PUT /users/likes', async () => {
  const post = Post.create({
    title:"Testeo Jest likes",
    category:"juegos",
    tag: "Testeo Jest",
    body: "Testeo post",
    user: "6293bcadb1c8ebed3701971a"
  })

  await request(server)
      .put(`/api/posts/likes`)
      .set('Authorization', 'GEEK ' + auth.token)
      .send({
        postID:post._id
      })
      .expect(200)

    await request(server)
      .delete("/api/posts/" + post.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then(async () => {
        expect(await Post.findOne({ _id: post.id })).toBeFalsy()
      })
});



it("it shoud return status code 400 if we dosent send anything", function(done){
  request(server)
    .post("/api/posts")
    .send({
      title:"Testeo Post",
      category:"juegos",
      tag: "Testeo Jest",
      body: "Testeo post"})
    .expect(400)
    .end(function(err, res){
      if (err) done(err);
      done();
    });
});




  //delete post
  test("DELETE /api/posts/:id", async () => {
    const post = await Post.create({
      title:"Testeo Jest delete",
      category:"juegos",
      tag: "Testeo Jest",
      body: "Testeo post",
      user: "6293bcadb1c8ebed3701971a"
    })
  
    await request(server)
      .delete("/api/posts/" + post.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then(async () => {
        expect(await Post.findOne({ _id: post.id })).toBeFalsy()
      })
  });
  

 
});

