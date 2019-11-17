const db = require('../database/dbConfig.js')
const Users = require('./users-model.js')
const request = require('supertest')
const server = require('../api/server.js')

describe('users model', function(){
     describe('add()', function(){
          beforeEach(async () => {
               await db('users').truncate()
          })

          it('should insert a new user', async function(){
               await Users.add({ username: "john", password: "john"})
               const allUsers = await db('users')

               expect(allUsers).toHaveLength(1)
               expect(allUsers[0].username).toBe("john")
          })

          it('should return inserted user', async function(){
               const amy = await Users.add({ username: "amy", password: "amy"})
               const returningUser = await db('users')

               expect(amy.id).toBe(1)
               expect(amy.id).toBeDefined()
               expect(returningUser).toHaveLength(1)
          })
     })

     describe('findByUser()', function(){
          beforeEach(async () => {
               await db('users').truncate();
          })

          it('returns the username John once inserted', async function(){
               await Users.add({ username:"john", password: "jjjj"})
               const returningUser = await Users.findByUser("john")

               expect(returningUser).toBeDefined()
               expect(returningUser.username).toBe('john')
               expect(returningUser.password).toBe('jjjj')
          })

          it('Should not login without credentials', async function(){
               return request(server).post('/api/auth/login')
               .then(response => {
                    expect(response.body.message).toMatch(/Please provide valid username and password/i)
               })
          })
     })
})