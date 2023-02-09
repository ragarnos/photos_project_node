import {data, comment_people} from "./main.js";

const pictures = document.querySelector(".pictures");

const picture = document.querySelector("#picture");
picture.setAttribute("picture__id", data.id);

const Image = picture.content.querySelector('.picture__img');
const Comments = picture.content.querySelector('.picture__comments')
const Likes = picture.content.querySelector('.picture__likes');
const pictureData = data.map((e, index) => getPicturePhotos(index));
console.log(comment_people);

function getPicturePhotos(index) {
    Image.src = data[index].url;
    Likes.textContent = data[index].likes;
    Comments.textContent = comment_people[index].comment;
    const cloneTemplate = picture.content.cloneNode(true);
    pictures.appendChild(cloneTemplate);
    
}