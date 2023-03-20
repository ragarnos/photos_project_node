
import {ZoomBigPicture} from './zoomPhoto.js';
import { ImageUpload } from "./valid.js";

    
const come = await fetch('http://localhost:3001/result')
.then(function (resp) {
    return resp.json()
})
.catch((error) => {
    return `${error}`;
});
const data = come;
const comment_people = come.comments;
export{data, comment_people, come};
ZoomBigPicture(data);
ImageUpload();

