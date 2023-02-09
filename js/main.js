const countOfOffers = 25;
const countOfComments = 5;

const descriptions = ["Це літо було чудовим", "Фотка з минулого року",
    "Дуже сумую за цими емоціями", "Сподіваюсь, що я там не був лише один раз"];

const names = ["Артем", "Андрій", "Антон", "Богдан", "Микола", "Максим", "Михайло", "Олег", "Олексій",
    "Іван", "Дмитро", "Василь", "Юрій", "Петро", "Володимир"]

const comments = ["Все відмінно!", "Загалом все непогано. Але не всі.",
    "Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.",
    "Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.",
    "Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.",
    "Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?"];

const data = new Array(countOfOffers).fill(null).map((e,index)=> getOffer(index))
const comment = new Array(countOfComments).fill(null).map((e, index) => getComment(index))

function getRandomNumber(min, max) {
    const step1 = max - min + 1;
    const step2 = Math.random() * step1;
    const result = Math.floor(step2) + min;

    return result
}

function getRandomArray(arrayLenght, arrayMax) {
    const arr = []
    while (arr.length < arrayLenght) {
        const r = Math.floor(Math.random() * arrayMax) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;

}


function getRandomDescription() {
    const randomArrayNumber = getRandomNumber(0, descriptions.length -1)
    const randomDescription = descriptions[randomArrayNumber];
    return randomDescription
}

const urlArray = getRandomArray(25, 25);


function getOffer(index){
    for (let i = 0; i < urlArray.length; i++) {
    return {
        id: index+1,
        url: `photos/${urlArray[i]+1}.jpg`,     
        description: getRandomDescription(),
        likes: getRandomNumber(15, 200),
    }
}
}
console.log(getOffer());
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

const avatarArray = getRandomArray(6, 6)

function getComment(index) {
    for (let i = 0; i < avatarArray.length; i++) {
        return {
            id: index + 1,
            avatar: `img/avatar-${avatarArray[i] + 1}.svg`,
            comment: getRandomComment(),
            name: getRandomName()

        }
    }
}
