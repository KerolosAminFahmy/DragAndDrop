const inputText =document.querySelector('input');
const ButtonAdd = document.querySelector('button');
const AllBox = document.querySelectorAll('.box');

var Drag=null;

ButtonAdd.addEventListener('click',(e)=>{
  e.preventDefault();
  if(inputText.value!=''){
    const Query=
      `
      <div class="item" draggable="true">
        <p>${inputText.value}</p>
        <i class="fa-solid fa-xmark"></i>
      </div>
      `
    AllBox[0].querySelector('.ListItem').innerHTML+=Query;
    inputText.value='';
  }
  Start();
  Remove();
});
function Start(){
  const AllItem = document.querySelectorAll('.item');
  AllItem.forEach((item)=>{
    var initialTouchX,initialTouchY;
    item.addEventListener("dragstart",(e)=>{
      Drag=item;
      item.style.opacity="0.5";
      item.parentElement.parentElement.style.backgroundColor="green";
    });
    item.addEventListener("dragend",(e)=>{
      Drag=null;
      item.style.opacity="1";
      item.parentElement.parentElement.style.backgroundColor="aliceblue";
    });
    item.addEventListener("touchstart",(e)=>{
      e.preventDefault();
      initialTouchX = e.touches[0].clientX;
      initialTouchY = e.touches[0].clientY;
      item.style.opacity="0.5";
    });
    item.addEventListener("touchmove",(e)=>{
      e.preventDefault();
      var deltaX = e.touches[0].clientX - initialTouchX+"px";
      var deltaY = e.touches[0].clientY - initialTouchY+"px";
      item.style.top=deltaY;
      item.style.left=deltaX;
      AllBox.forEach((Box)=>{
        
      if(
        ((
          item.offsetLeft >= Box.offsetLeft && 
          item.offsetLeft <= (Box.offsetLeft + Box.offsetWidth)
        )||
        (
          item.offsetLeft + item.offsetWidth >= Box.offsetLeft && 
          item.offsetLeft + item.offsetWidth <= (Box.offsetLeft + Box.offsetWidth)
        ))
          &&((
            item.offsetTop >= Box.offsetTop && 
            item.offsetTop <= (Box.offsetTop + Box.offsetHeight)
          )||
          (
            item.offsetTop + item.offsetHeight >= Box.offsetTop && 
            item.offsetTop + item.offsetHeight <= (Box.offsetTop + Box.offsetHeight)
          ))
        )
        {
          Box.style.backgroundColor="green";
          return;
        }else{
          Box.style.backgroundColor="aliceblue";
        }
    });

    });
    item.addEventListener("touchend",(e)=>{
      var IsFound=false;
      AllBox.forEach((Box)=>{
        if(
          ((
            item.offsetLeft >= Box.offsetLeft && 
            item.offsetLeft <= (Box.offsetLeft + Box.offsetWidth)
          )||
          (
            item.offsetLeft + item.offsetWidth >= Box.offsetLeft && 
            item.offsetLeft + item.offsetWidth <= (Box.offsetLeft + Box.offsetWidth)
          ))
            &&((
              item.offsetTop >= Box.offsetTop && 
              item.offsetTop <= (Box.offsetTop + Box.offsetHeight)
            )||
            (
              item.offsetTop + item.offsetHeight >= Box.offsetTop && 
              item.offsetTop + item.offsetHeight <= (Box.offsetTop + Box.offsetHeight)
            ))
          )
          {
          item.style.top=0;
          item.style.left=0;
          IsFound=true;
          Box.querySelector(".ListItem").append(item);
        }
      });
      if(!IsFound){
        item.style.top=0;
        item.style.left=0;
      }
      item.style.opacity="1";
      item.parentElement.parentElement.style.backgroundColor="aliceblue";
      AllBox.forEach((Box)=>{
        if(Box.style.backgroundColor=="green"){
          Box.style.backgroundColor="aliceblue";
        }
      })
    });
  });
  AllBox.forEach((Box)=>{
    Box.addEventListener("dragover",(e)=>{
      e.preventDefault();
      Box.style.backgroundColor="green";
    });
    Box.addEventListener("dragleave",(e)=>{
      Box.style.backgroundColor="aliceblue";
    });
    
    Box.addEventListener("drop",()=>{
      Box.querySelector(".ListItem").append(Drag);
      Box.style.backgroundColor="aliceblue";
    });

  })
}
function  Remove(){
  const AllClose = document.querySelectorAll('.item i');
  AllClose.forEach((Close)=>{
    Close.addEventListener("click",(e)=>{
      Close.parentElement.parentNode.removeChild(Close.parentElement);
    }); 
  });
}

const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon"),
Disable=document.querySelector(".DarkBody");

closeIcon.onclick = ()=>{ 
  wrapper.classList.add("hide");
}
window.onload = ()=>{
  window.addEventListener("online", ()=>{
    online();
  });
  window.addEventListener("offline", ()=>{
    offline();
  });
}
window.addEventListener("online", ()=>{
  online();
});
window.addEventListener("offline", ()=>{
  offline();
});
function offline(){ 
  Disable.style.display = "block";
  wrapper.classList.remove("hide");
  toast.classList.add("offline");
  title.innerText = "You're offline now";
  subTitle.innerText = "Opps! Internet is disconnected.";
  wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
}
function online(){
  toast.classList.remove("offline");
  title.innerText = "You're online now";
  subTitle.innerText = "Internet is connected.";
  wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
  Disable.style.display = "none";
  setTimeout(()=>{ 
    wrapper.classList.add("hide");
  }, 3000);
}

