'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validaterequest_1 = __importDefault(
  require('../../middlewares/validaterequest')
);
const myProfile_controller_1 = require('../my-profile/myProfile.controller');
const myProfile_validation_1 = require('../my-profile/myProfile.validation');
const user_controller_1 = require('./user.controller');
const user_validation_1 = require('./user.validation');
const router = express_1.default.Router();
router.get(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.getAllUser
);
router.get(
  '/my-profile',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.SELLER
  ),
  myProfile_controller_1.MyProfileController.getProfileDetails
);
router.patch(
  '/my-profile',
  (0, validaterequest_1.default)(
    myProfile_validation_1.MyProfileValidation.updateProfileZodSchema
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.SELLER
  ),
  myProfile_controller_1.MyProfileController.updateProfile
);
router.patch(
  '/:id',
  (0, validaterequest_1.default)(
    user_validation_1.UserValidation.updateUserZodSchema
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.updateUser
);
router.get(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.getSingleUser
);
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.deleteUser
);
exports.UserRoutes = router;
