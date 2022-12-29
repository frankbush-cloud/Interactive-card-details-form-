const cardHolder = document.getElementById('cardholder-name');
const cardNumber = document.getElementById("card-number");
const expiry = Array.from(document.querySelectorAll(".expiry"));
const cvc = document.getElementById("cvc");
const submitButton = document.querySelector(".submit-btn");
const nameOnCard = document.querySelector('.cardholder-display');
const numOnCard = document.querySelector(".card-number-display");
const expiryMM = document.querySelector(".expiry-month-display");
const expiryYY = document.querySelector(".expiry-year-display");
const cvcDisplay = document.querySelector(".cvc-display");
const completeState = document.querySelector(".complete-state");
const thankyou = document.querySelector(".thanks")
const continueButton = document.querySelector("#continue-btn");
const form = document.getElementById("myform");
const expiryErrorMsg = document.querySelector("#expiry-error");
const cardForm = document.querySelector(".card-form");


function inputName(){
    let cardNameInput = cardHolder.value;
    let formatedName = cardNameInput.replace(/\d/g, "");
    nameOnCard.innerHTML = formatedName
    thankyou.innerHTML = "thank you " + " " + formatedName;
}

function inputCardNumber(){
    let cardNumberInput = cardNumber.value;
    //Do not allow users to write invalid characters
    let formatedCardNumber = cardNumberInput.replace(/\D/g, "");
    formatedCardNumber = formatedCardNumber.substring(0, 16);
    //split the card number in groups of 4
    let cardNumberSections = formatedCardNumber.match(/\d{1,4}/g);
    if(cardNumberInput !== null){
        formatedCardNumber = cardNumberSections.join(" ");
    }
    //if the formatted cardnumber is diff to this, change
    if(cardNumberInput !== formatedCardNumber){
        cardNumber.value = formatedCardNumber;
    }
    numOnCard.innerHTML = cardNumberInput;
    if(cardNumber.value === ""){
        numOnCard.innerHTML = cardNumber.placeholder;
    }
}
 
function inputMM(){
    let formatedMM = expiry[0].value;
   formatedMM = formatedMM.substring(0, 2);
   expiry[0].value = formatedMM;
   if(expiry[0].value === ""){
    expiryMM.innerHTML = "00";
   }else {
    expiryMM.innerHTML = expiry[0].value
   } 
}

function inputYY(){
    let formatedYY = expiry[1].value;
    formatedYY = formatedYY.substring(0, 4);
    expiry[1].value = formatedYY;
    if(expiry[1].value === ""){
        expiryYY.innerHTML = "0000";
    } else{
        expiryYY.innerHTML = expiry[1].value;
    }
}

function inputCVC(){
    let formatedCVC = cvc.value;
    formatedCVC = formatedCVC.substring(0, 3);
    cvc.value = formatedCVC;
    if(cvc.value ===""){
        cvcDisplay.innerHTML = "000";
    }else{
        cvcDisplay.innerHTML = cvc.value
    }
}


function massValidate(){
    function validateName(){
        let cardHolderExp = /^[A-Z a-z]+$/;
        let errorMsg = document.getElementById("errorMsg");
        if(cardHolder.value.match(cardHolderExp)){
            errorMsg.textContent = "";
        }else{
            errorMsg.innerHTML = "please enter cardholder name!";
        }
    }

    function validateCard(){
        let cardNumberError = document.getElementById("card-num-error");
        if(cardNumber.value.length > 0 && cardNumber.value.length < 16){
            cardNumberError.innerHTML = "wrong format";
        }else if(cardNumber.value === ""){
            cardNumberError.innerHTML = "can't be blank";
        } else{
            cardNumberError.innerHTML = "";
        }
    }

    function validateExpiry(){
        let expMonth = /^(0[0-9]|1[1-2]){2}$/;
        let expYear = /^[0-9][0-2]{4}$/;
        if(expiry[0].value.match(expMonth)){
            expiryErrorMsg.innerHTML = "";
        }else if(expiry[0].value.match(expMonth)&&
        expiry[1].value.match(expYear)){
            expiryErrorMsg.innerHTML = "";
        }else if(expiry[0].value == "" && expiry[1].value == ""){
            expiryErrorMsg.innerHTML = "must put date";
        }else{
            expiryErrorMsg.innerHTML = "wrong format";
        }
    }

    function validateCvC(){
        let cvcErrorMsg = document.getElementById("cvc-error");
        let  cvcExp = /^[0-9]{3}$/;
        if(cvc.value === ""){
            cvcErrorMsg.innerHTML = "can't be blank";
        }else if (cvc.value.match(cvcExp)){
            cvcErrorMsg.innerHTML = "";
        }else{
            cvcErrorMsg.innerHTML = "wrong format";
        }
        
    }

    validateCard();
    validateCvC();
    validateExpiry();
    validateName();

    if(nameOnCard.innerHTML == cardHolder.placeholder||
        numOnCard.innerHTML == cardNumber.placeholder||
        expiryMM.innerHTML == "00"||
        expiryYY.innerHTML == "0000"||
        cvcDisplay.innerHTML == "000"||
        (cardNumber.value.length > 0 && cardNumber.value.length < 16)){
            return false;
        }else{
            return true;
        }
}

// submit button
submitButton.addEventListener("click", function(){
    massValidate();
    if (massValidate()== false){
        event.preventDefault();
    }else{
        event.preventDefault();

        cardForm.classList.add("hidden");
        completeState.classList.remove("hidden");

    }
})


continueButton.addEventListener("click", ()=>{
    event.preventDefault();
    completeState.classList.add("hidden");
    cardForm.classList.remove("hidden");
    nameOnCard.innerHTML = cardHolder.placeholder;
    numOnCard.innerHTML = cardNumber.placeholder;
    expiryMM.innerHTML ="00";
    expiryYY.innerHTML = "0000";
    cvcDisplay.innerHTML = "000";
    cardHolder.value = "";
    cardNumber.value = "";
    expiry[0].value = "";
    expiry[1].value = "";
    cvc.value = "";
    expiryErrorMsg.innerHTML = "";    
})


