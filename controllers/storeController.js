// const Store = require("../models/storeModel");
// const User = require("../models/userModel");

// const create_store = async (req, res) => {
//   try {
//     const userData = await User.findOne({ _id: req.body.vendor_id });
//     if (userData) {
//       if (!req.body.latitude || !req.body.longitude) {
//         res.status(400).send({ success: false, msg: "Latitude and Longitude are important." });
//       } else {
//         const vendorData = await Store.findOne({ vendor_id: req.body.vendor_id });
//         if (vendorData) {
//           res.status(400).send({ success: false, msg: "This Vendor is already created." });
//         } else {
//           const store = new Store({
//             vendor_id: req.body.vendor_id,
//             logo: req.file.filename,
//             name: req.body.name,
//             phone: req.body.phone,
//             DOB: req.body.DOB,
//             BuisnessName: req.body.BuisnessName,
//             BuisnessDesc: req.body.BuisnessDesc,
//             business_email: req.body.business_email,
//             BusinessLocation: req.body.BusinessLocation,
//             pin: req.body.pin,
//             ServiceLocation: {
//               type: "Point",
//               coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
//             },
//           });
//           const storeData = await store.save();
//           res.status(201).send({ success: true, msg: "Store Data", data: storeData });
//         }
//       }
//     } else {
//       res.status(404).send({ success: false, msg: "Vendor Id does not exist." });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, msg: "An internal server error occurred.", error: error.message });
//   }
// };

// module.exports = {
//   create_store,
// };
