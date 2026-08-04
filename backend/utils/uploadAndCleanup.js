import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import prepareImageForUpload from "./prepareImageForUpload.js"

// multer writes uploaded files to the OS temp dir with no cleanup of its own,
// and prepareImageForUpload may add a second resized temp copy — both need to
// be removed once Cloudinary has the image, or every upload leaks disk space.
const uploadAndCleanup = async (file) => {
    const uploadPath = await prepareImageForUpload(file.path)
    try {
        const result = await cloudinary.uploader.upload(uploadPath, { resource_type: "image" })
        return result.secure_url
    } finally {
        fs.unlink(file.path, () => {})
        if (uploadPath !== file.path) fs.unlink(uploadPath, () => {})
    }
}

export default uploadAndCleanup
