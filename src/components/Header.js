

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
        <div class="project-name">아무 말 대잔치</div>
        <div class="nav-btn right none" id="dropdown">
            <div class="dropdown">
                <label for="dropbtn">
                    <img id="profile-img" src="../assets/img/profile.png" alt="프로필 가기" style="border-radius: 20px;">
                </label>
                <button class="dropbtn" id="dropbtn"></button>
                <div class="dropdown-content" id="content">
                    <a href="./edit-profile.html">회원정보수정</a>
                    <a href="./edit-password.html">비밀번호수정</a>
                    <a href="./login.html">로그아웃</a> 
                </div>
            </div>
        </div>
        <div class="nav-btn right" id="nonDropdown">
            <a href="./edit-profile.html">
                <img id="profile-img" src="../assets/img/profile.png" alt="프로필 가기" style="border-radius: 20px;">
            </a>
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
      const navBtns = this.shadowRoot.querySelectorAll('.nav-btn.left');
      navBtns.forEach(btn => btn.classList.add('hidden'));
    }
    // "right-hidden" 속성이 있으면 네비 버튼에서 hidden 클래스를 추가
    if (this.hasAttribute('right-hidden')) {
      const navBtns = this.shadowRoot.querySelectorAll('#nonDropdown');
      navBtns.forEach(btn => btn.classList.add('hidden'));
    }
    // "dropdown" 속성이 있으면 dropdown 보이기
    if (this.hasAttribute('dropdown')) {
      const showDropdown = this.shadowRoot.querySelectorAll('#dropdown');
      showDropdown.forEach(btn => btn.classList.remove('none'));
      const hideDropdown = this.shadowRoot.querySelectorAll('#nonDropdown');
      hideDropdown.forEach(btn => btn.classList.add('none'));
    }

    // 드롭다운 처리
    var elDropBtn = this.shadowRoot.querySelector('#dropbtn');
    var elDropcontent = this.shadowRoot.querySelector('#content')

    var isShown = false

    elDropBtn.onclick=function(){
        if(!isShown){
            elDropcontent.style.display="block"
        }
        else{
            elDropcontent.style.display="none"
        }
        isShown=isShown ^ true
    }

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


