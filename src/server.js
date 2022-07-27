const app = require('./app')
const { APPLICATION } = require('./config/constant')

app.listen(APPLICATION.port, () => {
  console.log('app running on port:' + APPLICATION.port)
})
