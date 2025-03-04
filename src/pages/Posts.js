// onclick
const post=document.querySelector('.post');
post.onclick = ()=>{
    location.href = "./post.html";
}

// 게시글 불러오기
async function showPosts() {
    const title=document.querySelector('#title');
    const likeCount=document.querySelector('#likeCount');
    const commentCount=document.querySelector('#commentCount');
    const viewCount=document.querySelector('#viewCount');
    const createdAt=document.querySelector('#post-time');
    const author=document.querySelector('#writer');
    const profile=document.querySelector('#profile-img');

  try {
    // 게시글 헤더
    const postData = await fetch('../post-data.json');
    const posts = await postData.json();

    const post=posts[0];

    title.innerHTML=post.title;
    likeCount.innerHTML=post.likeCount;
    commentCount.innerHTML=post.commentCount;
    viewCount.innerHTML=post.viewCount;
    createdAt.innerHTML=post.createdAt;

    // 게시글 저자
    const userData = await fetch('../data.json');
    const users = await userData.json();

    const user=users[post.author];

    author.innerHTML=user.nickname;
    profile.src="../"+user.profilePicture;

  } catch (error) {
    console.error("게시물 로드 오류:", error);
  }
}

document.addEventListener('DOMContentLoaded',showPosts());