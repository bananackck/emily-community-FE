const modalTemplate = document.createElement('template');
modalTemplate.innerHTML = `
  <style>
    /*모달 팝업 영역 스타일링*/
    .modal {
        /*팝업 배경*/
        position: fixed;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: rgba(0,0,0,0.5);
        z-index: 20;
    }
    .modal .modal-popup {
        width: 320px;
        height: 184px;
        border-radius: 12px;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        font-family: var(--main-font);
        text-align: center;
        background: #ffffff;
    }

    .popup-title{
        font-weight: 700;
        font-size: 1.1rem;
    }
    .popup-msg{
        font-weight: 400;
        font-size: 1rem;
        // padding: 1rem 0;
    }
    .modal .modal-popup .btn-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal .modal-popup .btn-wrap .modal-btn {
        width: 96px;
        height: 36px;
        display: block;

        border: none;
        border-radius: 10%;
        cursor: pointer;

        font-family: var(--main-font);
        font-weight: 100;
        font-size: 1rem;

        gap: 0.5rem;
    }
    .no{
        background-color: #242424;
        color: #ffffff;
        margin-right: 4px;
    }
    .yes{
        background-color: #C4A5FA;
        color: #000000;
    }
    </style>

    <div class="modal">
        <div class="modal-popup">
        <h3 class="popup-title"></h3>
        <p class="popup-msg"></p>
        <div class="btn-wrap">
            <button type="button" class="modal-btn no">취소</button>
            <button type="button" class="modal-btn yes">확인</button>
        </div>
        </div>
    </div>
`;


class MyModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // title과 message 설정
    const title = this.getAttribute("title") || "기본 제목";
    const message = this.getAttribute("message") || "기본 메시지";
    this.shadowRoot.querySelector(".popup-title").textContent = title;
    this.shadowRoot.querySelector(".popup-msg").textContent = message;

    // 취소 버튼 클릭 시 모달 숨기기
    this.shadowRoot.querySelector(".modal-btn.no").addEventListener("click", () => {
      this.style.display = "none";
    });
    // 확인 버튼 클릭 시 로그인 페이지 이동
    this.shadowRoot.querySelector(".modal-btn.yes").addEventListener("click", () => {
        window.location.href='../pages/login.html'
    });
  }
}

customElements.define("my-modal", MyModal);
