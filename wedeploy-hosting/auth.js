var auth = WeDeploy.auth('http://liferayferiasauth.liferayferias.wedeploy.me');
var provider = new auth.provider.Google();

var authButton = document.querySelector('#authButton');

authButton.addEventListener('click', function() {
    provider.setProviderScope("email");
    auth.signInWithRedirect(provider);
    auth.onSignIn(function(user) {
        console.log('onSignIn', user);
    });
});

var currentUser = WeDeploy.auth().currentUser;
console.log('currentUser', currentUser);

var logOutButton = document.querySelector('#logOutButton');

logOutButton.addEventListener('click', function() {
    WeDeploy
        .auth()
        .signOut()
        .then(function() {
            console.log('user singed out!');
        })
        .catch(function(err) {  
            console.log('User was signed out.');
        });

});