import suggestionModel from "../models/suggestionModel.js"

// Add Suggestion Function (any authenticated user, any household)
const addSuggestion = async (req, res) => {

    try {

        const { text } = req.body

        const trimmedText = (text || "").trim()
        if (!trimmedText) {
            return res.json({ success: false, message: "Suggestion text is required" })
        }

        const suggestion = new suggestionModel({
            authorId: req.user.id,
            text: trimmedText
        })

        await suggestion.save()

        res.json({ success: true, suggestion })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// List Suggestions Function (owner-only)
const listSuggestions = async (req, res) => {

    try {

        const suggestions = await suggestionModel
            .find()
            .populate('authorId', 'name')
            .sort({ createdAt: -1 })

        res.json({ success: true, suggestions })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Remove Suggestion Function (owner-only)
const removeSuggestion = async (req, res) => {

    try {

        const { id } = req.body

        await suggestionModel.findByIdAndDelete(id)

        res.json({ success: true, message: "Suggestion removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addSuggestion, listSuggestions, removeSuggestion }
