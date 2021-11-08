traerInformacion();

function traerInformacion(){
    $.ajax({
        url:"http://129.151.101.157:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#status").hide();
            console.log(respuesta);
            pintarRespuesta(respuesta);
            traerClient();
            traerQuadbike()
        }
    })
}


function pintarRespuesta(items){
    let myTable="<table>";
        myTable+="<tr>";
        myTable+="<td>"+"INICIO"+"</td>";
        myTable+="<td>"+"DEVOLUCION"+"</td>";
        myTable+="<td>"+"ESTADO"+"</td>";
        myTable+="<td>"+"ACCIONES"+"</td>";
        myTable+="</tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        myTable+="<td>"+items[i].status+"</td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].idReservation+")'>Eliminar</button></td>";
        myTable+="<td> <button onclick='obtenerItemEspecifico("+items[i].idReservation+")'>cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}    


function guardarInformacion(){
    let myData={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        client:{"idClient":$("#client").val()},
        quadbike:{"id":$("#quadbike").val()},
    };
    let dataToSend=JSON.stringify(myData);
<<<<<<< HEAD
    if(ValidarFechas(myData.startDate,myData.devolutionDate)){
        if (validar()){
        $.ajax({
            url:"http://localhost:8080/api/Reservation/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            contentType:'application/json',
            success:function(){
                limpiarCampos();
                traerInformacion();
                alert("REGISTRO CREADO!")
            }
        });
=======
   if (validar()){
    $.ajax({
        url:"http://129.151.101.157:8080/api/Reservation/save",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        contentType:'application/json',
        success:function(){
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO CREADO!")
>>>>>>> 1d0a0078e150c5fcc1267d7d6d1d52defebb13e3
        }
    }else{
        alert("La fecha final debe ser mayor a la fecha inicial");
    }
}


function editarInformacion(){
    let myData={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),        
    };
    let dataToSend=JSON.stringify(myData);
<<<<<<< HEAD
    if(ValidarFechas(myData.startDate,myData.devolutionDate)){
        $.ajax({
            url:"http://localhost:8080/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                limpiarCampos();
                traerInformacion();
                alert("REGISTRO ACTUALIZADO!")
                $("#client").show();
                $("#quadbike").show();
            }
        });
    }else{
        alert("La fecha final debe ser mayor a la fecha inicial");
=======
    if (validar()){
    $.ajax({
        url:"http://129.151.101.157:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO ACTUALIZADO!")
        }
    });
>>>>>>> 1d0a0078e150c5fcc1267d7d6d1d52defebb13e3
    }
}


function borrarElemento(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.101.157:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            limpiarCampos();
            traerInformacion();
            alert("REGISTRO BORRADO!")
        }
    });
}

function limpiarCampos(){
    $("#resultado").empty()
    $("#idReservation").val("")
    $("#startDate").val("")
    $("#devolutionDate").val("")
    $("#status").val("")
    $("#client").val("")
    $("#quadbike").val("") 
}


function validaesVacio(dato){
    return !dato.trim().length;
}


function validar(){
    //obtiene valores

    let startDate = $("#startDate").val()
    let devolutionDate = $("#devolutionDate").val()
    let client= $("#client").val()
    let quadbike= $("#quadbike").val()
  

    //valida que los campos no sean vacios
    
    if( validaesVacio(startDate)) { 
        errores="startDate vacio<br>";
        alert("Espacio vacio");
        $("#startDate").focus();
        return false;
    }else if( validaesVacio(devolutionDate)) {
        errores="devolutionDate vacio<br>";
        alert("Espacio vacio");
        $("#devolutionDate").focus();
        return false;
    }else if( validaesVacio(client)) {  
        errores="client vacio<br>";
        alert("Espacio vacio");
        $("#client").focus();
        return false;
    }else if( validaesVacio(quadbike)) {
        errores="quadbike vacio<br>";
        alert("Espacio vacio");
        $("#quadbike").focus();
        return false;
    }else{
        return true;
    }
}



function obtenerItemEspecifico(idItem){
    alert("YA PUEDES SELECCIONAR LAS FECHAS")
    $.ajax({
        dataType: 'json',
        url:"http://129.151.101.157:8080/api/Reservation/"+idItem,
        type:'GET',
        success:function(response) {
          console.log(response);
          var item=response;
          $("#status").show();
          $("#idReservation").val(item.idReservation);
          $("#startDate").val(covertirfecha(item.startDate));
          $("#devolutionDate").val(covertirfecha(item.devolutionDate));
          $("#status").val(item.status);
          $("#client").hide();
          $("#quadbike").hide();
        },  
        error: function(jqXHR, textStatus, errorThrown) {
  
        }
    });
  
  }

  
  
  function traerClient(){
    $.ajax({
        url:"http://129.151.101.157:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            listarClient(respuesta);
        }
    })
}
  
function listarClient(items){
    var lista = '<option value="">--Selecciona un Cliente--</option>';
        
    for(i=0;i<items.length;i++){
      
        lista +="<option value="+items[i].idClient+">"+items[i].name+"</option>";
    }
   
    $("#client").html(lista);
}    



function traerQuadbike(){
    $.ajax({
        url:"http://129.151.101.157:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            listarQuadbike(respuesta);
        }
    })
}
  
function listarQuadbike(items){
    var lista = '<option value="">--Selecciona una Cuatrimoto--</option>';
        
    for(i=0;i<items.length;i++){
      
    lista+="<option value="+items[i].id+">"+items[i].name+"</option>";
    }
   
    $("#quadbike").html(lista);
}    

function covertirfecha(string){
    var info =string.split('T')
    return info[0];
}

function ValidarFechas(startDate,devolutionDate)
{
var fechainicial = document.getElementById("startDate").value;
var fechafinal = document.getElementById("devolutionDate").value;
if(fechafinal > fechainicial)
return true;
}