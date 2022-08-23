let fetchBtn = document.getElementById("start-button");
document.getElementById("loader-view").style.display = "none"
let submitBtn = document.getElementById("submit-button")
submitBtn.setAttribute("disabled", "true")
fetchBtn.addEventListener("click", buttoneventlistener)
function optionEventListerner(e) {
  let submitBtn = document.getElementById("submit-button")
  submitBtn.disabled = false
  let children = document.getElementById("options-container").children
  console.log(children)
  for (let child of children) {
    child.classList.remove('user-answer')
  }
  e.target.classList.add('user-answer')
}
var completeloadGlobal;

async function buttoneventlistener() {
  document.getElementById("current-question-id").value =
  Math.floor(Math.random() * 7);
  document.getElementById("start-button").style.display = "none"
  document.getElementById("pre-quiz-instructions").style.display = "none";
  document.getElementById("loader-view").style.display = "block"

  let questionid = document.getElementById('current-question-id').value
  let completeload = await fetch(`https://jsonmock.hackerrank.com/api/questions/${questionid}`)
  completeload = await completeload.json()
  console.log(completeload)
  document.getElementById("loader-view").style.display = "none"
  document.getElementById('question').innerText = completeload.data.question;

  
  let optionsContainer = document.getElementById("options-container")
  let options = completeload.data.options
  options.map((option) => {
    let optionHtml = document.createElement("div")
    optionHtml.addEventListener("click", optionEventListerner)
    optionHtml.innerText = option
    optionsContainer.appendChild(optionHtml)
  })
  completeloadGlobal = JSON.parse(JSON.stringify(completeload))
}
document.getElementById("submit-button").addEventListener("click", submitListener)
function submitListener() {
  
  let i = -1
  let children = document.getElementById("options-container").children
  for (let child of children) {
    i += 1
    
    if (completeloadGlobal.data.answer == i) {
      child.classList.add("correct-answer")
    }
    if (child.classList.contains('user-answer')) {
      if (completeloadGlobal.data.answer != i) {
        child.classList.add("wrong-answer")
      }
    }
  }
  setInterval("location.reload(true);", 2000);
}