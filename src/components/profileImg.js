//HTML
const profileImgTemplate = document.createElement('template');
profileImgTemplate.innerHTML = `
    <div class="profile-img-container">
        <img src="../assets/img/profile-placeholder.png" alt="프로필 가기" style="border-radius: 20px;">
    </div>
`;

//JS
class ProfileImg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(profileImgTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const elProfileImg = this.shadowRoot.querySelector('.profile-img-container img');
  
    const passedSrc = this.getAttribute('src');
    const storedSrc = localStorage.getItem('profileImg');
  
    // 우선순위: 속성 → localStorage
    elProfileImg.src = passedSrc || storedSrc;
  }
                           
}

//CSS
const style  = document.createElement('style');
style.textContent = `
  :host {
    margin: auto 0;
  }
  .profile-img-container {
    width: 40px;
    height: 40px;
    overflow: hidden;
    position: relative;
  }
  .profile-img-container img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
    }
`;
profileImgTemplate.content.prepend(style);

customElements.define('my-profileimg', ProfileImg);