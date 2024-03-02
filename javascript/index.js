import * as ans from "./answer.js";

const ans1HTML = ans.ans1HTML;
const ans2HTML = ans.ans2HTML;
const ans3HTML = ans.ans3HTML;
const ans4HTML = ans.ans4HTML;

function show(iconClass, answerClass, answerText) {
  const plusIcon = document.querySelector(`.${iconClass}`);
  const showAnswer = document.querySelector(`.${answerClass}`);
  
  plusIcon.addEventListener('click', () => {
    if(showAnswer.style.visibility == "hidden") {   
      showAnswer.style.visibility = "visible";
      showAnswer.innerHTML = answerText;
    }
    else {
      showAnswer.style.visibility = "hidden";
      showAnswer.innerHTML = "";
    }})
}

show("js-icon1", "answerOne", ans1HTML);
show("js-icon2", "answerTwo", ans2HTML);
show("js-icon3", "answerThree", ans3HTML);
show("js-icon4", "answerFour", ans4HTML);
