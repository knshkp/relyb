const Store = require("../models/storeModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2; // Import Cloudinary SDK

cloudinary.config({
  cloud_name: "dyukjqemj",
  api_key: "975334944781146",
  api_secret: "USmTRR4C6ly_RDh-82Y8rhMIMzc",
});

const create_store = async (req, res) => {
  try {
    const phone = req.body.phone;
    const vendorData = await Store.findOne({ phone: phone });
    if (vendorData){
      const vendorResult={
        name: vendorData.name,
        phone: vendorData.phone,
        image: vendorData.logo,
        DOB:vendorData.DOB,
        BusinessName:vendorData.BusinessName,
        BusinessEmail:vendorData.BusinessLocation,
        BusinessDesc:vendorData.BusinessDesc,
        BusinessLocation:vendorData.BusinessLocation,
        Location:vendorData.ServiceLocation,
        pin:vendorData.pin
      }
      const response = {
        success: true,
        msg: "partnerDetail",
        data: vendorResult,
      };
      res.status(200).send(response);
    }
    else{
      if (!req.body.latitude || !req.body.longitude) {
        res.status(200).send({ success: false, msg: "Latitude and Longitude are important." });
      } 
      else {
          // Upload the image to Cloudinary
          const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);

          const store = new Store({
            vendor_id: req.body.vendor_id,
            logo: cloudinaryUpload.secure_url, // Save the Cloudinary image URL
            name: req.body.name,
            phone: req.body.phone,
            DOB: req.body.DOB,
            BusinessName: req.body.BusinessName,
            BusinessDesc: req.body.BusinessDesc,
            BusinessEmail: req.body.BusinessEmail,
            BusinessLocation: req.body.BusinessLocation,
            pin: req.body.pin,
            ServiceLocation: {
              type: "Point",
              coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
            },
          });

          const storeData = await store.save();
          res.status(200).send({ success: true, msg: "Store Data", data: storeData });
        }
      }
    // } else {
    //   res.status(200).send({ success: false, msg: "Vendor Id does not exist." });
    }
  // } 
  catch (error) {
    res.status(400).send({ success: false, msg: "An internal server error occurred.", error: error.message });
  }
};

module.exports = {
  create_store,
};

  