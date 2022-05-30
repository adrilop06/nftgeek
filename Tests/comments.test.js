const request = require('supertest');
const server = require('../server.js');

//import user model
const Comment = require("../Model/Comment/comment");


describe("Comments routes", () => {
    var auth = {};
    beforeAll(loginUser(auth));
//test all the routes
//test get Commets
  test('GET ALL Comments /api/comments', async () => {
    await request(server)
        .get('/api/comments')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  });

  //test get one comment by ID and Delete
  test("POST, Get By ID and DELETE comment /api/comments/:id", async () => {
    const comment = await Comment.create({
        body:"testing comment",
        post: "62773e30082d5e859722f004", 
        user:auth.id
    })
  
    await request(server)
      .get("/api/comments/" + comment._id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toEqual(comment._id.toString())  
        expect(response.body.post).toEqual(comment.post.toString())   
        expect(response.body.user).toEqual(comment.user.toString())   
      })

    

      await request(server)
      .del("/api/comments/" + comment.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then(async () => {
        expect(await Comment.findOne({ _id: comment._id })).toBeFalsy()
      })
  });

  //testing Put comment
  test("PUT /api/comments/:id", async () => {
    const comment = await Comment.create({
        body:"testing comment",
        post: "62773e30082d5e859722f004", 
        user:auth.id
    })
    
    const updateComment = {
        body:"update comment",
        post: "62773e30082d5e859722f004", 
        
      }
    await request(server)
      .put("/api/comments/" + comment._id)
      .set('Authorization', 'GEEK ' + auth.token)
      .send(updateComment)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toEqual(comment._id.toString())  
        expect(response.body.post).toEqual(updateComment.post.toString())   
        expect(response.body.user._id).toEqual(auth.id)   
      })

    await request(server)
      .del("/api/comments/" + comment.id)
      .set('Authorization', 'GEEK ' + auth.token)
      .expect(200)
      .then(async () => {
        expect(await Comment.findOne({ _id: comment._id })).toBeFalsy()
      })
  
			
  })

   


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
            auth.id = res.body._id
            return done();
        }
    };
  }


});