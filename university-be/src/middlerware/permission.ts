import { NextFunction, Request, Response } from "express";
import UserGroupModel from "../models/user_group";
import { IsUser } from "../helper/userHelper";

export const permission = (module: string, reqpermission: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            console.group("Requested Permission")
            console.log('module: ', module);
            console.log('reqpermission: ', reqpermission);
            console.groupEnd()

            const userId = res.locals.userId;

            const user = await IsUser(userId);
            const userGroupID = user?.userGrpId


            const userGroup = await UserGroupModel.findById(userGroupID);

            if (!userGroup) {
                console.error("No user group found for ID:");
            }
            const permission = userGroup?.module_permission!

            if (!permission[module] || !permission[module].includes(reqpermission)) {
                res.status(403).json({
                    success: false,
                    message: "Forbidden: You do not have the required permission."
                });
            }
            next();
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: "Invalid Acsess failed",
                errors: error?.message || error
            });
        }
    }
}
