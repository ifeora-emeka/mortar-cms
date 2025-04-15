
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
export type HandlerOptions = {
    segments: string[],
    request: Request,
    method: RequestMethod,
    params: { segments: string[] },
}