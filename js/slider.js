const scale_minus = document.querySelector('.scale__control--smaller');
const scale_plus = document.querySelector('.scale__control--bigger');
let value_zoom = document.querySelector('.scale__control--value');
const img_upload = document.querySelector('.img-upload__preview img');
const effects__radio = document.querySelectorAll('.effects__radio');
const slider = document.querySelector('.effect-level__slider');
let zoom = 100;
const step_zoom = 25;
const hiddenInputFilter = document.querySelector('.hidden-scale');
const valueSlider = document.querySelector('.hidden-effect');


const settingFilter = {
    chrome:{
        filter: "grayscale",
        step: 0.1,
        measure: "",
        min: 0,
        max: 1,
        start: 0
    },
    sepia: {
        filter: "sepia",
        step: 0.1,
        measure: "",
        min: 0,
        max: 1,
        start: 0
    },
    marvin: {
        filter: "invert",
        step: 1,
        measure: "%",
        min: 0,
        max: 100,
        start: 0
    },
    phobos: {
        filter: "blur",
        step: 0.1,
        measure: "px",
        min: 0,
        max: 3,
        start: 0
    },
    heat: {
        filter: "brightness",
        step: 0.1,
        measure: "",
        min: 0,
        max: 3,
        start: 0
    }

}

console.log(effects__radio);
scale_minus.addEventListener('click', scaleMinus)
scale_plus.addEventListener('click', scalePlus)
function scaleMinus(){
        zoom -= step_zoom;
    if(zoom >= 25){
        img_upload.style.transform = `scale(${zoom/100})`;
        value_zoom.value = zoom +'%';
        scale_plus.removeAttribute("disabled");
    }if(zoom === 25){
        scale_minus.setAttribute("disabled", true);
    }
}
function scalePlus(){
    zoom += step_zoom;
    
    if(zoom <= 100){
        img_upload.style.transform = `scale(${zoom/100})`;
        value_zoom.value = zoom +'%'
        scale_minus.removeAttribute("disabled");
    }if(zoom === 100){
        scale_plus.setAttribute("disabled", true);
    }
}


effects__radio.forEach(item => {
    item.addEventListener('click', e => {
        if(typeof slider.noUiSlider !== 'undefined'){
            slider.noUiSlider.destroy();
        }
        set_filer(e.target.value);
  });
});
function set_filer(filter_value){
    switch (filter_value) {
        case 'none' :
            img_upload.style.filter =  'none';
            break;   
        case 'chrome':
            img_upload.style.filter = 'grayscale(0.1)';
            addSlider(filter_value)
            addFilter(filter_value)
            break;
        case 'sepia':
            img_upload.style.filter = 'sepia(0.1)';
            addSlider(filter_value)
            addFilter(filter_value)
            break;
        case 'marvin':
            img_upload.style.filter = 'invert(0.1)';
            addSlider(filter_value)
            addFilter(filter_value)
            break;
        case 'phobos':
            img_upload.style.filter = 'blur(0.1)';
            addSlider(filter_value)
            addFilter(filter_value)
            break;
        case 'heat':
            img_upload.style.filter = 'brightness(0.1)';
            addSlider(filter_value)
            addFilter(filter_value)
            break;
        default:
            console.log('dafault');
    }
       
}

function addSlider(filter){
    const filterObj = settingFilter[filter];
    noUiSlider.create(slider, {
        start: filterObj.start,
        tooltips: true,
        connect: true,
        step: filterObj.step,
        range: {
            'min': filterObj.min,
            'max': filterObj.max
        }
    });
}
function addFilter(filter){
    const filterObj = settingFilter[filter];
    slider.noUiSlider.on("update", function (value) {
        img_upload.style.filter = `${filterObj.filter}(${value}${filterObj.measure})`;
        hiddenInputFilter.value = `${filterObj.filter}(${value}${filterObj.measure})`;
        valueSlider.value = value.join();
    });
}