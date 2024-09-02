// [
//     `id` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
//     `name` VARCHAR(50),
//     `address` VARCHAR(100),
//     `latitude` FLOAT NOT NULL,
//     `longitude` FLOAT NOT NULL
//   ]

import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.SQL2_HOST,
    user: process.env.SQL2_USER,
    password: process.env.SQL2_PASSWORD,
    database: "MasterDb",
    port: process.env.SQL2_PORT,
  })
  .promise();

export async function addData(name, address, latitude, longitude) {
  await pool.query(" USE " + process.env.SQL2_NAME);
  const newData = await pool.query(
    `INSERT INTO School (name, address, latitude, longitude) VALUES (?, ?, ?, ? );`,
    [name, address, latitude, longitude]
  );

  return newData;
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const latDiff = lat2 - lat1;
  const lonDiff = lon2 - lon1;
  return latDiff * latDiff + lonDiff * lonDiff;
}

function sortLocations(locations, referenceLatitude, referenceLongitude) {
  return locations.sort((a, b) => {
    const distanceA = calculateDistance(
      referenceLatitude,
      referenceLongitude,
      a.latitude,
      a.longitude
    );
    const distanceB = calculateDistance(
      referenceLatitude,
      referenceLongitude,
      b.latitude,
      b.longitude
    );
    return distanceA - distanceB;
  });
}

export async function sortedListOnProximity(
  referenceLatitude,
  referenceLongitude
) {
  await pool.query(" USE " + process.env.SQL2_NAME);
  const [result] = await pool.query("SELECT * FROM School");
  //   return result;
  const sorted_list = await sortLocations(
    result,
    referenceLatitude,
    referenceLongitude
  );
  return sorted_list;
}

await pool.query(" USE " + process.env.SQL2_NAME);
const res = await pool.query("SELECT * FROM School");
console.log(res);
