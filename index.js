
/*console.log(firebase)
var ref = firebase.database().ref('players');
console.log(ref);*/

document.addEventListener("DOMContentLoaded", event => {
	const app = firebase.app();
	//console.log(app);
});

function googleLogin(){
	const provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider)
		.then(result => {
			const user = result.user;
			document.write('Hello ' + user.displayName);
			console.log(user); 
		})
		.catch(console.log);
} 

var email  = document.getElementById('email');
var password = document.getElementById('password');
var signUp = document.getElementById('signUp');
var logOut = document.getElementById('logout');


/*function emailLogin(email,password){
	const provider = new firebase.auth.createUserWithEmailAndPassword(email,password)
						.catch(function(error){
							var errorCode = error.code;
							var errorMessage = error.message;
						});  
}*/ 

// add a Sign up event
signUp.addEventListener('click', e => {
	var em = email.value;
	var pass = password.value;
	firebase.auth().createUserWithEmailAndPassword(em,pass)
	.catch(function(error) {
		alert(error.code);
   	console.log(error.code);
   	alert(error.message);
   	console.log(error.message);
	});  
});

// add realtime listener

firebase.auth().onAuthStateChanged(firebaseUser =>{
	if(firebaseUser){
		console.log(firebaseUser);
		logOut.classList.remove('hidden');
	} else {
		console.log('not logged in');
		logOut.classList.add('hidden');
	}
});

// add a signIn event listener
signInButton = document.getElementById('signIn');

signInButton.addEventListener('click', e => {
	const em = email.value;
	const pass = password.value;
	firebase.auth().signInWithEmailAndPassword(em,pass)
	.catch(function(error){
		console.log(error.code);
		alert(error.message);
	});
});

// logout event listener
logOut.addEventListener('click', e => {
	firebase.auth().signOut()
	.then(function(){
		console.log('signout  successful')
	}, function(error){
		console.log('failed signout')
	});
});

// méthode post (push) fel firebase
const nameField = document.getElementById('name');
const surnameField = document.getElementById('surname');
const addButton = document.getElementById('addPerson');

addButton.addEventListener('click', e => {
	const dbref = firebase.database().ref();

	dbref.push().set({name : nameField.value,
						surname : surnameField.value});
});

// Retrieving method

const retriver = document.getElementById('getTest');

const ref = firebase.database().ref().child('testing');
ref.on('value', function(snapshot){

		retriver.innerText = snapshot.child('test1').val();

});



