import type {
  UntypedServiceImplementation,
  UntypedHandleCall,
  handleUnaryCall,
  ServerUnaryCall,
  sendUnaryData,
} from "@grpc/grpc-js";
import type { ServiceImplementationWrapper } from "@saflib/grpc-node";
import {
  type Auth,
  type SafContext,
  safContextStorage,
  type SafReporters,
  safReportersStorage,
  getServiceName,
  getSafReporters,
} from "@saflib/node";
import { SafAuth } from "@saflib/grpc-specs";
import { createLogger } from "@saflib/node";
import { status } from "@grpc/grpc-js";
import { AsyncLocalStorage } from "async_hooks";
import { defaultErrorReporter } from "../node/src/errors.ts";

export type SafServiceImplementationWrapper = (
  impl: UntypedServiceImplementation,
  subsystemName: string,
) => UntypedServiceImplementation;

export const addSafContext: SafServiceImplementationWrapper = (
  impl,
  subsystemName,
) => {
  const wrappedService: UntypedServiceImplementation = {};

  for (const [methodName, methodImpl] of Object.entries(impl)) {
    const impl = methodImpl as handleUnaryCall<any, any>;
    const wrappedMethod: handleUnaryCall<any, any> = (call, callback) => {
      // Create the context for this request
      const reqId: string = call.request?.request?.id || "no-request-id";
      let auth: Auth | undefined = undefined;
      const authFromRequest = call.request.auth;
      if (authFromRequest instanceof SafAuth) {
        if (
          !authFromRequest.user_id ||
          !authFromRequest.user_email ||
          !authFromRequest.user_scopes
        ) {
          throw new Error("Invalid auth context");
        }
        auth = {
          userId: authFromRequest.user_id,
          userEmail: authFromRequest.user_email,
          userScopes: authFromRequest.user_scopes,
        };
      }
      const context: SafContext = {
        requestId: reqId,
        serviceName: getServiceName(),
        subsystemName: "grpc." + subsystemName,
        operationName: methodName,
        auth,
      };
      const logger = createLogger(context);
      const reporters: SafReporters = {
        log: logger,
        logError: defaultErrorReporter,
      };
      // Run the original implementation within the context
      return safContextStorage.run(context, () => {
        return safReportersStorage.run(reporters, () => {
          runGrpcMethod(impl, call, callback);
        });
      });
    };
    wrappedService[methodName] = wrappedMethod;
  }
  return wrappedService;
};

export function runGrpcMethod(
  methodImpl: handleUnaryCall<any, any>,
  call: ServerUnaryCall<any, any>,
  callback: sendUnaryData<any>,
) {
  const { logError } = getSafReporters();
  try {
    const result = methodImpl(call, callback) as any;
    if (result instanceof Promise) {
      return result.catch((error) => {
        const e = error as Error;
        logError(e);
        callback({ code: status.INTERNAL, message: e.message } as any, null);
      });
    }
    return result;
  } catch (error) {
    const e = error as Error;
    logError(e);
    callback({ code: status.INTERNAL, message: e.message } as any, null);
  }
}

export function makeGrpcServerContextWrapper(
  storage: AsyncLocalStorage<any>,
  context: any,
) {
  const wrapper: ServiceImplementationWrapper = (impl) => {
    const wrappedService: UntypedServiceImplementation = {};

    for (const [methodName, methodImpl] of Object.entries(impl)) {
      const wrappedMethod: UntypedHandleCall = (call: any, callback: any) => {
        return storage.run(context, () => {
          return methodImpl(call, callback);
        });
      };
      wrappedService[methodName] = wrappedMethod;
    }
    return wrappedService;
  };
  return wrapper;
}
