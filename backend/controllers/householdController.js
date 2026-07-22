import crypto from "crypto"
import inviteModel from "../models/inviteModel.js"
import householdModel from "../models/householdModel.js"

const INVITE_EXPIRY_DAYS = 7;

// Route for generating an invite code/link for the cook's household
const createInvite = async (req, res) => {

    try {

        const code = crypto.randomBytes(6).toString('hex');

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRY_DAYS);

        const invite = await inviteModel.create({
            code,
            householdId: req.user.householdId,
            createdBy: req.user.id,
            expiresAt
        })

        res.json({ success: true, code: invite.code, expiresAt: invite.expiresAt })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Route for validating an invite code and returning the household name (public, used by the join page)
const getInvite = async (req, res) => {

    try {

        const { code } = req.params;

        const invite = await inviteModel.findOne({ code });

        if (!invite) {
            return res.json({ success: false, message: "Invalid invite code" })
        }
        if (invite.usedBy) {
            return res.json({ success: false, message: "This invite code has already been used" })
        }
        if (invite.expiresAt < new Date()) {
            return res.json({ success: false, message: "This invite code has expired" })
        }

        const household = await householdModel.findById(invite.householdId);

        res.json({ success: true, householdName: household.name })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { createInvite, getInvite }
