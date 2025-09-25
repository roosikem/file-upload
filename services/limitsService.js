import axios from "axios";
import { config } from "../config/env.js";

export class LimitsService {
  static async getLimits(chatId) {
    const url = `${config.baseUrl}/{{server}}/2/chat/${config.serviceName}/${chatId}/file/limits`;

    const body = new URLSearchParams({
      userId: config.userId,
      secureKey: config.secureKey,
      alias: config.hostAlias,
    });

    const { data } = await axios.post(url, body.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return data.userData;
  }
}