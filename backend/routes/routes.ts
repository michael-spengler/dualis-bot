import { Router } from "../deps.ts"
import authMiddleware from "../middleware/authMiddleware.ts"

import UserController from './users.ts';
import AuthController from './auth.ts'

const router = Router();

router.get('/user', UserController.getLoggedInUser);
router.put('/user', UserController.updateLoggedInUser)
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser)

export default router;