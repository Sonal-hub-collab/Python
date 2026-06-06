// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let role = document.getElementById("role").value;

  localStorage.setItem("user", user);
  localStorage.setItem("role", role);

  if(role === "teacher") {
    window.location = "teacher.html";
  } else {
    window.location = "quiz.html";
  }
}

// ================= TEACHER =================

// ADD QUESTION
function addQuestion(){
  let q = document.getElementById("q").value;
  let o1 = document.getElementById("o1").value;
  let o2 = document.getElementById("o2").value;
  let o3 = document.getElementById("o3").value;
  let ans = parseInt(document.getElementById("ans").value);

  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  questions.push({
    q: q,
    options: [o1, o2, o3],
    answer: ans
  });

  localStorage.setItem("questions", JSON.stringify(questions));

  alert("Question Added!");
}

// ================= QUIZ =================

let questions = JSON.parse(localStorage.getItem("questions")) || [];

let current = localStorage.getItem("current") 
  ? parseInt(localStorage.getItem("current")) 
  : 0;

let answers = JSON.parse(localStorage.getItem("answers")) || [];

let time = 60;
let timer;

// LOAD QUESTION
function loadQuestion(){

  if(current >= questions.length){
    showResult();
    return;
  }

  let q = questions[current];
  document.getElementById("question").innerText = q.q;

  let ansDiv = document.getElementById("answers");
  ansDiv.innerHTML = "";

  q.options.forEach((opt, i)=>{
    let div = document.createElement("div");
    div.classList.add("option");
    div.innerText = opt;

    if(answers[current] === i){
      div.classList.add("selected");
    }

    div.onclick = ()=>select(i);

    ansDiv.appendChild(div);
  });

  startTimer();
}

// SELECT
function select(i){
  answers[current] = i;
  localStorage.setItem("answers", JSON.stringify(answers));

  let opts = document.querySelectorAll(".option");
  opts.forEach(o=>o.classList.remove("selected"));
  opts[i].classList.add("selected");
}

// NEXT
function next(){
  current++;
  localStorage.setItem("current", current);
  loadQuestion();
}

// TIMER
function startTimer(){
  clearInterval(timer);
  time = 60;

  timer = setInterval(()=>{
    document.getElementById("timer").innerText = time;
    time--;

    if(time < 0){
      clearInterval(timer);
      next();
    }
  },1000);
}

// RESULT
function showResult(){
  clearInterval(timer);

  let score = 0;

  questions.forEach((q,i)=>{
    if(answers[i] === q.answer){
      score++;
    }
  });

  document.body.innerHTML = `<h2>🎉 Score: ${score}/${questions.length}</h2>`;

  localStorage.clear();
}

// AUTO START
if(window.location.pathname.includes("quiz.html")){
  loadQuestion();
}