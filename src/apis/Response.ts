interface ResponseInstant {
    success: Boolean;
    message: String;
    status: Number;
}
export interface ReturnResponse<T> extends ResponseInstant {
    data: T;
}

export interface ReturnListResponse<T> extends ResponseInstant {
    data: Array<T>;
}
