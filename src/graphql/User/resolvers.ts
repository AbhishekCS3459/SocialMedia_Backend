import RedisClient from "../../Redis/RedisClient";
import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/User";
const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    try {
      const cachedToken = await RedisClient.get(`userToken:${payload.email}`);
      if (cachedToken) {
        return cachedToken;
      }

      const token = await UserService.GetUserToken({
        email: payload.email,
        password: payload.password,
      });
      // Cache the token with an expiration (e.g., 86400==1day seconds)
      await RedisClient.setex(`userToken:${payload.email}`, 86400, token);
      return token;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },

  getCurrentUserLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      // Check if the user data is already in the cache
      const cachedUserData = await RedisClient.get(`userData:${id}`);

      if (cachedUserData) {
        return JSON.parse(cachedUserData);
      }

      const user = await UserService.getUserById(id);

      // Cache the user data with an expiration (e.g., 3600 seconds)
      await RedisClient.setex(`userData:${id}`, 3600, JSON.stringify(user));

      return user;
    }
    throw new Error("User not found");
  },
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const user = await UserService.createUser(payload);
    // Clear any cached data for this user when they create a new account
    await RedisClient.del(`userData:${user.id}`);

    return user.id;
  },
};
export const resolvers = { queries, mutations };
