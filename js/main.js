
import {showBigPicture} from './zoomPhoto.js';


const countOfOffers = 25;
const countOfComments = 8;
const countOfAvatars = 6;

const descriptions = ["Этот день был прекрасным", "фото с прошлого года!",
    "Лучшие времена", "Моя поездка за границу"];

const names = ["Костя", "Роман", "Сергей", "Дима", "Богдан", "Наталья", "Анна", "Валентин", "Олег",
    "Иван", "Анатолий", "Александр", "Лилия"]

const comments = ["Все супер!", "Все хорошо получились.",
    "Лучшая фотка за все время, так как очень много воспоминаний на этой фотографии.",
    "Спонтанная фотка, но очень хрошо получилось."];


    function getRandomNumber(min, max) {
        const step1 = max - min + 1;
        const step2 = Math.random() * step1;
        const result = Math.floor(step2) + min;
    
        return result
    }
    
    
    function getRandomDescription() {
        const randomArrayNumber = getRandomNumber(0, descriptions.length -1)
        const randomDescription = descriptions[randomArrayNumber];
        return randomDescription
    }
    
    
    
    function getOffer(index){
        return {
            id: index+1,
            url: `photos/${index+1}.jpg`,     
            description: getRandomDescription(),
            likes: getRandomNumber(15, 200),
            comments: getComment(getRandomNumber(1, countOfComments))
        }
    }
    
    
    function getComment(countOfComments,) {

        const ArrayOfComments=[];
        for (let i = 0; i < countOfComments; i++) {
            ArrayOfComments.push({
                id: "# "+getRandomNumber(1, 999),
                avatar: `img/avatar-${getRandomNumber(1, countOfAvatars)}.svg`,
                comment: comments[getRandomNumber(1, comments.length-1)],
                name: names[getRandomNumber(1, names.length-1)]
    
            })
            }
        return ArrayOfComments;
        }
const data = new Array(countOfOffers).fill(null).map((e,index)=> getOffer(index))
const comment_people = new Array(countOfComments).fill(null).map((e, index) => getComment(index))
// console.log(data, comment_people);
export{data, comment_people};
showBigPicture(data);

