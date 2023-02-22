const bigPicture = document.querySelector(".big-picture");
const bigPictureImage = bigPicture.querySelector(".big-picture__img img");
const closeButton = document.querySelector(".big-picture__cancel")

const bigPictureSocial = bigPicture.querySelector(".big-picture__social");
const bigPictureSocialDescription = bigPictureSocial.querySelector(".social__caption")
const bigPictureSocialReaction = bigPictureSocial.querySelector(".social__likes ");
const bigPictureSocialLikes = bigPictureSocialReaction.querySelector(".likes-count");
const bigPictureSocialComments = bigPictureSocial.querySelector(".social__comment-count");
const bigPictureSocialNumberofComments = bigPictureSocialComments.querySelector(".comments-count");
const pictures = document.querySelector(".pictures");
const bigPictureLoadCommennts = document.querySelector(".social__comments-loader");
const HTMLbody = document.body;
let photoId = undefined;
let commentsHTML = "";
let commentsCountHTML = "";
let Comfive = 5;
let slicedPictureArray = undefined;



export function ZoomBigPicture(bigPictureArray) {
    pictures.addEventListener('click', (e) => {
        photoId = e.target.dataset.id - 1;
        // console.log(e.target);
        if (isNaN(photoId)) {
        } else {
            bigPicture.classList.remove('hidden');
            const pictureArray = bigPictureArray[photoId];
            bigPictureImage.src = pictureArray.url;
            bigPictureSocialLikes.textContent = pictureArray.likes;
            bigPictureSocialNumberofComments.textContent = pictureArray.comments.length;
            bigPictureSocialDescription.textContent = pictureArray.description;
            slicedPictureArray = pictureArray.comments.slice(0, Comfive);
            commentsCountHTML = `${slicedPictureArray.length} из <span class="comments - count"> ${pictureArray.comments.length + " "} </span> комментарів`;
            bigPictureSocialComments.innerHTML = commentsCountHTML;
            HTMLbody.classList.add("modal-open");
            
            function loadAComments(){
                pictureArray.comments.forEach((comment) => {
                    commentsHTML += `
                    <li class="social__comment" data-post-id="${comment.id}">
                        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
                        <p class="social__text">${comment.comment}</p>
                    </li>`;
                });

                bigPicture.querySelector(".social__comments").innerHTML = commentsHTML;
            }
            function loadFive(Comfive){
                slicedPictureArray = pictureArray.comments.slice(0, Comfive);
                console.log(`${slicedPictureArray.length}`);
                slicedPictureArray.forEach((comment) => {
                    commentsHTML += `
                <li class="social__comment" data-post-id="${comment.id}">
                    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
                    <p class="social__text">${comment.comment}</p>
                </li>`;
                    });
                    bigPicture.querySelector(".social__comments").innerHTML = commentsHTML;
                    if (pictureArray.comments.length === slicedPictureArray.length){
                        bigPictureLoadCommennts.classList.add("hidden");
                    }
            }
            function addingFive() {
                Comfive += 5;
                commentsHTML = "";
                loadFive(Comfive);
                commentsCountHTML = `${slicedPictureArray.length} из <span class="comments - count"> ${pictureArray.comments.length + " "} </span> комментарів`;
                bigPictureSocialComments.innerHTML = commentsCountHTML;

            }
            function getComments(){
                bigPictureLoadCommennts.addEventListener('click', addingFive);
                 function closeBigPictureEvent() {
                    closeButton.removeEventListener('click', closeBigPictureEvent);
                     bigPictureLoadCommennts.removeEventListener('click', addingFive);

                }
                closeButton.addEventListener('click', () => {
                    closeBigPictureEvent();
                })
                HTMLbody.addEventListener('keydown', (e) => {
                    if (e.keyCode === 27) {
                        closeBigPictureEvent();
                    }
                })

                if (pictureArray.comments.length < Comfive){
                    console.log("less than 5");
                    loadAComments();
                    bigPictureLoadCommennts.classList.add("hidden");
                    bigPictureSocialComments.classList.add("hidden");
                }else{
                    console.log("more than 5");
                    loadFive(Comfive);
                }
            }
            getComments();
            

        }


    })

            
    function closeBigPicture() {
        bigPicture.classList.add('hidden');
        HTMLbody.classList.remove("modal-open");
        closeButton.removeEventListener('click', closeBigPicture);
        commentsHTML = ""
        Comfive = 5;
        slicedPictureArray = undefined;
        bigPictureSocialComments.innerHTML = "";
        bigPictureLoadCommennts.classList.remove("hidden");
        bigPictureSocialComments.classList.remove("hidden");
    }
    closeButton.addEventListener('click', () => {
        closeBigPicture();
    })
    HTMLbody.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
            closeBigPicture();
        }
    })

}