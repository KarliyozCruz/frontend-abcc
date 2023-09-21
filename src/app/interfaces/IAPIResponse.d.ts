declare interface IAPIResponse<T> {
    ok: boolean;
    data?: T;
    error?: any;
}