test = document.querySelector('.sidebar .heading button')
test.onclick = testFunc

function testFunc() {
    const temp = document.createElement('input');
    temp.type = 'text'
    temp.classList.toggle('new-project');
    document.querySelector('.project-list').appendChild(temp)
}