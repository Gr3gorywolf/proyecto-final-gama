var config = {
  apiKey: "AIzaSyDABWQKqorGv-QMsGfeIqNO0ZGOlg7YRmc",
  authDomain: "darkgames-5f125.firebaseapp.com",
  databaseURL: "https://darkgames-5f125.firebaseio.com",
  projectId: "darkgames-5f125",
  storageBucket: "darkgames-5f125.appspot.com",
  messagingSenderId: "363191033295"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
var objetos = [];
var objeto = {};
var estalogeado = false;
var instanciamodalsheet;
console.log(localStorage.getItem("usuario"));
if (localStorage.getItem("usuario") === undefined || localStorage.getItem("usuario") === null || localStorage.getItem("usuario") == "none") {
  estalogeado = false;

} else {

  estalogeado = true;

}


var sidemenu = document.getElementsByClassName("sidenav")[0]
var instancia = M.Sidenav.init(sidemenu);
var storageRef = firebase.storage().ref();

function inicializarmodal() {





}


function getserial() {

  var diccionario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
  return Math.floor((Math.random() * 9) + 1).toString() + diccionario[Math.floor((Math.random() * 12), )]
    + Math.floor((Math.random() * 9) + 1).toString() + diccionario[Math.floor((Math.random() * 12), )]
    + Math.floor((Math.random() * 9) + 1).toString() + "-" + diccionario[Math.floor((Math.random() * 12), )]
    + Math.floor((Math.random() * 9) + 1).toString() + diccionario[Math.floor((Math.random() * 12), )]
    + Math.floor((Math.random() * 9) + 1).toString() + diccionario[Math.floor((Math.random() * 12), )] +
    "-" + Math.floor((Math.random() * 9) + 1).toString() + diccionario[Math.floor((Math.random() * 12), )] +
    Math.floor((Math.random() * 9) + 1).toString() + diccionario[Math.floor((Math.random() * 12), )] +
    Math.floor((Math.random() * 9) + 1).toString();

}

function comprarjuego() {




  var ref = firebase.database().ref('usuarios/' + localStorage.getItem("usuario"));
  ref.once('value', function (snapshot) {

    if (snapshot.val().Puntos >= objeto.preciopuntos) {
      var tienejuego = false;

      if (snapshot.val().Juegos == undefined || snapshot.val().Juegos == null) {
        tienejuego = false;

      } else {
        console.log(snapshot.val().Juegos);
        if (snapshot.val().Juegos[objeto.id] == undefined) {
          tienejuego = false;
        } else {
          tienejuego = true;

        }

      }
      if (!tienejuego) {
        firebase.database().ref('usuarios/' + localStorage.getItem("usuario")).update({
          Puntos: parseFloat(snapshot.val().Puntos) - parseFloat(objeto.preciopuntos)
        })

        firebase.database().ref(`usuarios/${localStorage.getItem("usuario")}/Juegos/` + objeto.id).set({
          imagen: objeto.imagen,
          titulo: objeto.nombre,
          descripcion: objeto.resena,
          precio: objeto.preciopuntos,
          trailer: objeto.trailer,
          key: getserial()
        }).then(function () { M.toast({ html: 'Juego añadido a su lista', classes: 'rounded' }); });
      } else {
        M.toast({ html: 'Ya usted tiene este juego', classes: 'rounded' });

      }

    } else {
      M.toast({ html: 'Usted no tiene saldo suficiente', classes: 'rounded' });

    }

  });

}
function subirarchivo() {
  var file = document.getElementById("archivo").files[0];;
  var metadata = {
    'contentType': file.type
  };
  
  var ext = file.name.split(".")[1]
  if (ext == "jpg" || ext == "png" || ext == "jpeg") {
    M.toast({ html: 'Subiendo imagen', classes: 'rounded' })
    storageRef.child(localStorage.getItem("usuario") + "/portrait.jpg").put(file, metadata).then(function (snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log('File metadata:', snapshot.metadata);

      snapshot.ref.getDownloadURL().then(function (url) {
        console.log('File available at', url);
        M.toast({ html: 'imagen subida exitosamente', classes: 'rounded' })
        document.getElementById("imgperfil").src = url;
        firebase.database().ref("usuarios/" + localStorage.getItem("usuario")).update({
          imagen: url
        })

      });
    }).catch(function (error) {
      console.log(error);
      M.toast({ html: 'Error al subir el archivo', classes: 'rounded' })

    });
  } else {
    M.toast({ html: 'Formato de archivo invalido', classes: 'rounded' })

  }

}

function registrarse() {




  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var correo = document.getElementById("correo").value;
  var contraseña = document.getElementById("contraseña").value;
  var contraseña2 = document.getElementById("contraseña2").value;
  var arreglo = [nombre, apellido, correo, contraseña, contraseña2]
  var vacios = false;
  for (let i = 0; i < arreglo.length; i++) {

    if (arreglo[i].trim() == "" )
      vacios = true
  }
  if (vacios)
    M.toast({ html: 'Cada campo debe tener almenos 3 caracteres', classes: 'rounded' })
  else {
         
  if(contraseña!=contraseña2)
     M.toast({ html: 'Las contraseñas no coinciden', classes: 'rounded' })
  else
  if(contraseña.trim().length<6 || contraseña2.trim().length<6 )
     M.toast({ html: 'Las contraseñas deben tener almenos 6 caracteres', classes: 'rounded' })
     else{
    firebase.auth().createUserWithEmailAndPassword(correo, contraseña)
      .then(function () {

        firebase.database().ref('usuarios/' + correo.replace(".", "")).set({
          Nombre: nombre,
          Apellido: apellido,
          Correo: correo,
          Puntos: 1500
        }).then(function () {

          M.toast({ html: 'Registro exitoso', classes: 'rounded' });
          logearse();

        });


      })
      .catch(function (error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        M.toast({ html: 'Usuario ya registrado o datos invalidos', classes: 'rounded' })
        // ...
      })

    }

  }

}
function deslogearse() {
  localStorage.setItem("usuario", "none");
  localStorage.setItem("contraseña", "none");
  localStorage.setItem("usuarioc", "none");
  localStorage.setItem("contraseñac", "none");
  window.open("login.html", "_self")

}
function logearse() {

  var correo = document.getElementById("correo").value;
  var contraseña = document.getElementById("contraseña").value;
  var recordar = document.getElementById("recordar").checked;
  M.toast({ html: 'Entrando...', classes: 'rounded' })
  firebase.auth().signInWithEmailAndPassword(correo, contraseña)

    .then(function () {

      M.toast({ html: 'Cargando perfil...', classes: 'rounded' })
      var ref = firebase.database().ref('usuarios/' + correo.replace(".", ""));
      ref.once('value', function (snapshot) {

        if (recordar) {





          localStorage.setItem("usuarioc", snapshot.val().Correo.replace(".", ""));
          localStorage.setItem("contraseñac", contraseña);



        }

        localStorage.setItem("usuario", snapshot.val().Correo.replace(".", ""));
        localStorage.setItem("contraseña", contraseña);

        window.open("miperfil.html", "_self")


      });



    })
    .catch(function (error) {
      // Handle Errors here.

      var errorCode = error.code;
      var errorMessage = error.message;
      M.toast({ html: 'Usuario inexistente o datos incorrectos', classes: 'rounded' })
      // ...
    })
}

function putprofile() {
  var barraperfil = document.getElementById("profile");
  var sideperfil = document.getElementById("profileside");

  if (estalogeado) {
    console.log(localStorage.getItem("usuario").length)
    console.log("pase");

    barraperfil.innerHTML = `<a href="miperfil.html">Mi perfil</a>`
    sideperfil.innerHTML = `<a href="miperfil.html"> <i class="material-icons">account_box</i>Mi perfil</a>`

  }



}
function agregarjuegos() {
  var imagen = document.getElementById("link").value;
  var nombre = document.getElementById("nombre").value;
  var resena = document.getElementById("resena").value;
  var preciopuntos = document.getElementById("puntos").value;
  var trailer = document.getElementById("trailer").value;

  var newPostKey = firebase.database().ref().child('juegos').push().key;
  firebase.database().ref('juegos/' + newPostKey).set({
    imagen: imagen,
    titulo: nombre,
    descripcion: resena,
    precio: preciopuntos,
    trailer: trailer
  }).then(function () { M.toast({ html: 'Registro exitoso', classes: 'rounded' }); });
  document.getElementById("link").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("resena").value = "";
  document.getElementById("puntos").value = 0;
  document.getElementById("trailer").value = "";


}

function ponerinfomodal(index) {
  var titulo = document.getElementById("titlemodal");
  var descripcion = document.getElementById("descmodal");
  var imagen = document.getElementById("imgmodal");

  titulo.innerText = objetos[index].nombre
  descripcion.innerText = objetos[index].resena
  imagen.src = objetos[index].imagen

}


/////////////////////////



function loadgames() {

  putprofile();

  var contenedor = document.getElementById("containergames");
  var ref = firebase.database().ref('juegos');
  var pos = 0;
  ref.once('value', function (snapshot) {
    let valor = snapshot.val();
    console.log(valor);
    document.getElementById("progreso").style.display = "none";

    if (valor != undefined) {


      var todo = "";



      snapshot.forEach(function (child) {
        console.log(child.val());
        var secondaction = "";
        if (estalogeado) {

          console.log(child.val().precio);



          secondaction = `
           <a href='#' onclick="objeto=objetos[${pos}];comprarjuego();" class="tooltipped" data-position="bottom" data-tooltip="Comprar">
           <i class="material-icons">shopping_cart</i>
           </a>`
        }
        else {

          secondaction = `<a   style="display:none;"></a>`
        }

        todo += `
          <div class="col s12 m6 l4 xl3">
          

          <div class="card  hoverable">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator img-responsive" src=${child.val().imagen} style="height:230px;">
          </div>
          <div class="card-content center-align">

            <span class="card-title grey-text text-darken-4 truncate">${child.val().titulo.toString().trim()}</span>
       
          
            <div class="card-action  ">
            <a class="tooltipped modal-trigger"  href="#modalinfo" onclick="ponerinfomodal(${pos})" data-position="bottom" data-tooltip="Ver info" ><i class="material-icons" >info</i></a>
            <a class="tooltipped" href='${child.val().trailer}' data-position="bottom" data-tooltip="Ver trailer"><i class="material-icons">ondemand_video</i></a>  
             ${secondaction}
               </div>
             <p class="green-text right">${child.val().precio} Puntos</p>
          </div>
          <div class="card-reveal">
      <span class="card-title grey-text text-darken-4 truncate">${child.val().titulo.toString().trim()}<i class="material-icons right">close</i></span>
     
            <p >${child.val().descripcion}</p>
          </div>
        </div>

          </div>
          
          
          `

        objeto = {
          imagen: child.val().imagen,
          nombre: child.val().titulo,
          resena: child.val().descripcion,
          preciopuntos: child.val().precio,
          trailer: child.val().trailer,
          id: child.key

        }
        objetos.push(objeto);
        pos++;
      })




      contenedor.innerHTML = todo;

      var elems = document.querySelectorAll('.tooltipped');
      M.Tooltip.init(elems);

      var elems2 = document.querySelectorAll('.modal');
      instanciamodalsheet = M.Modal.init(elems2);
    }
  })
}

function loadhome() {

  putprofile();
}

function loadmiperfil() {

  var containerinfo = document.getElementById("infocontainer");
  var containerjuegos = document.getElementById("containerjuegos");
  var ref = firebase.database().ref('usuarios/' + localStorage.getItem("usuario"));
  ref.once('value', function (snapshot) {
    document.getElementById("progreso").style.display = "none";
    document.getElementById("supercontainer").style.opacity = 1;
    let valor = snapshot.val();
    var njuegos = 0;
    var gamescollection = "";

    if (valor.Juegos != null) {

      snapshot.child("Juegos").forEach(function (child) {



        gamescollection += `
       
       
     <div class="col s12 m12 l12 xl6">  
  <div class="card hoverable">
      <div class="card-image">
       <img src="${child.val().imagen}" style="height:200px;" class="img-responsive">
       <span class="card-title  truncate" style="background-color:rgba(0,0,0,0.5);width:100%">${child.val().titulo}</span>
      
     </div>
     <div class="card-action">
     <a href="#modalinfo" class="modal-trigger" onclick="ponerinfomodal(${njuegos})" ><i class="material-icons tooltipped" data-position="bottom" data-tooltip="Ver info" >info</i></a> 
     <a href="${child.val().trailer}" )"><i class="material-icons tooltipped" data-position="bottom" data-tooltip="Ver trailer" >ondemand_video</i></a> 
     <a href="#modalclave" class="modal-trigger" onclick="document.getElementById('clavee').innerText='${child.val().key}'")"><i class="material-icons tooltipped" data-position="bottom" data-tooltip="Ver clave de steam" > confirmation_number</i></a> 
     </div>    
  </div>   
  </div>  
  </div>    
   `
        objeto = {
          imagen: child.val().imagen,
          nombre: child.val().titulo,
          resena: child.val().descripcion,
          preciopuntos: child.val().precio,
          trailer: child.val().trailer
        }
        objetos.push(objeto);

        njuegos++
      });

    }

    containerinfo.innerHTML += `

     <div class="row" style="margin-left:10px;">
      <div class="col s12">
      <h6 class="left" > <i class="material-icons inlineicon" >account_box</i>${valor.Nombre}  ${valor.Apellido}</h6>
      </div>
      <div class="col s12">
      <h6 class="left truncate "  ><i class="material-icons inlineicon">attach_money</i>  ${valor.Puntos} Puntos</h6>
      </div>
      <div class="col s12">
      <h6  class="left truncate" ><i class="material-icons inlineicon">mail</i>   ${valor.Correo}</h6>
      </div>
      <div class="col s12">
      <h6  class="left truncate " ><i class="material-icons inlineicon">games</i> ${njuegos}</h6>
      </div>

     </div>
 
  
    
   

   `
    if (njuegos == 0) {
      containerjuegos.innerHTML += `
      <li class="collection-item"> 
      <span class="title truncate">Usted no ha adquirido ningun juego</span>   
    </li>
      `
    } else {
      containerjuegos.innerHTML = gamescollection;

    }
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
    var elems2 = document.querySelectorAll('.modal');
    instanciamodalsheet = M.Modal.init(elems2);
    var imgsrc = "";
    if (snapshot.val().imagen != undefined)
      imgsrc = snapshot.val().imagen.toString();
    else
      imgsrc = "imgs/account.png"

    document.getElementById("imgperfil").src=imgsrc; 

  });

}

