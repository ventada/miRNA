const { register, login } = require("../controllers/AuthController")
const { checkUser } = require("../middleware/AuthMiddleware")

const router = require("express").Router()



router.post('/',checkUser)
router.post('/register',register)
router.get('/login',(req,res)=> res.send('hi'))
router.post('/login',login)


module.exports = router