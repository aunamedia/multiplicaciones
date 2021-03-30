
const urlParams = new URLSearchParams(window.location.search)

var numbers1 = [0,1,2,3,4,5,6,7,8,9,10]
if(urlParams.has("n1")){
    var _number1 = []
    n1 = (new Set(urlParams.getAll("n1")))
    n1.forEach(element => {
        if (Number.isInteger(Number(element))){
            _number1.push(Number(element))
        }
    });
    numbers1 = _number1 == []? numbers1 : _number1
}


//new Set([iterable]);
var numbers2 = [0,1,2,3,4,5,6,7,8,9,10]
if(urlParams.has("n2")){
    var _number2 = []
    n2 = (new Set(urlParams.getAll("n2")))
    n2.forEach(element => {
        if (Number.isInteger(Number(element))){
            _number2.push(Number(element))
        }
    });
    numbers2 = _number2 == []? numbers2 : _number2
}
var meta = 20
var tiempo_uni = 7


// urlParams.append("nn", [1,2,3,4,5])
// console.log(urlParams.toString())
// console.log(urlParams.getAll("nn"))
var param = '';

param = 'meta'
var meta = urlParams.has(param) && urlParams.get(param)!= '' && Number.isInteger(Number(urlParams.get(param)))?Number(urlParams.get(param)):meta;

param = 'tiempo_uni'
var tiempo_uni = urlParams.has(param) && urlParams.get(param)!= '' && Number.isInteger(Number(urlParams.get(param)))?Number(urlParams.get(param)):tiempo_uni;

var timeout


var cont = 0
var nuevo = true
var num1, num2, label_op
// esta función se encarga de sacar algo por pantalla (incluso en desarrollo por console.log)
function s(t){
    //console.log(t)
    document.getElementById("salida").innerHTML = t+"<br>"+document.getElementById("salida").innerHTML;
}

function poner_operacion_actual(t){
    document.getElementById("op_actual").innerHTML = t;
}



// esta función obtiene un número aleatorio del 0 al 9
function num_ale(lista){
    var cant = lista.length
    return lista[Math.floor(Math.random()*cant)]
}

// esta función comienza una nueva operacíon
function op(){
    if(timeout != undefined){
        clearTimeout(timeout)
    }
    timeout = setTimeout(function (){
        if(cont > 0 ) fallo()
    }, tiempo_uni*1000);

    document.getElementById("meta").innerHTML = meta
    document.getElementById("tiempo_uni").innerHTML = tiempo_uni
    document.getElementById("aciertos").innerHTML = cont
    document.getElementById("numeros1").innerHTML = numbers1
    document.getElementById("numeros2").innerHTML = numbers2
    document.getElementById("score").innerHTML = Math.max(cont, document.getElementById("score").innerText).toString()
    document.getElementById("campo").value = ""
    if(nuevo){
        num1 = num_ale(numbers1)
        num2 = num_ale(numbers2)
    }
    label_op = num1 + " x " + num2 + " = ";
    poner_operacion_actual(label_op)
    //s(label_op)
    //return num1 + " x " + num2;
}


// lo que ocurrirá cada vez que se pulse una tecla
function pulsacionTecla (event){
    //const keyName = event.key;
    // console.log(event)
    // s(event.key)
    // s(event.keyCode)
    // s(event.code)
    // if(event.key == event.key*1){
    // }
    comprobar_resultado();
    //comprobar_resultado();
    //alert('keydown event\n\n' + 'key: ' + keyName);
}
document.addEventListener('keyup', pulsacionTecla);

//comprobación del resultado
function comprobar_resultado(){

    texto_res = (num1*num2).toString()
    valor_introducido = document.getElementById("campo").value

    // comprobamos que haya acertado o que esté escribiendo el resultado bueno desde el principio
    if(valor_introducido == texto_res){
        ok()
    } else if(texto_res.indexOf(valor_introducido) != 0) {
        fallo(valor_introducido)
    }
}

function fallo(valor_introducido){
    cont = 0
    if(valor_introducido == undefined) {
        poner_estado("tiempo")
        s(cont+") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ---- TIEMPO AGOTADO ")
    } else {
        poner_estado("error")
        s(cont+") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+label_op+ " "+valor_introducido+" <---- ERROR ")
    }
    nuevo = false
    op()
    var element = document.getElementById("cabecera");
    element.classList.add("bg-danger");
    element.classList.remove("bg-dark");
    element.classList.remove("bg-success");
}

function ok(){
    poner_estado("ok")
    cont ++
    s(cont+") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+label_op+ " " + num1*num2)
    nuevo = true
    op()
    if(cont >=meta){
        poner_estado("fin")
        s("---------------------------")
        s("LO HAS CONSEGUIDO CHAVAL!!!")
        s("---------------------------")
        var element = document.getElementById("cabecera");
        element.classList.add("bg-success");
        element.classList.remove("bg-dark");
        element.classList.remove("bg-danger");
    } else {
        var element = document.getElementById("cabecera");
        element.classList.add("bg-dark");
        element.classList.remove("bg-danger");
        element.classList.remove("bg-success");
    }
}

function poner_estado(est){
    document.getElementById("eti_tiempo").style.display = "none";
    document.getElementById("eti_comienza").style.display = "none";
    document.getElementById("eti_error").style.display = "none";
    document.getElementById("eti_ok").style.display = "none";
    document.getElementById("eti_fin").style.display = "none";
    document.getElementById("eti_"+est).style.display = "block";
}


function inicio(){
    document.getElementById("btn_meta").addEventListener("click", function () {
        meta = prompt("Selecciona una cantidad como meta")
        refrescar ()
    })
    document.getElementById("btn_numeros1").addEventListener("click", function () {
        numbers1 = asignacion_numeros(1, "Lista los PRIMEROS números de la multiplicación (separados por coma, por ejemplo: 0,1,2,3,4,5,6,7,8,9,10)")
        refrescar ()
    })
    document.getElementById("btn_numeros2").addEventListener("click", function () {
        numbers2 = asignacion_numeros(2, "Lista los SEGUNDOS números de la multiplicación (separados por coma, por ejemplo: 0,1,2,3,4,5,6,7,8,9,10)")
        refrescar ()
    })
    document.getElementById("btn_segundos").addEventListener("click", function () {
        tiempo_uni = prompt("Selecciona una cantidad de segundos máximos entre cada operación.")
        refrescar ()
    })
    
    resetear()
}

function resetear (){      
    poner_estado("comienza")
    document.getElementById("score").innerText = "0"
    cont = 0
    op()
}

function refrescar () {
    var newUrlParams = new URLSearchParams()
    newUrlParams.append('meta', meta)
    newUrlParams.append('tiempo_uni', tiempo_uni)
    numbers1.forEach(element => {
        newUrlParams.append('n1', element)
    });
    numbers2.forEach(element => {
        newUrlParams.append('n2', element)
    });
    window.location.search = newUrlParams
}

function asignacion_numeros(n, t){
    do {
        _lista = prompt(t)
        if(_lista == null) _lista = ""
    } while (isNaN(_lista.split(",").join("")))
    var lista = _lista.length == 0 ? [0,1,2,3,4,5,6,7,8,9,10] : _lista.split(",")
    document.getElementById("numeros"+n).innerHTML = lista
    s("CAMBIO DE TABLA "+n+" A: "+lista)
    return lista
}

window.onload = function() {
    inicio()
};
