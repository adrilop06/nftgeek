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
            auth.id = res.body._id;
            return done();
        }
    };
  }
  
//POST

  
test("POST /api/posts", async () => {

  await request(server)
    .post("/api/posts")
    .set('Authorization', 'GEEK ' + auth.token)
    .send({ 
      title:"Testeo Post",
      category:"juegos",
      tag: "Testeo Jest",
      body: "Testeo post",
      user: auth.id
    })
    .expect(200)
  
});
//test all the routes
//test get posts
  test('GET Posts', async () => {
    await request(server)
        .get('/api/posts')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });

  //test get one post created
  test("GET ONE POST /api/posts/:id", async () => {
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
  test("PATCH /api/posts/:id", async () => {
    const post = await Post.create({
      title:"Testeo updated",
      category:"juegos",
      tag: "Testeo Jest",
      body: "Testeo post",
      user: auth.id
    })
  
    const data = {
      title:"Post Updated",
      body: "Tested",
    }
  
    await request(server)
      .put("/api/posts/" + post.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBe(post.id)
        expect(response.body.title).toBe(data.title)
        expect(response.body.body).toBe(data.body)
  
        // Check the data in the database
        const newPost = await Post.findOne({ _id: response.body._id })
        expect(newPost).toBeTruthy()
        expect(newPost.title).toBe(data.title)
        expect(newPost.body).toBe(data.body)
      })
  })





  
//test likes posts
test('PUT /users/likes', async () => {
  const post = await Post.create({
    title:"Testeo updated",
    category:"juegos",
    tag: "Testeo Jest",
    body: "Testeo post",
    user: auth.id
  })

  await request(server)
      .put(`/api/posts/likes`)
      .set('Authorization', 'GEEK ' + auth.token)
      .send({
        postID:post.id
      })
      .expect(200)
  
  await request(server)
      .put(`/api/posts/mark`)
      .set('Authorization', 'GEEK ' + auth.token)
      .send({
        postID:post.id
      })
      .expect(200)

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

