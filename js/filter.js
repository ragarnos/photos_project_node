import {data} from './main.js';
import {getPictureData} from './picture.js'
const filter_random = document.querySelector('#filter-random');
const filter_discussed = document.querySelector('#filter-discussed');
const filter_default = document.querySelector('#filter-default');

const count = 10;

const pictures = document.querySelector(".pictures");
const wait = 500;
function debounce(func, wait, immediate) {
    let timeout;
  
    return function executedFunction() {
      const context = this;
      const args = arguments;
  
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      const callNow = immediate && !timeout;
  
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
  
      if (callNow) func.apply(context, args);
    };
  };


function bubbleSortPhotos(photos) {
    for (let j = photos.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (photos[i].comments.length < photos[i + 1].comments.length) {
          let temp = photos[i];
          photos[i] = photos[i + 1];
          photos[i + 1] = temp;
        }
      }
    }
    return photos;
  }
const get_photo_default = debounce(function(){
    const photos_default = data;
    filter_default.classList.add('img-filters__button--active');
    filter_discussed.classList.remove('img-filters__button--active');
    filter_random.classList.remove('img-filters__button--active');
    document.querySelectorAll('.picture').forEach((elem) => elem.remove());
    photos_default.map((e, index) => getPictureData(e,index));
},wait);
const get_sort_photos  = debounce(function(){
    const sort = bubbleSortPhotos(data);
    filter_default.classList.remove('img-filters__button--active');
    filter_random.classList.remove('img-filters__button--active');
    filter_discussed.classList.add('img-filters__button--active');
    
    document.querySelectorAll('.picture').forEach((elem) => elem.remove());
    sort.map((e, index) => getPictureData(e,index));
    
},wait);

const get_random_photos = debounce(function(){
    const random_photos_array = randomUnique();
    filter_default.classList.remove('img-filters__button--active');
    filter_random.classList.add('img-filters__button--active');
    filter_discussed.classList.remove('img-filters__button--active');
    const random_photos = random_photos_array.map((elem) => data[elem])
    updatePhotos(random_photos)
},wait);
function randomUnique(){
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * ((data.length - 1) - 1 + 1) + 1));
    }
    return [...nums];
}
function updatePhotos(photos){
    
    document.querySelectorAll('.picture').forEach((elem) => elem.remove());
    const gallery = photos.map((e, index) => getPictureData(e,index));

}

filter_random.addEventListener('click',get_random_photos);
filter_discussed.addEventListener('click',get_sort_photos);
filter_default.addEventListener('click',get_photo_default);