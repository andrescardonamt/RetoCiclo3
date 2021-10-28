var consultarComprasxFecha = function () {
    let fi = $("#fechaInicial").val();
    let ff = $("#fechaFinal").val();
    console.log(fi);
    console.log(ff);
    
    $.ajax({
        url: "/api/Reservation/report/" + fi + "/" + ff,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            mostrarRespuestaxFecha(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });   
}

var mostrarRespuestaxFecha = function(items){
    var tabla = `<table class="table">
                  <tr>
                    <th>TIPO</th>
                    <th>FECHA</th>
                    <th>VALOR</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].tipoCliente}</td>
                   <td>${items[i].fechaCompra.substring(0, 10)}</td>
                   <td>${items[i].valorCompra}</td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}