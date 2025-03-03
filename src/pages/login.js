import * as validator from "../components/validator.js"

var elInputEmail = document.getElementById('email')
var elInputPw = document.getElementById('pw')

var emailPass = false
var pwPass = false

var elHelperText = document.getElementById('helper-text')

var elLoginBtn = document.getElementById('login-btn')


elInputEmail.onkeyup = function() {
    emailPass = validator.handleEmailInput(elInputEmail.value, elHelperText);
    btnActivate();
};

elInputPw.onkeyup=function(){
    console.log("dsf")
    pwPass=validator.handlePwInput(elInputPw.value, elHelperText);
    btnActivate()
};

function btnActivate(){
    if(emailPass && pwPass){
        elLoginBtn.style.backgroundColor="var(--activate-color)"
        elLoginBtn.onclick=function(){
            window.location.href="./posts.html"; 
        }
    }
    else{
        elLoginBtn.style.backgroundColor="var(--point-color)";
    }
}