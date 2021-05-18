import Hydro from "../images/hydro.jpg";

var bio = "I am a sophomore CS student!";

var itinerary = [
  {
    course: "CS148 Lecture",
    location: "Zoom",
    days: ['T', 'R'],
    start: "1530",
    end: "1645"
  },
  {
    course: "CS130B Lecture",
    location: "UCSB Box",
    days: ['M', 'W'],
    start: "1100",
    end: "1315"
  }
];

var cache = [
  {
    id: 1,
    item: "Hydroflask",
    author: "Calvin Dougher",
    date: Date(),
    desc: "Light blue with UCSB sticker",
    img: Hydro
  }
];
  
export { bio, itinerary, cache };