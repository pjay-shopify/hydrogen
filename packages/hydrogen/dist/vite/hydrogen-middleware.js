import crypto from "node:crypto";
import { createRequire } from "node:module";
import { createReadStream } from "node:fs";
import {
  clearHistory,
  emitRequestEvent,
  streamRequestEvents
} from "./request-events.js";
function setupHydrogenMiddleware(viteDevServer, options) {
  if (!options.isOxygen) {
    globalThis.__H2O_LOG_EVENT = (data) => {
      emitRequestEvent(data, viteDevServer.config.root);
    };
    viteDevServer.middlewares.use(function(req, res, next) {
      if (!/^\/__vite_/.test(req.url || "")) {
        req.headers["request-id"] ??= crypto.randomUUID();
        const startTimeMs = Date.now();
        let endTimeMs = 0;
        res.once("pipe", () => {
          endTimeMs = Date.now();
        });
        res.once("close", () => {
          emitRequestEvent(
            {
              __fromVite: true,
              eventType: "request",
              url: req.url,
              requestId: req.headers["request-id"],
              purpose: req.headers["purpose"],
              startTime: startTimeMs,
              endTime: endTimeMs || Date.now(),
              responseInit: {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: Object.entries(
                  res.getHeaders()
                )
              }
            },
            viteDevServer.config.root
          );
        });
      }
      next();
    });
  }
  if (options.disableVirtualRoutes) return;
  viteDevServer.middlewares.use(
    "/debug-network-server",
    function h2HandleSubrequestProfilerEvent(req, res) {
      req.method === "DELETE" ? clearHistory(req, res) : streamRequestEvents(req, res);
    }
  );
  viteDevServer.middlewares.use(
    "/graphiql/customer-account.schema.json",
    function h2HandleGraphiQLCustomerSchema(req, res) {
      const require2 = createRequire(import.meta.url);
      const filePath = require2.resolve(
        "@shopify/hydrogen/customer-account.schema.json"
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      createReadStream(filePath).pipe(res);
    }
  );
}
export {
  setupHydrogenMiddleware
};
