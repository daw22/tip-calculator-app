// reference for input fields and buttons
const billInput = document.getElementsByClassName('bill')[0];
const noPeopleInput = document.getElementsByClassName('no-people')[0];
const tips = document.getElementsByClassName('tip');
const resetBtn = document.getElementsByClassName('reset-btn')[0];
const customTip = document.getElementsByClassName('custom-tip')[0];

// refrence for result display text
const tipAmount = document.querySelector('#tip-amount');
const total = document.querySelector('#total');

let selectedTip ; // holds curently selected tip value
let no_people ; // holds current number of people
let billValue ; // holds current bill value

// adding event listner for defualt tip buttons
for( let i = 0; i < tips.length; i++){
    tips[i].addEventListener("click",tipClicked);
}

//adding event listner to custom tip input
customTip.addEventListener('input', customTipHandller);

// adding event listner for bill input field
billInput.addEventListener('input', billInputHandller);

// adding event listner for  number of people input field
noPeopleInput.addEventListener('input', numberofPep);

// adding event listner to reset button
resetBtn.addEventListener('click', reset);

// helper function that checks if all fields are filled correctly
function allSet(){
    return(typeof selectedTip === "number" 
            && typeof no_people === "number"
            && typeof billValue == "number");
} 

// event handller functions
function billInputHandller(e){
    // set billValue var
    billValue = parseInt(e.target.value);
    // call calulateTip
    if(allSet())
        calculateTip();
}

// tip button clicked handller
function tipClicked(e){
    // adjust color
    for( let i = 0; i < tips.length; i++){
        tips[i].style.backgroundColor = 'hsl(183, 100%, 15%)';
    }
    if(e){
        e.target.style.backgroundColor = 'hsl(172, 67%, 45%)';
        // set selected tip var
        selectedTip = parseInt(e.target.innerText.slice(0, -1));
        // call calculate tip
        if(allSet())
            calculateTip();
    }
    
}

// custom Tip handller
function customTipHandller(e){
    //reset selectip var and colors
    tipClicked();
    //set selectedtip var
    selectedTip = parseInt(e.target.value);
    // call calculate tip
    if(allSet())
        calculateTip();
}

 // number of people field change handller
function numberofPep(e){
    // validating 
    if(parseInt(e.target.value) <= 0){
        document.getElementsByClassName('not-zero')[0].style.display = "block";
        noPeopleInput.style.outline = "2px solid red";
        return;
    }
    // normalize style
    document.getElementsByClassName('not-zero')[0].style.display = "none";
    noPeopleInput.style.outline = "2px solid hsl(172, 67%, 45%)"
    noPeopleInput.style.borderRadius = "5px"
    //set no_people var
    no_people = parseInt(e.target.value);
    //call calculate tip
    if(allSet())
        calculateTip();
}

// reset everything
function reset(e){
    billValue = "";
    no_people = "";
    selectedTip = "";
    billInput.value = "";
    noPeopleInput.value = "";
    customTip.value = "";
    tipAmount.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
    tipClicked();
}

// calculate tip and updates ui
function calculateTip(){
        // do the calculations
        let tipPerPerson = billValue*(selectedTip/100) / no_people;
        let totalPerPerson = (billValue/no_people) + tipPerPerson;
        // in case of NaN result
        if (isNaN(tipPerPerson)){
            tipPerPerson = 0.00;
            totalPerPerson = 0.00;
        }
        tipAmount.innerHTML="$"+ Math.round((tipPerPerson + Number.EPSILON) * 100) / 100;
        total.innerHTML="$"+ Math.round((totalPerPerson + Number.EPSILON) * 100) / 100;
    }
    