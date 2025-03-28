

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" type="text/css" href="../assets/style/header.css">
  <header>
    <div class="header-contents">    
        <div class="nav-btn left">
            <a href="javascript:history.back()">
                <img id="nav-back-img" src="../assets/img/navigate-back.png" alt="뒤로가기">
            </a>
        </div>
        <div class="project-name">내 새꾸 좀 봐봐요</div>
        <div class="nav-btn right" id="dropdown">
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
        </div>

    </div>
  </header>
`;

class MyHeader extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM 사용: 스타일 및 DOM 캡슐화 가능
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // "left-hidden" 속성이 있으면 네비 버튼에서 hidden 클래스를 추가
    if (this.hasAttribute('left-hidden')) {
      const navBtns = this.shadowRoot.querySelector('.nav-btn.left');
      navBtns.classList.add('hidden');
    }
    // "right-hidden" 속성이 있으면 네비 버튼에서 hidden 클래스를 추가
    if (this.hasAttribute('right-hidden')) {
      const navBtns = this.shadowRoot.querySelector('.nav-btn.right');
      navBtns.classList.add('hidden');
    }

    // 드롭다운 처리
    var elDropBtn = this.shadowRoot.querySelector('#dropbtn');
    var elDropContent = this.shadowRoot.querySelector('#content')

    var isShown = false

    elDropBtn.onclick=function(){
        if(!isShown){
            elDropContent.style.display="block"
        }
        else{
            elDropContent.style.display="none"
        }
        isShown=isShown ^ true
    }

    //로그아웃
    const elLogoutBtn = this.shadowRoot.querySelector('#logoutBtn');
    elLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('profileImg');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      window.location.href = '../pages/login.html';

    });


    //아무 말 대잔치 누를 시 게시판 목록으로
    const elHeaderLogo = this.shadowRoot.querySelector('.project-name');
    elHeaderLogo.addEventListener('click', () => {
      window.location.href = '../pages/posts.html';
    });

    //프로필 사진 설정
    const elProfileImg = this.shadowRoot.querySelectorAll('#profile-img');
    elProfileImg.forEach((img) => {
      img.src = localStorage.getItem('profileImg');
    });
  }
}

customElements.define('my-header', MyHeader);


