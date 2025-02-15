import {
  createUserController,
  createUserForRootController,
  deleteUserStatusController,
  getAllUserFromWorkshopController,
  updateUserController,
  updateUserStatusController
} from 'controllers/user'
import {
  createUserValidation,
  updateUserStatusValidation,
  updateUserValidation
} from 'middlewares/params'
import { Router } from 'express'
import { authUserAdminMiddleware, authUserRootMiddleware } from 'middlewares/auth'

export const router = Router()
// get
router.get(
  '/get/all',
  authUserAdminMiddleware,
  getAllUserFromWorkshopController
)

// actions
router.post(
  '/create',
  authUserAdminMiddleware,
  ...createUserValidation,
  createUserController
)


// router for admin user
router.post(
  '/create',
  authUserAdminMiddleware,
  ...createUserValidation,
  createUserController
)

// router for root user
router.post(
  '/create/assignWorkshop',
  authUserRootMiddleware,
  ...createUserValidation,
  createUserForRootController
)

router.put(
  '/update',
  authUserRootMiddleware,
  ...updateUserValidation,
  updateUserController
)

router.put(
  '/update/status',
  authUserRootMiddleware,
  ...updateUserStatusValidation,
  updateUserStatusController
)

router.delete(
  '/',
  authUserRootMiddleware,
  ...updateUserStatusValidation,
  deleteUserStatusController
)
