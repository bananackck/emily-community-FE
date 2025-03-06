import * as validator from "../components/validator.js";

var elInputEmail = document.getElementById('email');
var elInputPw = document.getElementById('pw');

var emailPass = false;
var pwPass = false;

var elHelperText = document.getElementById('helper-text');

var elLoginBtn = document.getElementById('login-btn');

elInputEmail.onkeyup = function() {
    emailPass = validator.handleEmailInput(elInputEmail.value, elHelperText);
    btnActivate();
};

elInputPw.onkeyup = function() {
    pwPass = validator.handlePwInput(elInputPw.value, elHelperText);
    btnActivate();
};

function btnActivate(){
    if(emailPass && pwPass){
        elLoginBtn.style.backgroundColor = "var(--activate-color)";
        elLoginBtn.onclick = async function(){
            // 로그인 처리 함수 호출
            const response = await findUser(elInputEmail.value, elInputPw.value);
            if(response.ok){
                window.location.href = "./posts.html";
            }else{
                console.error("로그인 실패", response.message);
            }
        };
    }
    else{
        elLoginBtn.style.backgroundColor = "var(--point-color)";
    }
}

//--------------------------------------------
// 입력한 email과 password가 일치하는 사용자 찾기
async function findUser(email, password) {
    try {
        const response1 = await fetch("../data/user-data.json");
        const users = await response1.json();
        
        const matchedUser = users.find(user => user.email === email && user.password === password);
        
        if(matchedUser) {
            return {
                ok:true,
                status: 200,
                message: "login success",
                data:{
                    "id": matchedUser.id
                }
            }
        } else {
            elHelperText.innerHTML = "아이디 또는 비밀번호가 일치하지 않습니다.";
            return {
                ok:false,
                status: 404,
                message: "match not found",
                data:null
            }
        }
    } catch (error) {
        console.error("로그인 처리 중 오류:", error);
        elHelperText.innerHTML = "로그인 중 오류가 발생했습니다.";
        return {
            ok:false,
            status: 500,
            message: "unexpected server error",
            data:null
        }
    }
}
