export class ApiResponseError extends Error {
    constructor(status: number) {
        super();
        var mes = "";
        switch (status) {
            case 400: // BadRequest
                mes = "400 BadRequest";
                break;
            case 401:
                mes = "401 Unauthorized";
                break;
            case 403:
                mes = "403 Forbidden access";
                break;
            case 404:
                mes = "404 Page not found";
                break;
            case 405:
                mes = "405 Method not allowed";
                break;
            case 408:
                mes = "408 Request timeout";
                break;
            case 409:
                mes = "409 Conflict";
                break;
            case 429:
                mes = "429 Too Many Requests ";
                break;
            case 500:
                mes = "500 Internal Server Error ";
                break;
            case 503:
                mes = "503 Service Unavailable ";
                break;
            default:
                mes = `Returned Status code ${status}`;
                break;
        }
        this.name = `ApiResponseError`;
        this.message = ` ${mes} from RESTful API server.`;
    }
};