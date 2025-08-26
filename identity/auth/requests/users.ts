import { useQuery } from "@tanstack/vue-query";
import { client } from "./client";
import type { IdentityResponseBody } from "@saflib/identity-spec";
import { handleClientMethod } from "@saflib/vue";
import { TanstackError } from "@saflib/vue";
export const useUsersQuery = () => {
  return useQuery<IdentityResponseBody["listUsers"][200], TanstackError>({
    queryKey: ["auth", "users"],
    queryFn: async () => {
      return handleClientMethod(client.GET("/users"));
    },
  });
};
