

// Add Product Function
const addProduct = async (req, res) => {

    try {
        
        const {name, description, price, timeToPrepare, category, subCategory, servings, bestSeller, additionalPrepTime } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const image5 = req.files.image5 && req.files.image5[0]

        console.log(name, description, price, timeToPrepare, category, subCategory, servings, bestSeller, additionalPrepTime);
        console.log(image1, image2, image3, image4, image5);

        res.json({})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }


}


// Remove Product Function
const removeProduct = async (req, res) => {


}


// Single Product Details Function
const singleProduct = async (req, res) => {


}


// List Product Function
const listProducts = async (req, res) => {


}



export { addProduct, removeProduct, singleProduct, listProducts }