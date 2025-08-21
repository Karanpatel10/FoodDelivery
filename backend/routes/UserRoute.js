import express from 'express';
import {deleteprofile, loginUser,profileupdate,registerUser, updateprofileinfo} from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js';

const userRouter=express.Router()

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.get('/login/profile',authMiddleware,profileupdate)
userRouter.put('/login/profile/update',authMiddleware,updateprofileinfo)
userRouter.delete('/login/profile/delete',authMiddleware,deleteprofile)

export default userRouter;