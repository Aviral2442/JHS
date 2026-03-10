import fs from "fs";
import path from "path";

// export const saveBase64File = (
//   base64Data: string,
//   folderName: string,
//   fileName: string,
//   extension = "jpg"
// ) => {
//   // remove data:mime;base64, if present
//   const cleanBase64 = base64Data.includes(",")
//     ? base64Data.split(",")[1]
//     : base64Data;

//   const buffer = Buffer.from(cleanBase64, "base64");

//   // create directory
//   const uploadDir = path.join("uploads", folderName);
//   fs.mkdirSync(uploadDir, { recursive: true });

//   // save file with extension
//   const finalFileName = `${fileName}-${Date.now()}.${extension}`;
//   const filePath = path.join(uploadDir, finalFileName);

//   fs.writeFileSync(filePath, buffer);

//   return `/${uploadDir}/${finalFileName}`.replace(/\\/g, "/");
// };


// without extension
export const saveBase64File = (
  base64Data: string,
  folderName: string,
  fileName: string
) => {
  try {
    // Remove data URI prefix if exists (optional)
    const cleanBase64 = base64Data.includes(",")
      ? base64Data.split(",")[1]
      : base64Data;

    const buffer = Buffer.from(cleanBase64, "base64");

    // Detect file type from magic numbers
    let extension = "jpg"; // default

    //     if (buffer[0] === 0x89 && buffer[1] === 0x50) {
    //   extension = "png";
    // } else if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    //   extension = "jpg";
    // } else if (buffer[0] === 0x47 && buffer[1] === 0x49) {
    //   extension = "gif";
    // } else if (buffer[0] === 0x25 && buffer[1] === 0x50) {
    //   extension = "pdf";
    // } else if (buffer[0] === 0x52 && buffer[1] === 0x49) {
    //   extension = "webp";
    // }

    if (
      buffer.slice(4, 8).toString() === "ftyp" &&
      (buffer.slice(8, 12).toString() === "avif" ||
        buffer.slice(8, 12).toString() === "avis")
    ) {
      extension = "avif";
    }
    else if (buffer[0] === 0x89 && buffer[1] === 0x50) {
      extension = "png";
    }
    else if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      extension = "jpg";
    }
    else if (buffer[0] === 0x47 && buffer[1] === 0x49) {
      extension = "gif";
    }
    else if (buffer[0] === 0x25 && buffer[1] === 0x50) {
      extension = "pdf";
    }
    else if (
      buffer.slice(0, 4).toString() === "RIFF" &&
      buffer.slice(8, 12).toString() === "WEBP"
    ) {
      extension = "webp";
    }

    // Create directory
    const uploadDir = path.join("uploads", folderName);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate filename
    const finalFileName = `${fileName}-${Date.now()}.${extension}`;

    const filePath = path.join(uploadDir, finalFileName);

    // Save file
    fs.writeFileSync(filePath, buffer);

    // Return public path
    return `/${uploadDir}/${finalFileName}`.replace(/\\/g, "/");

  } catch (error) {
    console.error("Base64 Save Error:", error);
    throw new Error("Failed to save file");
  }
};
