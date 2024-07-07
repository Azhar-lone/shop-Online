import generalModel from "../../../model/generalModel.js";

/**
 * Adds multiple new countries to the countries list in the generalModel.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export async function updateCountries(req, res) {
  try {
    const { countries } = req.body; // Expecting an array of countries

    // Use the $addToSet operator with $each to add multiple countries
    const result = await generalModel.updateOne(
      {},
      { $addToSet: { countries: { $each: countries } } }
    );

    // If no documents were modified, it means all countries were already included
    if (result.nModified === 0) {
      return res.status(400).json({
        msg: "All countries were already included",
      });
    }

    // If some documents were modified, return success
    return res.status(200).json({
      msg: "Countries added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

/**
 * Deletes multiple countries from the countries list in the generalModel.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export async function deleteCountry(req, res) {
  try {
    const { countries } = req.body; // Expecting an array of countries

    // Use the $pullAll operator to remove multiple countries
    const result = await generalModel.updateOne(
      {},
      { $pullAll: { countries: countries } }
    );

    // If no documents were modified, it means none of the countries were found
    if (result.nModified === 0) {
      return res.status(400).json({
        msg: "None of the countries were found",
      });
    }

    // If some documents were modified, return success
    return res.status(200).json({
      msg: "Countries deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
