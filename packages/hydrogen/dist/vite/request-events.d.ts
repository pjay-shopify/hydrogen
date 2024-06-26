import { IncomingMessage, ServerResponse } from 'node:http';

type RequestEventPayload = {
    __fromVite?: boolean;
    url: string;
    eventType: 'request' | 'subrequest';
    requestId?: string | null;
    purpose?: string | null;
    startTime: number;
    endTime?: number;
    cacheStatus?: 'MISS' | 'HIT' | 'STALE' | 'PUT';
    waitUntil?: ExecutionContext['waitUntil'];
    graphql?: string | null;
    stackInfo?: {
        file?: string;
        func?: string;
        line?: number;
        column?: number;
    };
    responsePayload?: any;
    responseInit?: Omit<ResponseInit, 'headers'> & {
        headers?: [string, string][];
    };
    cache?: {
        status?: string;
        strategy?: string;
        key?: string | readonly unknown[];
    };
    displayName?: string;
};
declare function emitRequestEvent(payload: RequestEventPayload, root: string): void;
declare function clearHistory(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void;
declare function streamRequestEvents(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void;

export { type RequestEventPayload, clearHistory, emitRequestEvent, streamRequestEvents };
