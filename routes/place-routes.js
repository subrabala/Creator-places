const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const placeControl = require("../controllers/places-controllers");

router.get("/:pid", placeControl.getPlacesId);

router.get("/user/:uid", placeControl.getUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeControl.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControl.updatePlace
);

router.delete("/:pid", placeControl.deletePlace);

module.exports = router;
