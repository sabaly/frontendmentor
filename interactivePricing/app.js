/* Slider Bar */
let slider = document.querySelector(".slider");
let sliderBar = document.querySelector(".slider-bar");
let progressState = document.querySelector(".progress-state");


let drag = false; 
let oldx = 0;
let sliderBarWidth = getComputedStyle(sliderBar).width;

sliderBarWidth = parseInt(sliderBarWidth.replace('px', ''));

slider.addEventListener('mousedown', e => { 
    //ready to drag the slider
       drag = true;
       oldx = e.clientX; // get the x position of the mouse
});
slider.addEventListener('mouseup', e => { 
    drag = false; //stop dragging when mouse up 
});
window.addEventListener('click', e => { 
    drag = false; //stop dragging on a click
});

sliderBar.addEventListener('click', e => {
    //bring the slider in tne mouse position when 
    // click on somewhere of the slide-bar
    let sliderX;
    if(window.innerWidth < 768) {
        sliderX = e.clientX - 20 * window.innerWidth / 100 ; // get the relatif position
    }else {
        sliderX = e.clientX - 34 * window.innerWidth / 100 ; // get the relatif position
    }
    
    //Slide to that position
    slider.style.transition = "0.4s";
    slider.style.left = sliderX + "px";

    //fit the progress state to that position
    progressState.style.transition = "0.8s";
    progressState.style.width = (sliderX + 5) + "px";

    //Update page views and rate
    updateMonthlyPrice(updatePageViews(sliderX, sliderBarWidth));
})

slider.addEventListener('mousemove', e => {
    //get the X position of the slider
    const style = getComputedStyle(slider);
    let sliderX = style.left;
    sliderX = parseInt(sliderX.replace('px', ''));

    let actualx = e.clientX; // get the actual x position of the mouse
    if(oldx < actualx) {
        //mouse direction is right
        sliderX += 10;
    }else if(oldx > actualx) {
        //mouse direction is left
        sliderX -= 10;
    }
    
    oldx = actualx;
    
    if(drag == true){
        // update slider et progresse state positions
        slider.style.transition = "0.4s";
        slider.style.left = sliderX + "px";
        
        progressState.style.transition = "0.8s";
        progressState.style.width = (sliderX + 5) + "px";
        
        //Update page views and rate
        updateMonthlyPrice(updatePageViews(sliderX, sliderBarWidth));
    }
}); 



/*
    Monthly billings 
*/
var monthlyBillingState = document.querySelector(".montly-billing-state");
var circle = document.querySelector(".circle");

monthlyBillingState.addEventListener("click", e => {
    circle.style.position = "relative";
    circle.style.transition = "1s";
    monthlyBillingState.style.transition = "0.4s";
    if(monthlyBillingState.classList.contains('active')){
        // non active state : change the background and bring back the circle to 0
        //  remove class active 
        monthlyBillingState.classList.remove('active');
        circle.style.left = "0";
        monthlyBillingState.style.background = "#ccc";

        //desactivate the billing if applied
        const style = getComputedStyle(slider);
        let sliderX = style.left;
        sliderX = parseInt(sliderX.replace('px', ''));
        //Update page views and rate
        updateMonthlyPrice(updatePageViews(sliderX, sliderBarWidth));
    }else {
        // active state : change the background and bring the circle to the right side
        //  add the class  active  
        monthlyBillingState.classList.add('active');
        circle.style.left = "50%";
        monthlyBillingState.style.background = "hsl(174, 86%, 45%)";

        // apply the 25 % of discount
        var ratePerMonth = document.querySelector('.rate');
        var rate = parseInt(ratePerMonth.innerHTML);
        rate = rate - 25 * rate / 100;
        ratePerMonth.innerHTML = rate + ".00";
    }
    
});



/*
    Button start the trial : animate the button on click
*/
var btn = document.querySelector(".trial-footer input");
btn.addEventListener('mousedown', e => {
    btn.style.border = "none";
    btn.style.animation = "popup 0.5s ease-in"; 
});
btn.addEventListener('mouseup', e => {
    btn.style.animation = "none"; 
});


/*

        FUNCTIONS

*/
function updatePageViews(sliderX, sliderBarWidth) {
    let numberPageViews = document.querySelector('.number-page-views');
    var rate;
    if(sliderX < sliderBarWidth/5) {
        numberPageViews.innerHTML = "10k";
        rate = "8.00";
    }else if(sliderX < 2*sliderBarWidth/5) {
        numberPageViews.innerHTML = "50k";
        rate = "12.00";
    }else if(sliderX < 3*sliderBarWidth/5) {
        numberPageViews.innerHTML = "100k";
        rate = "16.00";
    }else if(sliderX < 4*sliderBarWidth/5) {
        numberPageViews.innerHTML = "500k";
        rate = "24.00";
    }else {
        numberPageViews.innerHTML = "1M";
        rate = "36.00";
    }

    return rate;
}

function updateMonthlyPrice(rate) {

    var ratePerMonth = document.querySelector('.rate');
    //check if the billing is active
    var monthlyBillingState = document.querySelector(".montly-billing-state");
    if(monthlyBillingState.classList.contains('active')){
        // apply the 25 % of discount
        rate = rate - 25 * rate / 100;
        ratePerMonth.innerHTML = rate + ".00";
    }else {
        ratePerMonth.innerHTML = rate;
    }
}

