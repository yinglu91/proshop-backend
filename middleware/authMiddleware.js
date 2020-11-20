import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)

      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user)

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }

/*
1. register user
POST http://localhost:5000/api/users
requst:
{
   "name": "test2",
    "email": "test2@example.com",
    "password": "test123"
}

response:
{
    "_id": "5fb71b784dc22a431875e106",
    "name": "test2",
    "email": "test2@example.com",
    "isAdmin": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjcxYjc4NGRjMjJhNDMxODc1ZTEwNiIsImVtYWlsIjoidGVzdDJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MDU4MzU2NDAsImV4cCI6MTYwODQyNzY0MH0.kAkEjIEN0YPmIjQapKNUp3SeKKTy6AalOqoix1WxrXY"
}

2. login
POST http://localhost:5000/api/users/login
{
    "email": "test2@example.com",
    "password": "test123"
}

response:
{
    "_id": "5fb71b784dc22a431875e106",
    "name": "test2",
    "email": "test2@example.com",
    "isAdmin": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjcxYjc4NGRjMjJhNDMxODc1ZTEwNiIsImVtYWlsIjoidGVzdDJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MDU4MzU2NjYsImV4cCI6MTYwODQyNzY2Nn0.PFx4gv14aJzhQ5AdjJdPK3XaeRH5SY2AJm2brgKA7sk"
}

3. get user profile
GET http://localhost:5000/api/users/profile
header Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjcxYjc4NGRjMjJhNDMxODc1ZTEwNiIsImVtYWlsIjoidGVzdDJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MDU4MzU2NjYsImV4cCI6MTYwODQyNzY2Nn0.PFx4gv14aJzhQ5AdjJdPK3XaeRH5SY2AJm2brgKA7sk

response:
{
    "_id": "5fb71b784dc22a431875e106",
    "name": "test2",
    "email": "test2@example.com",
    "isAdmin": false
}
*/

