import 'dotenv/config'
import app from './app.js'
import sequelize from './config/db.js'

const PORT = process.env.PORT || 5000


// Checking connection with database.
sequelize.authenticate()
  .then(() => {
    sequelize.sync({ alter: true })
    console.log("✅ Database connected successfully.")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("❌ Unable to connect to DB:", err);
  });
