(()=>{class e{static toggleProjectListInput(){const e=document.createElement("input");e.type="text",e.classList.toggle("new-project"),null!=document.querySelector(".new-project")?document.querySelector(".project-list").removeChild(document.querySelector(".new-project")):document.querySelector(".project-list").appendChild(e)}static toggleNewNoteDialog(){const e=document.querySelector(".new-note");console.log(e.style.visibility),e.style.visibility="visible"!=e.style.visibility?"visible":"hidden"}static appendNote(e,t,o,c){const i=document.querySelector(".content"),l=document.createElement("div"),n=document.createElement("input"),s=document.createElement("span");s.textContent=e,n.type="checkbox",o&&(n.checked=!0,s.innerHTML=`<s>${s.textContent}<s>`);let a="";switch(t){case 0:a="green";break;case 1:a="blue";case 2:a="red"}l.style.borderLeftColor=a,l.classList.toggle("item"),l.dataset.id=c,l.appendChild(n),l.appendChild(s),i.appendChild(l)}static appendProject(e,t,o,c){const i=document.createElement("li"),l=document.createElement("span"),n=document.createElement("div"),s=document.querySelector(".project-list");o&&i.classList.toggle("active"),n.classList.toggle("color"),l.classList.toggle("text"),l.textContent=e,n.style.backgroundColor=t,i.dataset.id=c,i.appendChild(n),i.appendChild(l),s.appendChild(i)}static expandNote(e){}}!function(){let t=[];if(0==localStorage.length){let e={name:"Default",color:"red",isActive:!0,id:0,notes:[]};e.notes.push({title:"This is an example note",priority:0,isChecked:!0,id:0}),t.push(e),e.isActive=!1,t.push(e),localStorage.todo=JSON.stringify(t)}t=JSON.parse(localStorage.todo),t.forEach((t=>{e.appendProject(t.name,t.color,t.isActive,t.id),t.notes.forEach((t=>{e.appendNote(t.title,t.priority,t.isChecked,t.id)}))}))}()})();