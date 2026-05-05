let db = JSON.parse(localStorage.getItem("gym")) || {
exercises:[
{name:"Bench Press",group:"Chest"},
{name:"Squat",group:"Legs"},
{name:"Deadlift",group:"Back"}
],
sessions:[],
active:null
};

function save(){localStorage.setItem("gym",JSON.stringify(db));}

function nav(screen){
if(screen==="home") renderHome();
if(screen==="train") renderTrain();
if(screen==="exercises") renderExercises();
if(screen==="history") renderHistory();
}

function renderHome(){
app.innerHTML=`
<div class="card">
<h2>Dashboard</h2>
<p>Sesiones: ${db.sessions.length}</p>
<p>Ejercicios: ${db.exercises.length}</p>
</div>`;
}

function renderExercises(){
app.innerHTML=`
<div class="card">
<h2>Ejercicios</h2>
<input id="newEx" placeholder="Nuevo ejercicio">
<button class="primary" onclick="addExercise()">Agregar</button>
</div>
`;

db.exercises.forEach(e=>{
let div=document.createElement("div");
div.className="list-item";
div.innerText=e.name+" ("+e.group+")";
app.appendChild(div);
});
}

function addExercise(){
let name=newEx.value;
db.exercises.push({name,group:"Custom"});
save();
renderExercises();
}

function renderTrain(){
if(db.active){renderActive();return;}

let list=db.exercises.map((e,i)=>`
<div class="list-item" onclick="start('${e.name}')">${e.name}</div>
`).join("");

app.innerHTML=`
<div class="card">
<h2>Elegir ejercicio</h2>
${list}
</div>`;
}

function start(ex){
db.active={date:Date.now(),sets:[],exercise:ex};
save();
renderActive();
}

function renderActive(){
app.innerHTML=`
<div class="card">
<h2>${db.active.exercise}</h2>
<input id="weight" placeholder="Peso">
<input id="reps" placeholder="Reps">
<button class="primary" onclick="addSet()">Agregar serie</button>
<br><br>
<button onclick="finish()">Finalizar</button>
</div>
`;

db.active.sets.forEach(s=>{
let div=document.createElement("div");
div.className="list-item";
div.innerText=s.w+"kg x "+s.r;
app.appendChild(div);
});
}

function addSet(){
db.active.sets.push({w:weight.value,r:reps.value});
save();
renderActive();
}

function finish(){
db.sessions.push(db.active);
db.active=null;
save();
nav("home");
}

function renderHistory(){
app.innerHTML="<h2>Historial</h2>";
db.sessions.forEach(s=>{
let div=document.createElement("div");
div.className="card";
div.innerHTML=`${new Date(s.date).toLocaleDateString()}<br>${s.exercise}<br>${s.sets.length} sets`;
app.appendChild(div);
});
}

nav("home");

if("serviceWorker" in navigator){
navigator.serviceWorker.register("./service-worker.js");
}
