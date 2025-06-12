import { status } from "@grpc/grpc-js";
import { getSafContext } from "@saflib/node";
import { authServiceStorage } from "../../context.ts";
import { authDb } from "@saflib/auth-db";
import { GetUserProfileResponse, UserProfile } from "@saflib/auth-rpcs";
import { UnimplementedUsersService } from "@saflib/auth-rpcs";
import { Timestamp } from "../../../auth-rpcs/dist/google/protobuf/timestamp.ts";

export const handleGetUserProfile: UnimplementedUsersService["GetUserProfile"] =
  async (call, callback) => {
    const { log } = getSafContext();
    const request = call.request;

    try {
      const { dbKey } = authServiceStorage.getStore()!;

      // Get the user ID from the request
      const userId = request.user_id;
      if (!userId) {
        callback({
          code: status.INVALID_ARGUMENT,
          message: "User ID is required",
        });
        return;
      }

      // Get email auth by user ID
      const [emailAuths, user] = await Promise.all([
        authDb.emailAuth.getEmailAuthByUserIds(dbKey, [userId]),
        authDb.users.getById(dbKey, userId),
      ]);
      const emailAuth = emailAuths[0];

      if (!emailAuth || !user.result) {
        callback({
          code: status.NOT_FOUND,
          message: "User profile not found",
        });
        return;
      }

      log.info("GetUserProfile handler executed successfully", { userId });

      // Create proper response with UserProfile
      const userProfile = new UserProfile({
        user_id: emailAuth.userId,
        email: emailAuth.email,
        email_verified: !!emailAuth.verifiedAt,
        name: user.result.name ?? undefined,
        given_name: user.result.givenName ?? undefined,
        family_name: user.result.familyName ?? undefined,
        created_at: new Timestamp({
          seconds: user.result.createdAt.getTime() / 1000,
          nanos: 0,
        }),
      });

      const response = new GetUserProfileResponse({
        profile: userProfile,
      });

      callback(null, response);
    } catch (error) {
      log.error("Error in GetUserProfile handler", error);
      callback({
        code: status.INTERNAL,
        message: "Internal server error",
      });
    }
  };
