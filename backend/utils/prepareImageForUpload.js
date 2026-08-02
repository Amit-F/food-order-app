import sharp from "sharp"
import fs from "fs"
import os from "os"
import path from "path"

// Cloudinary's free plan hard-caps image uploads at 10MB regardless of upload
// method (chunked uploads don't bypass it) — this shrinks oversized images
// before they ever reach Cloudinary. Used both by the meal-photo upload flow
// and the one-time catalog migration script.
const MAX_BYTES = 10 * 1024 * 1024

const prepareImageForUpload = async (filePath) => {

    if (fs.statSync(filePath).size <= MAX_BYTES) {
        return filePath
    }

    const metadata = await sharp(filePath).metadata()
    let targetWidth = metadata.width
    const outputPath = path.join(os.tmpdir(), `${path.basename(filePath)}-${Date.now()}-resized.jpg`)

    while (true) {
        await sharp(filePath)
            .resize({ width: targetWidth })
            .jpeg({ quality: 85 })
            .toFile(outputPath)

        if (fs.statSync(outputPath).size <= MAX_BYTES || targetWidth <= 500) {
            break
        }

        targetWidth = Math.round(targetWidth * 0.75)
    }

    return outputPath

}

export default prepareImageForUpload
