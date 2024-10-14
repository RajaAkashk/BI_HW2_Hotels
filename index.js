const { intializeDatabase } = require("./db/db.connect");
const Hotels = require("./models/hotel.models");

const express = require("express");
const app = express();
app.use(express.json());

intializeDatabase();

const timeout = require('connect-timeout');
app.use(timeout('30s'));

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors());

const newHotel1 = {
  name: "New Hotel",
  category: "Mid-Range",
  location: "123 Main Street, Frazer Town",
  rating: 4.0,
  reviews: [],
  website: "https://hotel-example.com",
  phoneNumber: "+1234567890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Room Service"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel-photo1.jpg",
    "https://example.com/hotel-photo2.jpg",
  ],
};

const newHotel2 = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: [
    "https://example.com/hotel1-photo1.jpg",
    "https://example.com/hotel1-photo2.jpg",
  ],
};

const newHotel3 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: [
    "Room Service",
    "Horse riding",
    "Boating",
    "Kids Play Area",
    "Bar",
  ],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel2-photo1.jpg",
    "https://example.com/hotel2-photo2.jpg",
  ],
};

async function createNewHotel(newHotel) {
  try {
    const hotel = new Hotels(newHotel);
    const saveHotel = await hotel.save();
    // console.log("New Hotel Added:", saveHotel);
    return saveHotel;
  } catch (error) {
    throw error;
  }
}
app.post("/hotels", async (req, res) => {
  try {
    const savedNewHotel = await createNewHotel(req.body);
    res
      .status(201)
      .json({ message: "New Hotel added successfully.", Hotel: savedNewHotel });
  } catch {
    res.status(500).json({ error: "Failed to add hotel." });
  }
});

//function to read all hotels from the database.
async function allHotels() {
  try {
    const hotel = await Hotels.find();
    // console.log("ALL HOTELS:", hotel);
    return hotel;
  } catch (error) {
    throw error;
  }
}
// allHotels();

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await allHotels();
    if (hotels != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

//function to read a hotel by its name ("Lake View")
async function readByName(hotelName) {
  try {
    const hotel = await Hotels.findOne({ name: hotelName });
    // console.log("HOTEL BY NAME:", hotel);
    return hotel;
  } catch (error) {
    throw error;
  }
}
// readByName("Lake View");
app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotels = await readByName(req.params.hotelName);
    if (hotels != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

//function to read all hotels which offers parking space

async function readByParkingSpace() {
  try {
    const hotel = await Hotels.find({ isParkingAvailable: true });
    console.log("Parking Available:", hotel);
  } catch (error) {
    console.log("Error in finding.", error);
  }
}
// readByParkingSpace();

//function to read all hotels which has restaurant available

async function readByRestaurantAvailable() {
  try {
    const hotel = await Hotels.find({ isRestaurantAvailable: true });
    console.log("Restaurant Available:", hotel);
  } catch (error) {
    console.log("Error in finding.", error);
  }
}
// readByRestaurantAvailable();

// function to read all hotels by category ("Mid-Range")

async function readByRestaurantCategory(selectedCategory) {
  try {
    const hotel = await Hotels.find({ category: selectedCategory });
    console.log("Restaurant Category:", hotel);
  } catch (error) {
    console.log("Error in finding.", error);
  }
}

// readByRestaurantCategory("Mid-Range");

// function to read all hotels by price range ("$$$$ (61+)").

async function readByRestaurantPrice(hotelPriceRange) {
  try {
    const hotel = await Hotels.find({ priceRange: hotelPriceRange });
    console.log("Restaurant hotel Price Range:", hotel);
  } catch (error) {
    console.log("Error in finding.", error);
  }
}

// readByRestaurantPrice("$$$$ (61+)");

// function to read hotels by phone number
async function readByHotelNumber(hoteNumber) {
  try {
    const hotel = await Hotels.find({ phoneNumber: hoteNumber });
    // console.log("Hotel Of Rating:", hotel);
    return hotel;
  } catch (error) {
    console.log("Error in finding.", error);
  }
}
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readByHotelNumber(req.params.phoneNumber);
    if (hotel != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Connot find hotel." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

// function to read all hotels with rating
async function readByHotelRating(hotelOfRating) {
  try {
    const hotel = await Hotels.find({ rating: hotelOfRating });
    // console.log("Hotel Of Rating:", hotel);
    return hotel;
  } catch (error) {
    console.log("Error in finding.", error);
  }
}
// readByHotelRating("4");
app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotel = await readByHotelRating(req.params.hotelRating);
    if (hotel != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Connot find hotel." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

// function to read all hotels with Category
async function readByHotelCategory(hotelCategory) {
  try {
    const hotel = await Hotels.find({ category: hotelCategory });
    return hotel;
  } catch (error) {
    console.log("Error in finding.", error);
  }
}
app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotel = await readByHotelCategory(req.params.hotelCategory);
    if (hotel != 0) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Connot find hotel." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

async function updateHotelCheckouttime(hotelId, UpdatedCheckoutTime) {
  try {
    const updatedHotelData = await Hotels.findByIdAndUpdate(
      { _id: hotelId },
      { checkOutTime: UpdatedCheckoutTime },
      { new: true }
    );
    console.log("updated Hotel Data:", updatedHotelData);
  } catch (error) {
    console.log("Error in updating checkout timing.", error);
  }
}
// updateHotelCheckouttime("66f14f14e6afd27d14f5fa66", "11 Am");

async function updateHotelRating(hotelId, updatedData) {
  try {
    const updatedHotelData = await Hotels.findByIdAndUpdate(
      hotelId,
      updatedData
      // { new: true }
    );
    // console.log("Updated hoptel Rating:", updatedHotelData);
    return updatedHotelData;
  } catch (error) {
    console.log("Error in updating hotel's rating.", error);
  }
}
app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const hotelUpdatedData = await updateHotelRating(
      req.params.hotelId,
      req.body
    );
    if (hotelUpdatedData) {
      res.status(200).json({
        message: "Updated successfully.",
        UpdatedHotel: hotelUpdatedData,
      });
    } else {
      res.status(404).json({ error: "Error in updating." });
    }
  } catch {
    console.log("Error in POST /hotels/:hotelId", error);
    res.status(500).json({ error: "Failed to connect." });
  }
});
// updateHotelRating("Sunset Resort", { rating: 4.2 });

async function updateHotelNumber(hotelNumber, updatedNumber) {
  try {
    const updatedHotelData = await Hotels.findOneAndUpdate(
      { phoneNumber: hotelNumber },
      { phoneNumber: updatedNumber },
      { new: true }
    );
    console.log("Updated hotel phone number:", updatedHotelData);
  } catch (error) {
    console.log("Error in updatin hotel number.", error);
  }
}
// updateHotelNumber("+1299655890", "+1997687392");

// async function deleteHotel(hotelId) {
//   try {
//     const deletedData = await Hotels.findByIdAndDelete(hotelId);
//     console.log("Deleted hotel:", deletedData);
//   } catch (error) {
//     console.log("Error in deleting hotel by id.", error);
//   }
// }
// deleteHotel("66f11cae3aa0fc97156c9a79")

async function deleteHotel(hotelId) {
  try {
    const deleteHotel = await Hotels.findByIdAndDelete({ id: hotelId });
    return deleteHotel;
  } catch (error) {
    console.log(error);
  }
}
app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotel(req.params.hotelId);
    res.status(200).json({ message: "Hotel deleted successfully." });
  } catch {
    res.status(500).json({ error: "Problem in deleting." });
  }
});

async function deleteHotelByNumber(number) {
  try {
    const deletedData = await Hotels.findOneAndDelete(number);
    console.log("Deleted Data :", deletedData);
  } catch (error) {
    console.log("Error in deleting hotel by number.", error);
  }
}
// deleteHotelByNumber({ phoneNumber: "+1234555890" });

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on port :-", PORT);
});
