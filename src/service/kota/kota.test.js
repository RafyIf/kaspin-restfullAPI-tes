const supertest = require('supertest')
const app = require('../../app')

const SECONDS = 1000
jest.setTimeout(70 * SECONDS)

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY1ODg5NDM2NSwiZXhwIjoxNjU4ODk3OTY1fQ.NOsVlwRAiEJ8zCm4lTZO0RITqi7xnQUX0ccnAVHxQe4'

describe('TEST service kota', () => {
  test('GET kota found', async () => {
    const response = await supertest(app)
      .get('/api/kota')
      .set('x-access-token', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  test('GET kota with search like "%surabaya%"', async () => {
    const response = await supertest(app)
      .get('/api/kota?q=surabaya')
      .set('x-access-token', `Bearer ${token}`)
    expect(response.body?.data?.total_items).not.toBe(0)
  })

  test('GET kota by Id not found', async () => {
    const response = await supertest(app)
      .get('/api/kota/1')
      .set('x-access-token', `Bearer ${token}`)
    expect(response.status).toBe(404)
  })

  test('GET kota by Id is found', async () => {
    const response = await supertest(app)
      .get('/api/kota/3578')
      .set('x-access-token', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
})
