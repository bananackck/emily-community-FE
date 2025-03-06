var elInputTitle = document.getElementById('title')
var elInputText = document.getElementById('text')
var elCompleteBtn = document.getElementById('complete-btn')
var elTextHelper = document.getElementById('text-helper')
var elFile = document.getElementById('file')

var titlePass = false
var textPass = false

const info=document.getElementById('info-wrap')

elInputTitle.onkeyup=function(){
    const title=elInputTitle.value
    titlePass=false
    if(title){
        titlePass=true
    }
    btnActivate()
} 
elInputText.onkeyup=function(){
    const text=elInputText.value
    textPass=false
    if(text){
        elTextHelper.innerHTML=''
        textPass=true
    }
    else{
        elTextHelper.innerHTML='*제목, 내용을 모두 작성해주세요'
    }
    console.log(elTextHelper)
    btnActivate()
}

elFile.onchange=function(){
    const selected=this.files[0];

    const reader = new FileReader();
    
    reader.onload=function(){
        var msg=document.getElementById('filename')
        msg.innerHTML=selected.name
    }
    reader.readAsDataURL(selected)
}
function btnActivate(){
    if(titlePass && textPass){
        elCompleteBtn.style.backgroundColor="var(--activate-color)"
        elCompleteBtn.onclick=function(){
            window.location.href="../pages/post.html"
        }
    }
    else{
        elCompleteBtn.style.backgroundColor="var(--point-color)"
    }
}