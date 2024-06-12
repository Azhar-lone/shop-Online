import generalModel from "../../../model/generalModel.js"



export async function updateCountries(req, res) {
    try {
        const { country } = req.body

        let object = await generalModel.findOne({}).select("countries")

        let already = object.countries.find((value) => {
            if (value === country)
                return true
        })

        if (already) {
            return res.status(401).json({
                msg: 'already included country'
            })
        }



        object.countries.push(country)
        let done = await object.save()
        if (done) {
            return res.status(200).json({
                msg: "country uploaded"

            })
        }

        return res.status(401).json({
            msg: "failed to upload country"

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}





export async function deleteCountry(req, res) {
    try {
        const { country } = req.body

        let object = await generalModel.findOne({}).select("countries")



        let already = object.countries.findIndex(value => {
            if (value === country)
                return true
        })
        console.log(already)

        if (already === -1) {
            return res.status(401).json({
                msg: 'country not found'
            })
        }

        object.countries.splice(already, 1)

        let done = await object.save()
        if (done) {
            return res.status(200).json({
                msg: "country delete"

            })
        }

        return res.status(401).json({
            msg: "failed to upload country"

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}