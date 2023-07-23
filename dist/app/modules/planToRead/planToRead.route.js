"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanTOReadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validaterequest_1 = __importDefault(require("../../middlewares/validaterequest"));
const planToRead_controller_1 = require("./planToRead.controller");
const planToRead_validation_1 = require("./planToRead.validation");
const router = express_1.default.Router();
router.post('/', (0, validaterequest_1.default)(planToRead_validation_1.PlanToReadValidation.planToReadZonSchema), (0, auth_1.default)(), planToRead_controller_1.PlanToReadController.addPlanToReading);
router.get('/', (0, auth_1.default)(), planToRead_controller_1.PlanToReadController.getAllPlanToReading);
router.patch('/:id', (0, validaterequest_1.default)(planToRead_validation_1.PlanToReadValidation.updateReadingStatusZonSchema), (0, auth_1.default)(), planToRead_controller_1.PlanToReadController.updateReadingStatus);
exports.PlanTOReadRoutes = router;
