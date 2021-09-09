export interface Response<T> {
    data: T;
    headers?: Record<string, string>;
}
