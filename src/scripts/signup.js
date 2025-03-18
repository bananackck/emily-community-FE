import * as validator from "../components/validator.js";

const elInputProfile  = document.getElementById('profile-image');
const elInputEmail    = document.getElementById('email');
const elInputPw       = document.getElementById('pw');
const elInputPw2      = document.getElementById('pw2');
const elInputNickname = document.getElementById('nickname');

let profilePass  = false;
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
  profilePass = validator.uploadProfile(this);
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
          if(response.message==="duplicate email")
            elEmailHelper.innerHTML = "*이미 사용 중인 이메일입니다.";
          else
            elNicknameHelper.innerHTML = "*이미 사용 중인 이메일 또는 닉네임입니다.";
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

  // 3-1. 기존 회원 중복 여부 체크
  try {
    const response1 = await fetch('../data/user-data.json');
    const users = await response1.json();

    const duplicateEmail = users.some(user => user.email === email);
    const duplicateNickname = users.some(user => user.nickname === nickname);

    if (duplicateEmail) {
      return {
        ok: false,
        status: 409,
        message: "duplicate email",
        data: null
      }
    }
    if (duplicateNickname) {
      return {
        ok: false,
        status: 409,
        message: "duplicate nickname",
        data: null
      }
    }

    // POST
    // fetch url 바꾸기
    // const signupResponse = await fetch('http://localhost:3000/src/pages/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     nickname: nickname,
    //     profilePicture: elInputProfile.src
    //   })
    // });

    // 3-3. 서버에서 주는 응답 처리
    // 백엔드 붙이고 이거로 바꾸기
    // if (signupResponse.ok) {
    else{
      // 201 Created라면
      // 백엔드 붙이고 주석 해제제
      // const result = await signupResponse.json();
      return {
        ok: true,
        status: 201,
        message: "signup success",
        // 백엔드 붙이고 대체체
        // data: result
        data: {
              id: users.length + 1,
            }
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
