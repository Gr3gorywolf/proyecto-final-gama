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
var sidemenu=document.getElementsByClassName("sidenav")[0]
var instancia=M.Sidenav.init(sidemenu);


function inicializarmodal(){
   
   



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

function logearse(){
   
    var correo=document.getElementById("correo").value;
    var contraseña=document.getElementById("contraseña").value;
    firebase.auth().signInWithEmailAndPassword(correo,contraseña)
    
    .then(function()
      
      {
         
        alert("bienvenido")
        var ref=firebase.database().ref('usuarios/' + correo.replace(".","") );
        ref.once('value', function(snapshot) {
          
      alert("su nombre es:"+snapshot.val().Nombre );


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

function abrirmodal(){
  


}
