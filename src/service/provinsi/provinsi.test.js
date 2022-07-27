const supertest = require('supertest')
const app = require('../../app')

const SECONDS = 1000
jest.setTimeout(70 * SECONDS)

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY1ODg5NDM2NSwiZXhwIjoxNjU4ODk3OTY1fQ.NOsVlwRAiEJ8zCm4lTZO0RITqi7xnQUX0ccnAVHxQe4'

describe('TEST service provinsi', () => {
  test('GET without header [x-access-token]', async () => {
    const response = await supertest(app).get('/api/provinsi')
    expect(response.status).toBe(401)
  })

  test('GET provinsi found', async () => {
    const response = await supertest(app)
      .get('/api/provinsi')
      .set('x-access-token', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  test('GET provinsi with search like "%aceh%"', async () => {
    const response = await supertest(app)
      .get('/api/provinsi?q=jawa')
      .set('x-access-token', `Bearer ${token}`)
    expect(response.body?.data?.total_items).not.toBe(0)
  })

  test('GET provinsi by Id not found', async () => {
    const response = await supertest(app)
      .get('/api/provinsi/1')
      .set('x-access-token', `Bearer ${token}`)
    expect(response.status).toBe(404)
  })
})
