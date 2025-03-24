import * as validator from "../components/validator.js";

const elInputProfile  = document.getElementById('profile-image');
const elInputEmail    = document.getElementById('email');
const elInputPw       = document.getElementById('pw');
const elInputPw2      = document.getElementById('pw2');
const elInputNickname = document.getElementById('nickname');

let profileImgName="";

let emailPass    = false;
let pwPass       = false;
let pw2Pass      = false;
let nicknamePass = false;

const elProfileHelper  = document.getElementById('profile-helper');
const elEmailHelper    = document.getElementById('email-helper');
const elPwHelper       = document.getElementById('pw-helper');
const elPw2Helper      = document.getElementById('pw2-helper');
const elNicknameHelper = document.getElementById('nickname-helper');

const elSigninBtn = document.getElementById('signin-btn');

// 1. 유효성 검사
elInputProfile.onchange = function() {
  profileImgName += validator.uploadProfile(this);
  // console.log("profileImgName: "+profileImgName);
};

elInputEmail.onkeyup = function() {
  emailPass = validator.handleEmailInput(elInputEmail.value, elEmailHelper);
  btnActivate();
};

elInputPw.onkeyup = function() {
  pwPass = validator.handlePwInput(elInputPw.value, elPwHelper);
  btnActivate();
};

elInputPw2.onkeyup = function() {
  pw2Pass = validator.handlePw2Input(elInputPw.value, elInputPw2.value, elPw2Helper);
  btnActivate();
};

elInputNickname.onkeyup = function() {
  nicknamePass = validator.handleNicknameInput(elInputNickname.value, elNicknameHelper);
  btnActivate();
};

// 2. 버튼 활성화 & 클릭 시 회원가입 함수 호출
function btnActivate() {
  if (emailPass && pwPass && pw2Pass && nicknamePass) {
    elSigninBtn.style.backgroundColor = "var(--activate-color)";
    elSigninBtn.onclick = async function() {
      const response = await signupUser();
      console.log(response);
      if (response.ok) {
        console.log(response);

        window.location.href = "./posts.html";
      } else {
        // 여기서 409 에러 등 처리 가능
        if (response.status === 409) {
          if(response.message==="EMAIL_CONFLICT")
            elEmailHelper.innerHTML = "*이미 사용 중인 이메일입니다.";
          else
            elNicknameHelper.innerHTML = "*이미 사용 중인 닉네임입니다.";
        }
        console.error("회원가입 실패", response.message);
      }
    }
  } else {
    elSigninBtn.style.backgroundColor = "var(--point-color)";
    elSigninBtn.onclick = null;
  }
}

//--------------------------------------------
// 3. 회원가입 처리 함수 (중복 확인 → 실제 API 호출)
async function signupUser() {
  const email    = elInputEmail.value;
  const nickname = elInputNickname.value;
  const password = elInputPw.value;
  let img = "assets/img/data/profilePicture/";

  if(profileImgName != "")
    img += profileImgName;
  else
    img += "profile.png";

  // 3-1. 기존 회원 중복 여부 체크
  try {
    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',            // 기본값이지만 명시 권장
      credentials: 'include',   // allowCredentials=true일 때만 사용
      body: JSON.stringify({
          email: email,
          password: password,
          nickname: nickname,
          img: img
      })
    });
    // const users = await response.json();

    if(!response.ok){
      const error = await response.json();
      if(response.status === 409){
        if(error.details==="EMAIL_CONFLICT"){
          return {
            ok: false,
            status: 409,
            message: "EMAIL_CONFLICT"
          }
        }
        else{
          return {
            ok:false,
            status: 409,
            message: "NICKNAME_CONFLICT"
          }
        }
      }
      else if(response.status === 401){
        return {
          ok: false,
          status: 401,
          message: "unauthorized user"
        }
      }
    }
    else{
      const result = await response.json();
      return {
        ok: true,
        status: 201,
        message: "signup success",
        data: result
      }
    }
  } catch (error) {
    console.error("회원가입 처리 중 오류:", error);
    elHelperText.innerHTML = '*회원가입 중 오류가 발생했습니다.';
    return {
      ok: false,
      status: 500,
      message: "unexpected server error",
      data: null
    }
  }
}
