const dropdownTemplate = document.createElement('template');
dropdownTemplate.innerHTML = `
  <style>
    .dropdown {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 40px;
    }

    .dropdown-content {
      display: none;
      position: fixed;
      float: right;
      top: 72px;
      left: 60vw;
      z-index: 1;
    }

    .dropdown-content a {
      width: 115px;
      height: 35px;
      gap: 8px;
      padding-top: 4px;
      text-align: center;
      font-family: 'Interop';
      font-weight: 400;
      font-size: 0.8rem;
      background-color: var(--color-white);
      display: block;
      border: solid 1px var(--point-color);
      color: #000000;
    }

    .dropdown-content a:hover {
      background-color: #E9E9E9;
    }

    .dropbtn {
      display: none;
    }
    #profile-img {
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  </style>

  <div class="dropdown">
    <label for="dropbtn">
      <img id="profile-img" src="../assets/img/profile-basic.png" alt="프로필 가기" style="border-radius: 20px;">
    </label>
    <button class="dropbtn" id="dropbtn"></button>
    <div class="dropdown-content" id="content">
      <a href="./edit-profile.html">회원정보수정</a>
      <a href="./edit-password.html">비밀번호수정</a>
      <a id="logoutBtn">로그아웃</a> 
    </div>
  </div>
`;

class MyDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(dropdownTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const elDropBtn = this.shadowRoot.querySelector('#dropbtn');
    const elDropContent = this.shadowRoot.querySelector('#content');

    let isShown = false;

    elDropBtn.onclick = () => {
      elDropContent.style.display = isShown ? "none" : "block";
      isShown = !isShown;
    };

    // 로그아웃 처리
    const elLogoutBtn = this.shadowRoot.querySelector('#logoutBtn');
    elLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('profileImg');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      window.location.href = '../pages/login.html';
    });

    //프로필 사진 설정
    const elProfileImg = this.shadowRoot.querySelectorAll('#profile-img');
    elProfileImg.forEach((img) => {
        img.src = localStorage.getItem('profileImg');
    });
  }
}

customElements.define('my-dropdown', MyDropdown);
