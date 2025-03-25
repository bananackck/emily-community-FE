// DOM 업데이트
export const updateDom = (container, post)=>{
    const postElement = document.createElement("article");
    // 클릭 시 이동
    postElement.onclick = async () => {
        console.log(post)
        try{
            // const response = await postView(post.id);
            // console.log(response);
            window.location.href = `../pages/post.html?id=${post.id}`;
        }
        catch{
            console.error("게시물 조회 실패", response.message);
        }
    };
    // 게시물 하나씩 그리기
    postElement.classList.add("post");
    postElement.innerHTML = `
      <div class="post-header">
          <div class="post-info">
              <div class="post-title" id="title">${post.title}</div>
              <div class="post-info-wrap">
                  <div class="info">좋아요<p id="likeCount">${post.likeCount}</p></div>
                  <div class="info">댓글<p id="commentCount">${post.commentCount}</p></div>
                  <div class="info">조회수<p id="viewCount">${post.viewCount}</p></div>
              </div>
          </div>
          <div id="post-time">${post.createdAt}</div>
      </div>
      <div class="writer-wrap">
          <div class="profile">
              <img id="profile-img" src="${post.profile}" alt="프로필 가기" style="border-radius: 20px;">
          </div>
          <div id="writer">${post.author}</div>
      </div>
    `;
    container.appendChild(postElement);
}

//---------------------
//게시물 상세 조회 
// async function postView(postId) {
//     //jwt토큰
//     const token = localStorage.getItem('jwtToken');
//     try{
//         const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             mode: 'cors',            // 기본값이지만 명시 권장
//             credentials: 'include',   // allowCredentials=true일 때만 사용
//             body: JSON.stringify({
//                 title: title,
//                 text: text,
//                 img: img
//             })
//         });
        
//         if(!response.ok){
//             return{
//                 ok:false,
//                 status: 404,
//                 message: "🚨 404 NOT FOUND"
//             }
//         }
//         return{
//             ok: true,
//             status: 201,
//             message: "✅ 201 post upload success.",
//             data: await response.json()
//         }
//     }
//     catch{
//         return {
//             ok:false,
//             status: 500,
//             message: "🚨 500 unexpected server error"
//         }
//     }
// }