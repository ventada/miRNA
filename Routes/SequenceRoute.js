const { register, login } = require("../controllers/AuthController")
const { getRandomSequence } = require("../controllers/SequenceController")
const { checkUser } = require("../middleware/AuthMiddleware")

const router = require("express").Router()



router.get('/random',getRandomSequence)

module.exports = router