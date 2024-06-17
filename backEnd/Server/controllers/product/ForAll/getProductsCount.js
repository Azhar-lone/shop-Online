import productModel from "../../../model/productModel.js"


const getProductsCount = async (req, res) => {



    try {

        let count = await productModel.estimatedDocumentCount()
        if (!count) {
            return res.status(404).json({
                msg: "failed to count documents"
            })
        }
        return res.status(200).json({
            count
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

export default getProductsCount
