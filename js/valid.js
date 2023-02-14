const imageUpload = document.querySelector(".img-upload")
const imageUploadForm = imageUpload.querySelector(".img-upload__start");
const imageIsUploaded = imageUploadForm.querySelector("#upload-file");
const imageUploadOverlay = document.querySelector(".img-upload__overlay");
const imageUploadClose = document.querySelector(".img-upload__cancel");

const userHashtagsAndComments = document.querySelector(".img-upload__text");
const userHashTags = userHashtagsAndComments.querySelector(".text__hashtags");
const userComments = userHashtagsAndComments.querySelector(".text__description");
const maxHashtagSize = 19;
const minHashtagSize = 1;
const maxCommentsSize = 140;

export function ImageUpload(){
    imageIsUploaded.addEventListener('change', function (e) {
        if (e.target.files[0]) {
            imageUploadOverlay.classList.remove("hidden");
            document.body.classList.add("modal-open");
        }
    })
    function validate(evt) {
        evt.target.setCustomValidity("");
        const hashtagText = evt.target.value;
        let format = /[&\/\\#,+()$~%.'":*?<>{}]/g;
        if (hashtagText.length > 1){
            const re = /\s/g;
            let hashtags = hashtagText.split(re);
            hashtags = hashtags.map(element => {
                return element.toLowerCase();
            });
            let simpleHashtags = hashtags.map(element => {
                return element.substring(1);
            })
            console.log(hashtags);
            console.log(simpleHashtags);
            if (hashtags.length > 5){
                evt.target.setCustomValidity("Ви не можете ввести більше 5 хештегів");
                evt.target.reportValidity();
                
            }
            if(checkIfDuplicateExists(hashtags)){
                evt.target.setCustomValidity("Не всі # унікальні");
                evt.target.reportValidity();
            }
            if(format.test(simpleHashtags.join(""))){
                evt.target.setCustomValidity("# не може містити спецсимволи");
                evt.target.reportValidity();
            }
            checkHashtag(hashtags, evt);
        }
        
    }
    function checkHashtag(tagsArray, evt){
        tagsArray.forEach (function (elem) {
            const elemArray = elem.split("");
            if (elemArray[0] !== "#"){
                evt.target.setCustomValidity("No # as first symbol");
                evt.target.reportValidity();
            }
            if (elemArray.length-1 < minHashtagSize){
                evt.target.setCustomValidity("Кожен # повинен складатись мінімум з 2 символів");
                evt.target.reportValidity();
                
            }
            if (elemArray.length-1 > maxHashtagSize){
                evt.target.setCustomValidity("Кожен # не повинен бути довше 20 символів");
                evt.target.reportValidity();
            }
            
        })
    }
    function commentsValidate(evt) {
        evt.target.setCustomValidity("");
        const commentsText = evt.target.value;
        if(commentsText.length > 1){
            if (commentsText.length-1 > maxCommentsSize){
                evt.target.setCustomValidity("Коментар не може бути більше 140 символів");
                evt.target.reportValidity();
            }
        }
    }

    function checkIfDuplicateExists(arr) {
        return new Set(arr).size !== arr.length
    }

    userHashTags.addEventListener('blur', ()=>{
        document.body.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                closeImageUpload();
            }
        })
    });
    userHashTags.addEventListener('focus', () => {
        document.body.removeEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                closeImageUpload();
            }
        })
    });
    userComments.addEventListener('blur', () => {
        document.body.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                closeImageUpload();
            }
        })
    });
    userComments.addEventListener('focus', () => {
        document.body.removeEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                closeImageUpload();
            }
        })
    });


    function closeImageUpload() {
        imageUploadOverlay.classList.add("hidden");
        document.body.classList.remove("modal-open");
        imageUploadClose.removeEventListener('click', closeImageUpload);
    }
    imageUploadClose.addEventListener('click', () =>{
        closeImageUpload()
    })

    /*Додаємо eventListener для #*/
    userHashTags.addEventListener('input', function(event) {
        validate(event);
    })
    userComments.addEventListener('input', function(event) {
        commentsValidate(event);
    })
}