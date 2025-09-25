export function validateFileAgainstLimits(userData, fileName, buffer) {
  const maxFileSize = parseInt(userData["upload-max-file-size"], 10);
  const usedTotalSize = parseInt(userData["used-upload-max-total-size"], 10);
  const maxTotalSize = parseInt(userData["upload-max-total-size"], 10);
  const usedFiles = parseInt(userData["used-upload-max-files"], 10);
  const maxFiles = parseInt(userData["upload-max-files"], 10);
  const allowedTypes = userData["upload-file-types"].split(":");

  // File count check
  if (usedFiles >= maxFiles) {
    throw new Error(`Max files exceeded: used=${usedFiles}, allowed=${maxFiles}`);
  }

  // Single file size check
  if (buffer.length > maxFileSize) {
    throw new Error(`File exceeds max size: ${buffer.length} > ${maxFileSize}`);
  }

  // Total size check
  if (usedTotalSize + buffer.length > maxTotalSize) {
    throw new Error(
      `Upload exceeds total size: used=${usedTotalSize}, new=${buffer.length}, max=${maxTotalSize}`
    );
  }

  // File type check
  const ext = fileName.split(".").pop().toLowerCase();
  if (!allowedTypes.includes(ext)) {
    throw new Error(`File type .${ext} not allowed. Allowed: ${allowedTypes.join(", ")}`);
  }

  return true;
}