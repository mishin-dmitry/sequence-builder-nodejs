import {Router} from 'express'
import {getUser} from '../controllers/user.controller'
import {verifyToken, checkUserExisting} from '../middlewares'

const router = Router()

router.get('/getUser', verifyToken, checkUserExisting, getUser)

export = router
