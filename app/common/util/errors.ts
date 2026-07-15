type ErrorResponse = { message?: string | string[] } | unknown;

export const getErrorMessage = (response: ErrorResponse): string => {
    if (response && typeof response === "object" && response !== null && "message" in response) {
        const msg = (response as { message?: string | string[] }).message;
        if (Array.isArray(msg)) {
            return formatErrorMessage(msg[0]);
        }
        if (typeof msg === "string") {
            return formatErrorMessage(msg);
        }
    }
    return "Unknown error occured";
};

const formatErrorMessage = (message: string) => {
    return message.charAt(0).toUpperCase() + message.slice(1);
};