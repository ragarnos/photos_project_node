const countOffers = 25;
const countComments  = 25;

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

function getRandom(min, max) {
    const arr = []
    while (arr.length < min) {
        const r = Math.floor(Math.random() * max) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }


function getRandomDescription() {
    const randomArrayNumber = getRandomNumber(0, descriptions.length -1)
    const randomDescription = descriptions[randomArrayNumber];
    return randomDescription
}


function getRandomComment() {
    const randomArrayNumber = getRandomNumber(0, comments.length -1)
    const RandomComment = comments[randomArrayNumber];
    return RandomComment
}

function getRandomName() {
    const randomArrayNumber = getRandomNumber(0, names.length -1)
    const RandomName = names[randomArrayNumber];
    return RandomName
}
function getOffer(index){
    return {
        id: index+1,
        url: `photos/${index+1}.jpg`,     
        description: getRandomDescription(),
        likes: getRandomNumber(15, 200),
    }
}
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function getComment(index) {
    while (comments.length < countComments-1) {
        comments.push(...comments);
    }
    const numberOfComments = getRandomNumber(0, comments.length-1)
    const commentsListId = ((shuffle(comments)).slice(numberOfComments))
        return {
            id: index + 1,
            avatar: `img/avatar-${index + 1}.svg`,
            comment: commentsListId.length,
            message: shuffle(commentsListId),
            name: getRandomName()
        }
}

const data = new Array(countOffers).fill(null).map((e,index)=> getOffer(index))
const comment_people = new Array(countComments).fill(null).map((e, index) => getComment(index))
export{data, comment_people};
