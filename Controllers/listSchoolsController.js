import { sortedListOnProximity } from "../database.js";
import {
  addressSchema,
  longitudeSchema,
  nameSchema,
  latitudeSchema,
} from "../schema.js";

const listSchools = async (req, res) => {
  try {
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    longitudeSchema.parse(longitude);
    latitudeSchema.parse(latitude);

    const sorted_list = await sortedListOnProximity(latitude, longitude);

    res.send({ status: 202, list: sorted_list });
  } catch (e) {
    res.send({ status: 500, error: e.message });
  }
};

export default listSchools;
