import { fileUploadSchema } from "../validations/fileUploadValidation.js";
import { UploadService } from "../services/uploadService.js";

export async function uploadFileController(req, res) {
  try {
    // Validate input
    const { error, value } = fileUploadSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Call service
    const response = await UploadService.uploadFile(value);
    res.status(200).json({ success: true, response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}