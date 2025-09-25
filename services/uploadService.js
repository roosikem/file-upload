import axios from "axios";
import FormData from "form-data";
import fetch from "node-fetch";
import { config } from "../config/env.js";

export class UploadService {
  static async uploadFile({ s3Url, chatId, fileDescription, userKey1 }) {
    try {
      // Step 1: Download file from S3
      const response = await fetch(s3Url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file from S3: ${response.statusText}`);
      }
      const buffer = await response.buffer();
      const fileName = s3Url.split("/").pop() || "upload.bin";

      // Step 2: Prepare form-data
      const form = new FormData();
      form.append("userId", config.userId);
      form.append("secureKey", config.secureKey);
      form.append("alias", config.hostAlias);
      form.append("file", buffer, { filename: fileName });

      if (fileDescription) {
        form.append("userData[file-description]", fileDescription);
      }
      if (userKey1) {
        form.append("userData[userKey1]", userKey1);
      }

      // Step 3: Send request to Server
      const url = `${config.baseUrl}/{{server}}/2/chat/${config.serviceName}/${chatId}/file`;

      const result = await axios.post(url, form, {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
      });

      return result.data;
    } catch (err) {
      console.error("Upload Error:", err.message);
      throw new Error("File upload failed: " + err.message);
    }
  }
}