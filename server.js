const { app } = require('./app')
const { db } = require('./utils/database')
const { relationUserRepair } = require('./utils/relations')

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

relationUserRepair()

db.sync()
  .then(() => console.log('Database Synced'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5051

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`)
})