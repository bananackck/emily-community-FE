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
const elHelperText = document.getElementById('helper-text');


elInputProfile.onchange = function() {
  profilePass = !!elInputProfile.files[0];
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

function btnActivate() {
  if (emailPass && pwPass && pw2Pass && nicknamePass) {
    elSigninBtn.style.backgroundColor = "var(--activate-color)";
    elSigninBtn.onclick = signupUser;
  } else {
    elSigninBtn.style.backgroundColor = "var(--point-color)";
    elSigninBtn.onclick = null;
  }
}

// 회원가입 처리 함수
async function signupUser() {
  const email    = elInputEmail.value;
  const nickname = elInputNickname.value;
  const profileFile = elInputProfile.files[0];

  // 프로필 사진 업로드
  let profileImagePath = null;
  if (profileFile) {
    const uploadResult = await validator.uploadProfileImage(profileFile, nickname);
    if (uploadResult && uploadResult.success) {
      profileImagePath = uploadResult.filePath;
    } else {
      elProfileHelper.innerHTML = '*프로필 사진 업로드에 실패했습니다.';
      return;
    }
  }

  // 기존 회원과 중복 여부 체크
  try {
    const response = await fetch('../data.json');
    const users = await response.json();

    const duplicateEmail = users.some(user => user.email === email);
    const duplicateNickname = users.some(user => user.nickname === nickname);

    if (duplicateEmail) {
      elEmailHelper.innerHTML = '*이미 사용 중인 이메일입니다.';
      return;
    }
    if (duplicateNickname) {
      elNicknameHelper.innerHTML = '*이미 사용 중인 닉네임입니다.';
      return;
    }

    // 성공
    window.location.href = "./posts.html";
  } catch (error) {
    console.error("회원가입 처리 중 오류:", error);
    elHelperText.innerHTML = '*회원가입 중 오류가 발생했습니다.';
  }
}
