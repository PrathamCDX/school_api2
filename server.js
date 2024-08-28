import express from "express";
import dotenv from "dotenv";
import { addData, sortedListOnProximity } from "./database.js";
import {
  addressSchema,
  longitudeSchema,
  nameSchema,
  latitudeSchema,
} from "./schema.js";
import authRouter from "./Routings/authRouter.js";
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

app.use("", authRouter);

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from(htmlReqResTemplate));
});

try {
  app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`App listening on port ${process.env.EXPRESS_PORT}`);
  });
} catch (err) {
  console.error(err);
}
