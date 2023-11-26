(()=>{let e=[];class t{static toggleProjectListInput(){const c=document.createElement("input");c.type="text",c.classList.toggle("new-project"),c.addEventListener("keypress",(function(c){"Enter"===c.key&&(e.push(o.createProject(c.target.value,"blue",!1,e.length)),t.appendProject(c.target.value,"blue",!1,e.length),t.toggleProjectListInput(),o.updateStorage())})),null!=document.querySelector(".new-project")?document.querySelector(".project-list").removeChild(document.querySelector(".new-project")):document.querySelector(".project-list").appendChild(c)}static toggleNewNoteDialog(){const e=document.querySelector(".new-note");console.log(e.style.visibility),e.style.visibility="visible"!=e.style.visibility?"visible":"hidden"}static appendNote(t,c,n,r){const i=document.querySelector(".content"),a=document.createElement("div"),l=document.createElement("input"),s=document.createElement("span");s.textContent=t,l.type="checkbox",n&&(l.checked=!0,s.innerHTML=`<s>${s.textContent}<s>`),l.addEventListener("change",(t=>{const c=t.target.nextSibling,n=t.currentTarget.parentNode.dataset.id;1!=t.target.checked?c.innerHTML=`${c.textContent}`:c.innerHTML=`<s>${c.textContent}<s>`,console.log(n),console.log(e[o.getActiveProjectID()].notes[n].isChecked),e[o.getActiveProjectID()].notes[n].isChecked=!0!==e[o.getActiveProjectID()].notes[n].isChecked,o.updateStorage()}));let d="";switch(c){case 0:d="green";break;case 1:d="blue";break;case 2:d="red"}a.style.borderLeftColor=d,a.classList.toggle("item"),a.dataset.id=r,a.appendChild(l),a.appendChild(s),i.appendChild(a)}static appendProject(e,o,c,n){const r=document.createElement("li"),i=document.createElement("span"),a=document.createElement("div"),l=document.querySelector(".project-list");c&&r.classList.toggle("active"),a.classList.toggle("color"),i.classList.toggle("text"),i.textContent=e,a.style.backgroundColor=o,r.dataset.id=n,r.appendChild(a),r.appendChild(i),r.addEventListener("click",(e=>{t.toggleActive(e.currentTarget)})),l.appendChild(r)}static toggleActive(c){const n=document.querySelector(".active");n.classList.toggle("active"),e[n.dataset.id].isActive=!1;const r=document.querySelector(`[data-id~="${c.dataset.id}"]`);e[c.dataset.id].isActive=!0,r.classList.toggle("active"),t.loadProject(c.dataset.id),o.updateStorage()}static loadProject(o){const c=e[o];t.clearNotes(),c.notes.forEach((e=>{t.appendNote(e.title,e.priority,e.isChecked,e.id)}))}static clearNotes(){document.querySelectorAll(".item").forEach((e=>e.remove()))}static updateEventHandlers(){const c=document.querySelector(".sidebar .heading button"),n=document.querySelector(".content .heading button"),r=document.querySelectorAll(".project-list li"),i=document.querySelectorAll(".content .item input"),a=document.querySelector(".new-note button");c.addEventListener("click",t.toggleProjectListInput),n.addEventListener("click",t.toggleNewNoteDialog),r.forEach((e=>e.addEventListener("click",(e=>t.toggleActive(e.currentTarget))))),i.forEach((t=>t.addEventListener("change",(t=>{const c=t.target.nextSibling,n=t.currentTarget.parentNode.dataset.id;1!=t.target.checked?c.innerHTML=`${c.textContent}`:c.innerHTML=`<s>${c.textContent}<s>`,console.log(n),console.log(e[o.getActiveProjectID()].notes[n].isChecked),e[o.getActiveProjectID()].notes[n].isChecked=!0!==e[o.getActiveProjectID()].notes[n].isChecked,o.updateStorage()})))),a.addEventListener("click",(c=>{c.preventDefault();const n=document.querySelector("#title").value,r=+document.querySelector("#priority").value,i=o.getActiveProjectID(),a=e[i].notes.length;if(""==n)alert("Title is empty!");else{const c=o.createNote(n,r,!1,a);t.appendNote(n,r,!1,a),e[i].notes.push(c),o.updateStorage(),t.toggleNewNoteDialog()}}))}}class o{static createNote(e,t,o,c){return{title:e,priority:t,isChecked:o,id:c}}static createProject(e,t,o,c){return{name:e,color:t,isActive:o,id:c,notes:[]}}static updateStorage(){localStorage.todo=JSON.stringify(e)}static getActiveProjectID(){return document.querySelector(".active").dataset.id}}!function(){if(0==localStorage.length){let t=o.createProject("Default","red",!0,0);t.notes.push(o.createNote("This is an example note",0,!0,0)),e.push(t),localStorage.todo=JSON.stringify(e)}t.clearNotes(),e=JSON.parse(localStorage.todo),e.forEach((e=>{t.appendProject(e.name,e.color,e.isActive,e.id),!0===e.isActive&&e.notes.forEach((e=>{t.appendNote(e.title,e.priority,e.isChecked,e.id)}))})),t.updateEventHandlers()}()})();