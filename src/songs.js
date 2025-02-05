import unchainImage from "./media/unchainMyHeart.webp";
import valentineImage from "./media/myFunnyValentine.webp";
import handleImage from "./media/hardToHandle.webp";
import minnieImage from "./media/minnieTheMoocher.webp";
import mustangImage from "./media/mustangSally.jpg";
import kissImage from "./media/kiss.jpg";
import ladyImage from "./media/ladyIsATramp.jpg";

import unchainMyHeart from "./media/unchainMyHeart.mp3";
import myFunnyValentine from "./media/myFunnyValentine.mp3";
import hardToHandle from "./media/hardToHandle.mp3";
import minnieTheMoocher from "./media/minnieTheMoocher.mp3";
import mustangSally from "./media/mustangSally.mp3";
import kiss from "./media/kiss.mp3";
import ladyIsATramp from "./media/ladyIsATramp.mp3";

const songArray = [
  {
    i: 0,
    title: "Unchain My Heart",
    artist: "Ray Charles",
    image: unchainImage,
    mp3: unchainMyHeart,
  },
  {
    i: 1,
    title: "My Funny Valentine",
    artist: "Chet Baker",
    image: valentineImage,
    mp3: myFunnyValentine,
  },
  {
    i: 2,
    title: "Hard to Handle",
    artist: "Otis Redding",
    image: handleImage,
    mp3: hardToHandle,
  },
  {
    i: 3,
    title: "Minnie the Moocher",
    artist: "Cab Calloway",
    image: minnieImage,
    mp3: minnieTheMoocher,
  },
  {
    i: 4,
    title: "Mustang Sally",
    artist: "Wilson Pickett",
    image: mustangImage,
    mp3: mustangSally,
  },
  { i: 5, title: "Kiss", artist: "Prince", image: kissImage, mp3: kiss },
  {
    i: 6,
    title: "The Lady is a Tramp",
    artist: "Frank Sinatra",
    image: ladyImage,
    mp3: ladyIsATramp,
  },
];

export default songArray;
