class Vehiculo {
    constructor(id, modelo, anoFab, velMax){
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }
}

class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue){
        super(id, modelo, anoFab, velMax)
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
}

class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia){
        super(id, modelo, anoFab, velMax)
        this.altMax = altMax;
        this.autonomia = autonomia;
    }  
}


// Harcodeo de datos
var datos_json = [{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", 
"anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook",
"anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R",
"anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,
"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,
"velMax":174, "altMax":3, "autonomia":870}]

//FUNCION PARA PASAR DE JASON A ARRAY
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}
var datos_array = json2array(datos_json); ////////// HASTA ACA CARGO DATOS

var array_personas=[];
function generarObjetos(array){
    for(persona in array){
        if(array[persona].autonomia !== undefined && array[persona].altMax !== undefined){
            let terrestre = new Aereo(array[persona].id,
                                        array[persona].modelo,
                                        array[persona].anoFab,
                                        array[persona].velMax,
                                        array[persona].altMax,
                                        array[persona].autonomia);
            array_personas.push(terrestre);
        }
        else if(array[persona].cantPue !== undefined && array[persona].cantRue !== undefined){
            let cliente = new Terrestre(array[persona].id,
                                      array[persona].modelo,
                                      array[persona].anoFab,
                                      array[persona].velMax,
                                      array[persona].cantPue,
                                      array[persona].cantRue);
            array_personas.push(cliente);
        }
        else
            continue;
    }
}

generarObjetos(datos_array); /////////// HASTA ACA GENERO OBJETOS

////////// EMPIEZO A CARGAR TABLA "FORM DE DATOS"
let tabla = document.querySelector(".tablaDatos");
function cargarTabla(){
    array_personas.map(
        (elemento)=>{
            let f = document.createElement("tr");
            //- id
            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(elemento.id));
            f.appendChild(td1);
            //- modelo
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(elemento.modelo));
            f.appendChild(td2);
            //- anoFab
            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(elemento.anoFab));
            f.appendChild(td3);
            //- velMax
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(elemento.velMax));
            f.appendChild(td4);
            //- autonomia
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(elemento.autonomia));
            f.appendChild(td5);
            //- altMax
            let td6 = document.createElement("td");
            td6.appendChild(document.createTextNode(elemento.altMax));
            f.appendChild(td6);
            //- cantPue
            let td7 = document.createElement("td");
            td7.appendChild(document.createTextNode(elemento.cantPue));
            f.appendChild(td7);
            //- cantRue
            let td8 = document.createElement("td");
            td8.appendChild(document.createTextNode(elemento.cantRue));
            f.appendChild(td8);
    
            tabla.appendChild(f);
            return f;
        }
    );
}
cargarTabla();
////////////// HASTA ACA TABLA CARGADA

///////////// HAGO FILTRO DE DROPDOWN LIST

var lista = document.getElementById("lista");
lista.addEventListener("change", () =>{
    var selected = lista.value;
    var rows=tabla.getElementsByTagName("tr");
    switch(selected){
        case "todos":
            for(var i=1; i<rows.length; i++){
                var row= rows[i];
                row.style.display= "";
            }
            break;
        case "aereos":
            for(var i=1; i<rows.length; i++){
                var row= rows[i];
                var dato=row.cells[4].textContent.trim();
                dato >= 0 ? row.style.display= "" : row.style.display="none";
            }
            break;
        case "terrestres":
            for(var i=1; i<rows.length; i++){
                var row= rows[i];
                var dato=row.cells[6].textContent.trim();
                dato >= 0 ? row.style.display= "" : row.style.display="none"; // esconde la row
            }
            break;
    }
}) //////////////////////////HASTA ACA DDL FUNCIONANDO

//////////////////////// HAGO FILTROS DE CHECKBOX
function ocultarFila(fila, checked){
    for(var i=0; i<tabla.rows.length; i++){
        if(checked == false){
            var filaux=tabla.rows[i];
            filaux.cells[fila].style.display="none";  // ESCONDE LA ROW
        }
        else{
            var filaux=tabla.rows[i];
            filaux.cells[fila].style.display=""; // MUESTRA LA ROW
        }       
    }
}

var cbxId = document.getElementById("cbxId");
cbxId.addEventListener("change", ()=>
    cbxId.checked ? ocultarFila(0, true) : ocultarFila(0, false));

var cbxModelo = document.getElementById("cbxModelo");
cbxModelo.addEventListener("change", ()=>
cbxModelo.checked ? ocultarFila(1, true) : ocultarFila(1, false));

var cbxAnoFab = document.getElementById("cbxAnoFab");
cbxAnoFab.addEventListener("change", ()=>
cbxAnoFab.checked ? ocultarFila(2, true) : ocultarFila(2, false));

var cbxVelMax = document.getElementById("cbxVelMax");
cbxVelMax.addEventListener("change", ()=>
cbxVelMax.checked ? ocultarFila(3, true) : ocultarFila(3, false));

var cbxAltMax = document.getElementById("cbxAltMax");
cbxAltMax.addEventListener("change", ()=>
cbxAltMax.checked ? ocultarFila(4, true) : ocultarFila(4, false));

var cbxAutonomia = document.getElementById("cbxAutonomia");
cbxAutonomia.addEventListener("change", ()=>
cbxAutonomia.checked ? ocultarFila(5, true) : ocultarFila(5, false));
    
var cbxCantPue = document.getElementById("cbxCantPue");
cbxCantPue.addEventListener("change", ()=>
cbxCantPue.checked ? ocultarFila(6, true) : ocultarFila(6, false));

var cbxCantRue = document.getElementById("cbxCantRue");
cbxCantRue.addEventListener("change", ()=>
cbxCantRue.checked ? ocultarFila(7, true) : ocultarFila(7, false));
///////////////////////// HASTA ACA CHECKBOXES FUNCIONANDO



////////////////////// // BOTON AGREGAR
let btnAgregar=document.getElementById("btnAgregar");
let dialogForm=document.getElementById("dialogForm");
btnAgregar.addEventListener("click", ()=>{
    limpiarDialog();
    dialogForm.setAttribute('open', true);
    document.getElementById("general").style.visibility="hidden"; 
});


// DOBLE CLICK EN LA TABLA
tabla.addEventListener("dblclick", function(event){
  var fila = event.target.closest("tr");   // Verifica si el evento se originó desde una fila
  if(fila){
    var celdas = fila.getElementsByTagName("td");
    dialogForm.setAttribute('open', true);
    document.getElementById("id").value=celdas[0].textContent;
    document.getElementById("modelo").value=celdas[1].textContent;
    document.getElementById("anoFab").value=celdas[2].textContent;
    document.getElementById("velMax").value=celdas[3].textContent;
        if( celdas[4].textContent >= 0||
            celdas[5].textContent >= 0){
                document.getElementById("autonomia").style.visibility="visible";
                document.getElementById("altMax").style.visibility="visible";
                document.getElementById("listaABM").style.visibility="hidden";
                document.getElementById("general").style.visibility="hidden";
                document.getElementById("autonomia").value=celdas[4].textContent;
                document.getElementById("altMax").value=celdas[5].textContent
                document.getElementById("cantPue").style.visibility="hidden";
                document.getElementById("cantRue").style.visibility="hidden";
                
            

            }else{
                document.getElementById("cantPue").style.visibility="visible";
                document.getElementById("cantRue").style.visibility="visible";
                document.getElementById("listaABM").style.visibility="hidden";
                document.getElementById("general").style.visibility="hidden";
                document.getElementById("autonomia").style.visibility="hidden";
                document.getElementById("altMax").style.visibility="hidden";
                document.getElementById("cantPue").value=celdas[6].textContent;
                document.getElementById("cantRue").value=celdas[7].textContent

            }
            
        }
    }
);


////////// DIALOG BOTON ACEPTAR
let botonAceptar=document.getElementById("botonAceptar");
var listaABM = document.getElementById("listaABM");

//////// LISTA DE TIPOS DE VEHICULOS DEL DIALOG
listaABM.addEventListener("change", () =>{
    switch(listaABM.value){
        case "aereos":
            document.getElementById("cantPue").style.visibility="hidden";
            document.getElementById("cantRue").style.visibility="hidden";
            document.getElementById("autonomia").style.visibility="visible";
            document.getElementById("altMax").style.visibility="visible";
            break;
        case "terrestres":
            document.getElementById("cantPue").style.visibility="visible";
            document.getElementById("cantRue").style.visibility="visible";
            document.getElementById("autonomia").style.visibility="hidden";
            document.getElementById("altMax").style.visibility="hidden";
            break;
        case "vehiculos":
            document.getElementById("cantPue").style.visibility="hidden";
            document.getElementById("cantRue").style.visibility="hidden";
            document.getElementById("autonomia").style.visibility="hidden";
            document.getElementById("altMax").style.visibility="hidden";
    }
})

//// FUNCION QUE CREA LOS OBJETOS DEPENDIENDO SI SON AEREOS O TERRESTRES
function agregarVehiculo(){
    if( document.getElementById('modelo').value !== null &&
        document.getElementById('anoFab').value !== null &&
        document.getElementById('anoFab').value >= 1886 &&
        document.getElementById('velMax').value >= 1){
            if(document.getElementById("altMax").value >= 10 &&
               document.getElementById("altMax").value <= 53000){
                let aereo = new Aereo(generarIdUnico(),
                    document.getElementById('modelo').value,
                    document.getElementById('anoFab').value,
                    document.getElementById('velMax').value,
                    document.getElementById("altMax").value,
                    document.getElementById("autonomia").value);
                array_personas.push(aereo);
                vaciarTabla();
                cargarTabla();
            }
            else if(document.getElementById("cantPue").value >= 0 &&
                    document.getElementById("cantRue").value >=0) {
                let terrestre = new Terrestre(generarIdUnico(),
                    document.getElementById('modelo').value,
                    document.getElementById('anoFab').value,
                    document.getElementById('velMax').value,
                    document.getElementById("cantPue").value,
                    document.getElementById("cantRue").value);
                    console.log(document.getElementById("cantRue").value);
                array_personas.push(terrestre);
                vaciarTabla();
                cargarTabla();
            }
        }
        else{
            alert("Datos erroneos, intente nuevamente");
            limpiarDialog();
           
        }
        return false;
    }


//BOTON CANCELAR DEL DIALOG
let btnCancelar = document.getElementById("bntCancelar");
btnCancelar.addEventListener("click", ()=>{
    limpiarDialog();
    dialogForm.removeAttribute('open');
    document.getElementById("general").style.visibility="visible";  
})

// BOTON ACEPTAR DEL DIALOG
let btnAceptar = document.getElementById("btnAceptar");
btnAceptar.addEventListener("click", ()=>{
    agregarVehiculo();
    limpiarDialog();
    document.getElementById("general").style.visibility="visible"; 
    dialogForm.removeAttribute('open');
})


//FUNCION PARA GENERAR ID
function generarIdUnico() {
    var idsExistente = array_personas.map(function (obj) {
        return obj.id;
    });
    var maxId = idsExistente.reduce(function (max, id) {
        return Math.max(max, id);
    }, 0);
    return maxId + 1;
  }

//FUNCION PARA VACIAR LA TABLA
function vaciarTabla() {
    var rowCount = tabla.rows.length; 
    for (var i = rowCount - 1; i > 0; i--) {
      tabla.deleteRow(i);
    }
  }

//FUNCION PARA LIMPIAR DIALOG
function limpiarDialog(){
    document.getElementById("listaABM").style.visibility="visible";
    document.getElementById("id").value="";
    document.getElementById("modelo").value="";
    document.getElementById("anoFab").value="";
    document.getElementById("velMax").value="";
    document.getElementById("autonomia").value="";
    document.getElementById("altMax").value="";
}



// 4)Implementar Funcionalidades:


// c)Al hacer Click en el botón “Calcular”, debe mostrarse la edad promedio de los elementos filtrados. Utilizar
// Map/Reduce/Filter

// let btnPromedio = document.getElementById("btnPromedio");
// btnPromedio.addEventListener("click", ()=>{
//     var selected = lista.value;
//     var velMax=0;
//     var contador=0;
//     var promedio;
//     var rows=tabla.getElementsByTagName("tr");
//     switch(selected){
//         case "todos":
//             for(var i=1; i<rows.length; i++){
//                 //console.log(row.cells[3].textContent.trim());
//                 //velMax+=row.cells[3].textContent.trim();
//             }
//             break;
//         case "aereos":
//             // for(var i=1; i<rows.length; i++){                
//             //     var row= rows[i];
//             //     var dato=row.cells[4].textContent.trim();
//             //     if(dato >= 0) {
//             //         velMax+=row.cells[3].textContent.trim();
//             //         contador++;
//             //     }
//             //}
//             break;
//         case "terrestres":
//             for(var i=1; i<rows.length; i++){
//                 var row= rows[i];
//                 var dato=row.cells[6].textContent.trim();
//                 dato >= 0 ? row.style.display= "" : row.style.display="none"; // esconde la row
//             }
//             break;
//     }
//     promedio=20;
//     console.log(20);
//     document.getElementById("lblPromedio").value="promedio.toString()";
// })

// e)Al hacer click en alguno de los botones del “Formulario ABM” debe realizarse la operación que corresponda, ocultar el
// formulario y mostrar el Formulario “Form Datos” con los datos actualizados. En caso de ser un Alta, generar ID único.
// Utilizar Map/Reduce/Filter.

// f)El formulario ABM debe realizar validaciones acorde al tipo de objeto y a las restricciones descritas en el diagrama del
// punto 1. El campo ID no debe ser modificable y debe mostrar el id del objeto existente o vacío en caso de un alta.

// g)Al hacer Click en alguno de los botones de los encabezados de la tabla del Formulario “Form Datos”, ordenar las filas
// de la tabla por la columna clickeada. Utilizar Map/Reduce/Filter

