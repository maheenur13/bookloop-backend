'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validaterequest_1 = __importDefault(
  require('../../middlewares/validaterequest')
);
const myProfile_controller_1 = require('../my-profile/myProfile.controller');
const myProfile_validation_1 = require('../my-profile/myProfile.validation');
const admin_controller_1 = require('./admin.controller');
const admin_validation_1 = require('./admin.validation');
const router = express_1.default.Router();
router.post(
  '/create-admin',
  (0, validaterequest_1.default)(
    admin_validation_1.AdminValidation.createAdminZodSchema
  ),
  admin_controller_1.AdminController.createAdmin
);
router.post(
  '/login',
  (0, validaterequest_1.default)(
    admin_validation_1.AdminValidation.adminLoginZodSchema
  ),
  admin_controller_1.AdminController.loginAdmin
);
router.get(
  '/my-profile',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  myProfile_controller_1.MyProfileController.getProfileDetails
);
router.patch(
  '/my-profile',
  (0, validaterequest_1.default)(
    myProfile_validation_1.MyProfileValidation.updateProfileZodSchema
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  myProfile_controller_1.MyProfileController.updateProfile
);
router.get('/:id', admin_controller_1.AdminController.getAdmin);
exports.AdminRoutes = router;
