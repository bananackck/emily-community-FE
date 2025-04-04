import './profileImg.js'; // header.js의 맨 위에

//HTML
const dropdownTemplate = document.createElement('template');
dropdownTemplate.innerHTML = `
  <div class="dropdown">
    <my-profileimg></my-profileimg>
    <div class="dropdown-content" id="content">
      <a href="../profile-edit/edit-profile.html">회원정보수정</a>
      <a href="../password-edit/edit-password.html">비밀번호수정</a>
      <a id="logoutBtn">로그아웃</a> 
    </div>
  </div>
`;

//JS
class MyDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(dropdownTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const elDropBtn = this.shadowRoot.querySelector('my-profileimg');
    const elDropContent = this.shadowRoot.querySelector('#content');

    let isShown = false;

    // 프로필 사진 클릭 시 드롭다운 메뉴 열기
    elDropBtn.addEventListener('click', (e) => {
      elDropContent.style.display = isShown ? "none" : "block";
      isShown = !isShown;
    });    
    
    // 로그아웃 처리
    const elLogoutBtn = this.shadowRoot.querySelector('#logoutBtn');
    elLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('profileImg');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      window.location.href = '../login/login.html';
    }); 
  }
}

//CSS
const style = document.createElement('style');
style.textContent = `
  .dropdown {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 40px;
  }

  .dropdown-content {
      display: none;
      position: absolute;
      top: 110%; /* 버튼 아래 */
      right: 0; /* 오른쪽 정렬 원할 경우 */
      z-index: 1000; /* 다른 요소 위에 뜨게 */
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
      cursor: pointer;
      text-decoration: none;
  }

  .dropdown-content a:hover {
      background-color: #E9E9E9;
  }
`;
dropdownTemplate.content.prepend(style);

customElements.define('my-dropdown', MyDropdown);
