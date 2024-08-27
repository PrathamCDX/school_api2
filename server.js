import express from "express";
import dotenv from "dotenv";
import { addData, sortedListOnProximity } from "./database.js";
import {
  addressSchema,
  longitudeSchema,
  nameSchema,
  latitudeSchema,
} from "./validation.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/listSchools", async (req, res) => {
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
});

app.post("/addSchool", async (req, res) => {
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
});

try {
  app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`App listening on port ${process.env.EXPRESS_PORT}`);
  });
} catch (err) {
  console.error(err);
}
