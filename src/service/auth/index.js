const express = require('express').Router()
const { jwt, statusCode } = require('../../helper')

const userList = [
  {
    id: 1,
    email: 'user1@gmail.com',
    password: '123456'
  }
]

express.post('/sign-in', async (req, res) => {
  const user = userList.find(({ email }) => email === req.body.email)
  if (!user) {
    return res
      .status(statusCode.NOT_FOUND)
      .json({ status: 'error', message: 'user not found' })
  }

  if (user.password !== req.body.password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json({ status: 'error', message: 'invalid password' })
  }

  const token = jwt.createToken(user)
  res.json({
    status: 'ok',
    data: {
      email: user.email,
      token
    }
  })
})

module.exports = express
