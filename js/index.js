 var config = {
    apiKey: "AIzaSyDABWQKqorGv-QMsGfeIqNO0ZGOlg7YRmc",
    authDomain: "darkgames-5f125.firebaseapp.com",
    databaseURL: "https://darkgames-5f125.firebaseio.com",
    projectId: "darkgames-5f125",
    storageBucket: "darkgames-5f125.appspot.com",
    messagingSenderId: "363191033295"
  };
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user) {
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
  var objetos=[];
  var objeto={};
var estalogeado=false;
console.log(localStorage.getItem("usuario"));
if(localStorage.getItem("usuario")===undefined ||localStorage.getItem("usuario")===null  ){
  estalogeado=false;

    }else{

      estalogeado=true;
    
    }
  

var sidemenu=document.getElementsByClassName("sidenav")[0]
var instancia=M.Sidenav.init(sidemenu);


function inicializarmodal(){
   
   



}

function comprarjuego(){




  var ref=firebase.database().ref('usuarios/' + localStorage.getItem("usuario") );
  ref.once('value', function(snapshot) {
    
if(snapshot.val().Puntos>=objeto.preciopuntos){

  firebase.database().ref('usuarios/' + localStorage.getItem("usuario") ).update({
    Puntos:parseFloat( snapshot.val().Puntos)-parseFloat(objeto.preciopuntos)})
  var newPostKey = firebase.database().ref().child('juegos').push().key;
  firebase.database().ref(`usuarios/${localStorage.getItem("usuario")}/Juegos/` +newPostKey).set({
    imagen:objeto.imagen,
    titulo: objeto.nombre,                  
    descripcion:objeto.resena,
    precio:objeto.preciopuntos,
    trailer:objeto.trailer,
    key:""
  }).then(function(){ M.toast({html: 'Juego añadido a su lista', classes: 'rounded'});});

}else{
  M.toast({html: 'Usted no tiene saldo suficiente', classes: 'rounded'});

}

});

}


function registrarse(){




var nombre=document.getElementById("nombre").value;
var apellido=document.getElementById("apellido").value;
var correo=document.getElementById("correo").value;
var contraseña=document.getElementById("contraseña").value;
var contraseña2=document.getElementById("contraseña2").value;
var arreglo=[nombre,apellido,correo,contraseña,contraseña2]
var vacios=false;
for(let i=0;i<arreglo.length;i++){

if(arreglo[i].trim()=="")
      vacios=true
}
if(vacios)
   M.toast({html: 'No pueden haber campos vacios', classes: 'rounded'})
else{
  
    firebase.auth().createUserWithEmailAndPassword(correo, contraseña)
    .then(function(){
       
                firebase.database().ref('usuarios/' + correo.replace(".","")).set({
                    Nombre: nombre,
                    Apellido: apellido,                  
                    Correo:correo,
                    Puntos:999999
                  }).then(function(){ M.toast({html: 'Registro exitoso', classes: 'rounded'});});
              
        
              })
    .catch(function(error) {
        // Handle Errors here.
       
        var errorCode = error.code;
        var errorMessage = error.message;
        M.toast({html: 'Ocurrio un error al registrar', classes: 'rounded'})
        // ...
      })
     


    }

}
function deslogearse(){
  localStorage.setItem("usuario",null);
  localStorage.setItem("contraseña",null);
  localStorage.setItem("usuarioc",null);
  localStorage.setItem("contraseñac",null);
 window.open("login.html","_self")

}
function logearse(){
   
    var correo=document.getElementById("correo").value;
    var contraseña=document.getElementById("contraseña").value;
    var recordar=document.getElementById("recordar").checked;
    firebase.auth().signInWithEmailAndPassword(correo,contraseña)
    
    .then(function()
      
      {
         
      
        var ref=firebase.database().ref('usuarios/' + correo.replace(".","") );
        ref.once('value', function(snapshot) {
          
          if(recordar){


         


            localStorage.setItem("usuarioc",snapshot.val().Correo.replace(".",""));
            localStorage.setItem("contraseñac",contraseña);



          }
        
          localStorage.setItem("usuario",snapshot.val().Correo.replace(".",""));
          localStorage.setItem("contraseña",contraseña);

          window.open("miperfil.html","_self")


        });


    
    })
    .catch(function(error) {
        // Handle Errors here.
      
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      })
}

function putprofile(){
  var barraperfil=document.getElementById("profile");
  var sideperfil=document.getElementById("profileside");
  
  if(estalogeado){
    console.log(localStorage.getItem("usuario").length)
  console.log("pase");
  
  barraperfil.innerHTML=`<a href="miperfil.html">Mi perfil</a>`
  sideperfil.innerHTML=`<a href="miperfil.html"> <i class="material-icons">account_box</i>Mi perfil</a>`

  }
  
  

}
function agregarjuegos(){
  var imagen=document.getElementById("link").value;
  var nombre=document.getElementById("nombre").value;
  var resena=document.getElementById("resena").value;
  var preciopuntos=document.getElementById("puntos").value;
  var trailer=document.getElementById("trailer").value;

  var newPostKey = firebase.database().ref().child('juegos').push().key;
  firebase.database().ref('juegos/' +newPostKey).set({
    imagen:imagen,
    titulo: nombre,                  
    descripcion:resena,
    precio:preciopuntos,
    trailer:trailer
  }).then(function(){ M.toast({html: 'Registro exitoso', classes: 'rounded'});});
  document.getElementById("link").value="";
  document.getElementById("nombre").value="";
  document.getElementById("resena").value="";
  document.getElementById("puntos").value=0;
  document.getElementById("trailer").value="";


}
/////////////////////////



function loadgames(){
 
  putprofile();

var contenedor=document.getElementById("containergames");
  var ref=firebase.database().ref('juegos');
  var pos=0;
  ref.once('value', function(snapshot) {
    let valor=snapshot.val();
    console.log(valor);
    if(valor!=undefined){


var todo="";
     


        snapshot.forEach(function(child) {
              console.log(child.val());
             var secondaction="";
          if(estalogeado){

            console.log(child.val().precio);

      
          objeto= { imagen:child.val().imagen,
                          nombre:child.val().titulo,
                          resena:child.val().descripcion,
                          preciopuntos:child.val().precio,                   
                          trailer:child.val().trailer
            
            }
            objetos.push(objeto);
           secondaction= `<a href='#' onclick="objeto=objetos[${pos}];comprarjuego();">Comprar</a>`
          }
          else{

            secondaction= `<a   style="display:none;"href=${snapshot.child(pos).info}>Comprar</a>`
          }
             
          todo+=`
          <div class="col s12 m6 l4 xl3">
          

          <div class="card  hoverable">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator img-responsive" src=${child.val().imagen} style="height:350px;">
          </div>
          <div class="card-content">

            <span class="card-title activator grey-text text-darken-4 truncate">${child.val().titulo}<i class="material-icons right">more_vert</i></span>
           
          
            <div class="card-action"><a href=${child.val().info}>Ver informacion</a> ${secondaction}</div>
             <p class="green-text right">${child.val().precio} Puntos</p>
          </div>
          <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${child.val().titulo}<i class="material-icons right">close</i></span>
     
            <p >${child.val().descripcion}</p>
          </div>
        </div>

          </div>
          
          
          `
         pos++;
        })
        
     


contenedor.innerHTML=todo;
    }
})
}

function loadhome(){

  putprofile();
}

function loadmiperfil(){

  var containerinfo=document.getElementById("infocontainer");
  var containerjuegos=document.getElementById("containerjuegos");
  var ref=firebase.database().ref('usuarios/' + localStorage.getItem("usuario") );
  ref.once('value', function(snapshot) {
    let valor=snapshot.val();
    var njuegos=0;
      var gamescollection="";
    
    if(valor.Juegos!=null){

      snapshot.child("Juegos").forEach(function(child){
       gamescollection+=`<li class="collection-item avatar">
       <img src="${child.val().imagen}" alt="" class="circle">
       <span class="title">${child.val().titulo}</span>
       <p><a href="${child.val().trailer}">Ver trailer</a> <br>
       ${child.val().key}
       </p>
       <a href="#!" class="secondary-content"><i class="material-icons black-text">info</i></a>
     </li>`
        njuegos++
      });
    

    }

   containerinfo.innerHTML+=`

      <h6 >Nombre  ${valor.Nombre}</h6>
    <h6 >Apellido   ${valor.Apellido}</h6>
    <h6 >Puntos   ${valor.Puntos}</h6>
    <h6 >Correo   ${valor.Correo}</h6>
    <h6 >Juegos adquiridos  ${njuegos}</h6>

   `
     if(njuegos==0){
      containerjuegos.innerHTML+=`
      <li class="collection-item"> 
      <span class="title truncate">Usted no ha adquirido ningun juego</span>   
    </li>
      `
    }else{
      containerjuegos.innerHTML=gamescollection;
    }

  });

}

