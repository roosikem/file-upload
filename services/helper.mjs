import axios from "axios";
import FormData from "form-data";

export default class Helper {
    static async callFileUploadAPI(url, data, transactionTypes) {
    try {
        const form = new FormData();

        // Append all non-file fields
        Object.entries(data).forEach(([key, value]) => {
        if (key !== "file" && key !== "filename") {
            form.append(key, value);
        }
        });

        // Append file (required)
        if (!data.file || !data.filename) {
        throw new Error("File upload requires both 'file' (Buffer) and 'filename'");
        }
        form.append("file", data.file, { filename: data.filename });

        // Log outgoing request
        LocalLogger.log(
        true,
        "Sending file upload request:" + JSON.stringify({ url, fields: Object.keys(data) })
        );
        await Helper.logger.log(
        "request-out",
        transactionTypes.contact_center,
        "[binary file omitted]",
        { baseUrl: url, headers: form.getHeaders(), statusCode: 200 }
        );

        // Axios call
        const resp = await axios.post(url, form, {
        headers: form.getHeaders(),
        maxBodyLength: Infinity, // allow big uploads
        });

        // Log incoming response
        if (resp?.data) {
        await Helper.logger.log(
            "response-in",
            transactionTypes.contact_center,
            resp.data,
            { baseUrl: url, headers: resp.headers, statusCode: resp.status }
        );
        return resp.data;
        }

        return null;
    } catch (e) {
        LocalLogger.log(false, "File Upload Exception:" + e);

        let errorData = null;
        if (e.response) {
        LocalLogger.log(
            false,
            `File Upload Error (${url})\n Response Data : ${JSON.stringify(
            e.response.data,
            null,
            2
            )}\n Status : ${e.response.status}`
        );
        errorData = {
            data: {
            isApiError: true,
            status: e.response.status,
            message: e.message,
            },
            headers: e.response.headers,
            status: e.response.status,
        };
        } else if (axios.isAxiosError(e)) {
        LocalLogger.log(
            false,
            `Axios File Upload Error (${url})\n Error : ${JSON.stringify(e, null, 2)}`
        );
        errorData = {
            status: 500,
            headers: {},
            data: {
            isApiError: true,
            status: 500,
            message: e.message,
            },
        };
        }

        return errorData;
    }
    }
}