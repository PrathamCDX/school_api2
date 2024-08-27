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
const htmlReqResTemplate = `  <div className='py-2 pl-2 font-bold text-3xl'>
            <div>
                POST: /addSchool
            </div>
            <div>
                request: {name : string, address: string, latitude: number, longitude: number}

            </div>
            <div>
                response: {status: number}, if error: {status: number, error: error}

            </div>
            <div>
                GET: /listSchools
            </div>

            <div>
                request: { latitude: number, longitude: number}
            </div>
            <div>
                response: {status: number, list: Object[]}, if error: {status: number, error: error}
            </div>
        </div>`;

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from(htmlReqResTemplate));
});

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
