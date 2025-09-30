"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permission = void 0;
const user_group_1 = __importDefault(require("../models/user_group"));
const userHelper_1 = require("../helper/userHelper");
const permission = (module, reqpermission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.group("Requested Permission");
            console.log('module: ', module);
            console.log('reqpermission: ', reqpermission);
            console.groupEnd();
            const userId = res.locals.userId;
            const user = yield (0, userHelper_1.IsUser)(userId);
            const userGroupID = user === null || user === void 0 ? void 0 : user.userGrpId;
            const userGroup = yield user_group_1.default.findById(userGroupID);
            if (!userGroup) {
                console.error("No user group found for ID:");
            }
            const permission = userGroup === null || userGroup === void 0 ? void 0 : userGroup.module_permission;
            if (!permission[module] || !permission[module].includes(reqpermission)) {
                res.status(403).json({
                    success: false,
                    message: "Forbidden: You do not have the required permission."
                });
            }
            next();
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: "Invalid Acsess failed",
                errors: (error === null || error === void 0 ? void 0 : error.message) || error
            });
        }
    });
};
exports.permission = permission;
