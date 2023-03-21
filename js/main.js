import {ZoomBigPicture} from './zoomPhoto.js';
import { ImageUpload } from "./valid.js";

const catImage = document.querySelector(".img-upload__preview img");
const imageUploadOverlay = document.querySelector(".img-upload__overlay")
const scaleValue = document.querySelector(".scale__control--value");
const backendScaleValue = scaleValue.value;
const userHashTags = document.querySelector(".text__hashtags");
const userComments = document.querySelector(".text__description");
const form = document.querySelector(".img-upload__form");
const success_template = document.querySelector("#success");
const success = success_template.content.cloneNode(true);
const bodys = document.querySelector('body');
const success__button = success.querySelector('.success__button');
success__button.addEventListener('click', success_fn);
    

const come = await fetch('http://localhost:3001/result')
.then(function (resp) {
    return resp.json()
})
.catch((error) => {
    return `${error}`;
});


function success_fn() {
    document.querySelector('.success').remove();
}



function submit(formExample){
    formExample.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let backendphoto = {
            url: catImage.src,
            scale: backendScaleValue,
            filter: catImage.style.filter,
            hashtags: userHashTags.value,
            description: userComments.value,
            id: data.length+1,
            likes: 0,
            comments: [],

        };
        form.reset();
        imageUploadOverlay.classList.add("hidden");
        document.body.classList.remove("modal-open");

        fetch('http://localhost:3001/upload', {
            method: "POST",
            body: JSON.stringify(
                backendphoto
            ),
        })
            .then((response) => {
                response.json()
                bodys.appendChild(success);
            })

            .catch((error) => {
                console.log('asdasdas',);
                // success
                return `${error}`;
            });

});
}
submit(form);
const data = come;
const comment_people = come.comments;
export{data, comment_people, come};
ZoomBigPicture(data);
ImageUpload();

