let db = JSON.parse(localStorage.getItem("gym")) || {
sessions:[],
active:null
};

function save(){localStorage.setItem("gym",JSON.stringify(db));}

function nav(screen){
if(screen==="home") renderHome();
if(screen==="train") renderTrain();
if(screen==="history") renderHistory();
if(screen==="settings") renderSettings();
}

function renderHome(){
app.innerHTML=`
<div class="card">
<h2>Inicio</h2>
<p>Sesiones: ${db.sessions.length}</p>
</div>`;
}

function renderTrain(){
if(db.active){
renderActive();
return;
}
app.innerHTML=`
<div class="card">
<h2>Nuevo entrenamiento</h2>
<button class="primary" onclick="start()">Iniciar</button>
</div>`;
}

function start(){
db.active={date:Date.now(),sets:[]};
save();
renderActive();
}

function renderActive(){
app.innerHTML=`
<div class="card">
<h2>Sesión activa</h2>
<input id="exercise" placeholder="Ejercicio"><br><br>
<input id="weight" placeholder="Peso"><br><br>
<input id="reps" placeholder="Reps"><br><br>
<button class="primary" onclick="addSet()">Agregar serie</button>
<br><br>
<button onclick="finish()">Finalizar</button>
</div>`;
}

function addSet(){
let ex=exercise.value;
let w=weight.value;
let r=reps.value;
db.active.sets.push({ex,w,r});
save();
alert("Serie guardada");
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
div.innerHTML=`${new Date(s.date).toLocaleString()}<br>${s.sets.length} sets`;
app.appendChild(div);
});
}

function renderSettings(){
app.innerHTML=`
<div class="card">
<h2>Ajustes</h2>
<button onclick="reset()">Borrar datos</button>
</div>`;
}

function reset(){
if(confirm("Seguro?")){
localStorage.clear();
location.reload();
}
}

nav("home");

// SW
if("serviceWorker" in navigator){
navigator.serviceWorker.register("./service-worker.js");
}
