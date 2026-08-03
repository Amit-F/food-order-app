// One-time migration: seeds Meal documents from the original static ecommerce
// catalog (frontend/src/assets/assets.js) into a cook's household, uploading each
// image to Cloudinary for real. Ingredients are left empty — that data never
// existed in the old app, so it has to be added afterward via the Edit Meal page.
//
// Usage:
//   node --experimental-loader ./scripts/imageLoader.mjs scripts/migrateMeals.js <cook-email> [--limit=N]
//
// Idempotent: re-running skips any meal that already exists (by name) in that
// household, so a failed/interrupted run is safe to just run again.

import 'dotenv/config'
import fs from 'fs'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import mealModel from '../models/mealModel.js'
import userModel from '../models/userModel.js'
import prepareImageForUpload from '../utils/prepareImageForUpload.js'
import { products } from '../../frontend/src/assets/assets.js'

const cookEmail = process.argv[2]
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) : null

async function main() {

    if (!cookEmail) {
        console.error('Usage: node --experimental-loader ./scripts/imageLoader.mjs scripts/migrateMeals.js <cook-email> [--limit=N]')
        process.exit(1)
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/food-order-app`)

    const cook = await userModel.findOne({ email: cookEmail, role: 'cook' })

    if (!cook) {
        console.error(`No cook found with email ${cookEmail}`)
        process.exit(1)
    }

    const toMigrate = limit ? products.slice(0, limit) : products

    console.log(`Migrating ${toMigrate.length} meal(s) into household ${cook.householdId} (cook: ${cook.name})`)

    let created = 0
    let skipped = 0

    for (const product of toMigrate) {

        const exists = await mealModel.findOne({ householdId: cook.householdId, name: product.name })

        if (exists) {
            console.log(`SKIP (already exists): ${product.name}`)
            skipped++
            continue
        }

        console.log(`Uploading ${product.image.length} image(s) for "${product.name}"...`)

        const imageUrls = []
        for (const imgPath of product.image) {
            // imgPath is a permanent file in frontend/src/assets — never delete it.
            // Only prepareImageForUpload's resized temp copy (a different path) gets cleaned up.
            const uploadPath = await prepareImageForUpload(imgPath)
            const result = await cloudinary.uploader.upload(uploadPath, { resource_type: 'image' })
            if (uploadPath !== imgPath) fs.unlink(uploadPath, () => {})
            imageUrls.push(result.secure_url)
        }

        const servingsOptions = product.servings.map(Number)

        await mealModel.create({
            householdId: cook.householdId,
            createdBy: cook._id,
            name: product.name,
            description: product.description,
            timeToPrepare: product.timeToPrepare,
            additionalPrepTime: product.additionalPrepTime,
            image: imageUrls,
            category: product.category,
            subCategory: product.subCategory,
            servingsOptions,
            ingredients: [],
            bestSeller: product.bestseller
        })

        console.log(`Created: ${product.name}`)
        created++

    }

    console.log(`\nDone. Created ${created}, skipped ${skipped} (already existed).`)

    await mongoose.disconnect()

}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
