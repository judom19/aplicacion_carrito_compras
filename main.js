// PRODUCTO
class Producto {
    constructor(nombre,precio,fecha_creacion,precio_iva,precio_total){
    this.nombre = nombre;
    this.precio = precio;
    this.fecha_creacion = fecha_creacion;
    this.precio_iva = precio_iva;
    this.precio_total = precio_total;

}
}

class Interfaz{
    agregarProducto(producto){//DENTRO DE ESTE METODO LE PASAMOS COMO PAREMETRO EL OBJETO 'producto'
        //ALMACENAMOS EN UNA CONSTANTE EL DIV CON ID 'listado'
        const lista_productos=document.getElementById('listado');
        //CREANDO UN ELEMENTO HTML DONDE INSERTAREMOS LOS OBEJTOS DE PRODUCTO O LISTA
        const element = document.createElement('div');
        //USANDO MULTIPLES LINEAS PARA CREAR NUESTRO HTML
        //PINTANDO EL DIV
        element.innerHTML = `
            <!-- usando clases bootsrap -->
        <div class="card text-center mb-3">
        <div class="card-body">
            <strong>Nombre: </strong> ${producto.nombre}
            <strong>Precio: $</strong> ${producto.precio}
            <strong>Precio total</strong>      ${producto.precio_total}
            <strong>Año</strong>      ${producto.fecha_creacion}

            <a href="#" class="btn btn-danger" name="eliminar">Borrar</a>

        </div>
    </div>
            
        
        `;
        //INSERTANDO ELEMENTO 'element', CREADO ANTERIORMENTE, CON EL METODO JS APPENDCHILD
        lista_productos.appendChild(element); 


    }
    resetForm(){
        document.getElementById('carrito_pedido').reset();
    }

    borrarProducto(element){
        //validando la propiedad del elemento   
        if (element.name ==='eliminar'){
            //vamos a seleccionar solo el div que contiene la tarjeta
            (element.parentElement.parentElement.parentElement).remove();
            this.mostrarMensaje('Producto fuera del carrito','info');

        }
    }

    mostrarMensaje(mensaje,cssClase){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClase} mt-3`;
        div.appendChild(document.createTextNode(mensaje));
        //MOSTRANDO MENSAJE EN EL DOM
        const container = document.querySelector('.container');
        const aplicacion = document.querySelector('#Aplicacion');
        container.insertBefore(div,aplicacion);//dentro del contener insertar div y antes de aplicacion
        setTimeout(function(){
            document.querySelector('.alert').remove()
        },3000)
    }
}

//EVENTOS DEL DOM
document.getElementById('carrito_pedido').addEventListener('submit',function(e){
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const fecha_creacion = document.getElementById('fecha_creacion').value;
    const precio_iva = 1.13;
    var precio_total = (precio*precio_iva).toFixed(2);
//CREANDO EL OBJETO PRODUCTO Y ALMACENANDO EN EN UNA CONSTANTE
    const producto = new Producto(nombre,precio,fecha_creacion,precio_iva,precio_total);
//CREANDO OBJETO DE LA INTERFAZ 
    const interfaz = new Interfaz();

    if (nombre ==='' || precio ==='' || fecha_creacion==='') {
    return interfaz.mostrarMensaje("Faltan campos que rellenar",'danger');

    };

    interfaz.agregarProducto(producto);//INSTANCIA DE LA CLASE Intefaz con el metodo
    //agregarProducto y que recibe como
    //parametro el objeto 'producto'
    //ESTE OBJETO SERA MANDADO A LA INTERFAZ QUE VA A INTERACTUAR CON NUESTRO HTML O EL DOM
    //resetear formulario
    interfaz.resetForm();
    interfaz.mostrarMensaje('Agregado al carrito','success');//llamando metodo del mensaje
    e.preventDefault();
    //OBTENEMOS EL EVENTO CLICK DEL ELEMENTO 'listado' donde se encruentra el articulo a eliminar
});

document.getElementById('listado').addEventListener('click',function(e){//pasamos como parametro a la funcion
//el evento 'e'
    const interfaz_borrar = new Interfaz();//creamos un objeto basado en la clase interfaz
    interfaz_borrar.borrarProducto(e.target);//llamando al metodo borrarProducto del objeto creado
    //y como parametro la seleccion de la etiqueta

});
