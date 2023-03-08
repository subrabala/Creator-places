const { v4: uuidv4 } = require('uuid');
const {validationResult} =require('express-validator');

const HttpError = require("../modules/http-error");

let DUMMY_PLACES = [
  {
    id: "p0",
    title: "EmkjbsfAtate",
    desc: "The tallesdvdst building",
    location: {
      lat: 40.22,
      lng: -724,
    },
    address: "20W venkat enclave",
    creator: "u1",
  },
  {
    id: "p0",
    title: "SRM uni",
    desc: "Neerukonda building",
    location: {
      lat: 34122,
      lng: 343524,
    },
    address: "kuragallu villagee",
    creator: "u2",
  },
  {
    id: "p2",
    title: "jkasg state",
    desc: "The tallasgdvsest building",
    location: {
      lat: 40.22,
      lng: -724,
    },
    address: "20W venkat enclave",
    creator: "u3",
  },
];



const getPlacesId = (req, res, next) => {
  const placesId = req.params.pid; //params returns an object, here p1
  const places = DUMMY_PLACES.filter((p) => {
    return p.id === placesId;
  });

  if (!places || places.length ===0) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  res.json({ places });
  // res.json({message:"Get uid's details!"});
};



const getUserId = (req, res, next) => {
  const userId = req.params.uid;
  const creator = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!creator) {
    return next(
      new HttpError("Could not find a creator for he provided id", 404)
    );
  }
  res.json({ creator });
};



const createPlace = (req, res, next) => {
  const errors =validationResult(req);
  if (!errors.isEmpty()){
    throw new HttpError("Ivalid inputs",422);
  }

  const { title, desc, coordinates, address, creator } = req.body;
  const createdPlace={
    id :uuidv4(),
    title,
    desc,
    location :coordinates,
    address,
    creator
  }
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({place: createdPlace});
};



const updatePlace =(req,res,next)=>{
  const errors =validationResult(req);
  if (!errors.isEmpty()){
    throw new HttpError("Ivalid inputs",422);
  }

    const { title, description } = req.body;
    const placeId =req.params.pid;

    const updatedPlace={...DUMMY_PLACES.find(p=> p.id===placeId)};
    const placeIndex =DUMMY_PLACES.findIndex(p=>p.id ===placeId);
    updatedPlace.title=title;
    updatedPlace.description =description;

    DUMMY_PLACES(placeIndex)= updatedPlace;
    res.status(200).json({place : updatedPlace});

}


const deletePlace =(req,res,next)=>{
    const placeId =req.params.pid;
    if(!DUMMY_PLACES.find(p=>p.id ===placeId)){
      throw new HttpError("Could not find a place")
    }
    DUMMY_PLACES =DUMMY_PLACES.filter( p=> p.id!==placeId);
    res.status(200).json({message:"deleted the place"});
}


exports.createPlace = createPlace;
exports.getPlacesId = getPlacesId;
exports.getUserId = getUserId;
exports.updatePlace = updatePlace;
exports.deletePlace =deletePlace;