import { DebugOptions } from "./cache/run-with-cache";

export type SpanEvent = {
  traceId: string;
  id: string;
  name: string;
  timestamp: number;
  duration: number;
  parentId?: string;
  tags: Record<string, string>;
};

export type SpanEmitter = (debugInfo: DebugOptions, startTime: number, cacheStatus?: string, root?: boolean) => void;

export function createSpanCollector(traceId: string = generateRandomHex(16)) {
  let spans = [] as SpanEvent[];

  function emitSpanEvent(debugInfo: DebugOptions, startTime: number, cacheStatus?: string, root?: boolean) {
    try {
      const endTime = Date.now();
      let displayName = "unknown";
  
      if (debugInfo?.displayName) {
        displayName = debugInfo.displayName;
      } else {
        if (debugInfo.graphql) {
          displayName = debugInfo.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/, ' ') || "GraphQL";
        }
      }
  
      if (cacheStatus) {
        displayName = `Cache [${cacheStatus}] ${displayName}`;
      }
  
      const trace = {
        traceId: traceId,
        id: root ? traceId : generateRandomHex(16),
        name: displayName,
        timestamp: startTime * 1000,
        duration: (endTime - startTime) * 1000,
        parentId: root ? undefined : traceId,
        tags: {
          'request.type': cacheStatus ? 'cache' : 'subrequest',
        }
      }
  
      spans.push(trace);
    } catch (error) {
      console.error(error);
    }
  }

  async function flushSpanEvents() {
    if (spans.length > 0) {
      const spansToFlush = spans;
      spans = [];
      await fetch("https://outbound-proxy.oxygen.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(spansToFlush),
      });
    }
  }

  return [emitSpanEvent, flushSpanEvents];
}


export function emitSpanEvent(debugInfo: DebugOptions, startTime: number, cacheStatus?: string, root?: boolean) {
  globalThis.__SPANS = globalThis.__SPANS || [];

  try {
    const traceId = ensureExpectedRequestId(debugInfo?.requestId || generateRandomHex(16));
    const endTime = Date.now();
    let displayName = "unknown";

    if (debugInfo?.displayName) {
      displayName = debugInfo.displayName;
    } else {
      if (debugInfo.graphql) {
        displayName = debugInfo.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/, ' ') || "GraphQL";
      }
    }

    if (cacheStatus) {
      displayName = `Cache [${cacheStatus}] ${displayName}`;
    }

    const trace = {
      traceId: traceId,
      id: root ? traceId : generateRandomHex(16),
      name: displayName,
      timestamp: startTime * 1000,
      duration: (endTime - startTime) * 1000,
      parentId: root ? undefined : traceId,
      tags: {
        'request.type': cacheStatus ? 'cache' : 'subrequest',
      }
    }

    globalThis.__SPANS.push(trace);
  } catch (error) {
    console.error(error);
  }
}

export async function flushSpanEvents() {
  if (globalThis.__SPANS) {
    const spans = globalThis.__SPANS;
    globalThis.__SPANS = [];
    await fetch("https://outbound-proxy.oxygen.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spans),
    });
  }
}

function ensureExpectedRequestId(id: string) {
  const idArray = id.split('.');
  if (idArray.length === 2) {
    return idArray[1];
  } else {
    return id;
  }
}

function generateRandomHex(len: number) {
  let result = '';
  while (result.length < len) {
    result += Math.floor(Math.random() * 16).toString(16);
  }
  return result.substring(0, len);
}
