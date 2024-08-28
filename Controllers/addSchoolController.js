import { addData } from "../database.js";
import {
  addressSchema,
  longitudeSchema,
  nameSchema,
  latitudeSchema,
} from "../schema.js";

const addSchool = async (req, res) => {
  try {
    const name = req.body.name;
    const address = req.body.address;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    nameSchema.parse(name);
    addressSchema.parse(address);
    latitudeSchema.parse(latitude);
    longitudeSchema.parse(longitude);

    // console.log(req.body);

    const newData = await addData(name, address, latitude, longitude);
    res.send({ status: 200 });
  } catch (e) {
    res.send({ status: 500, error: e.message });
  }
};

export default addSchool;
