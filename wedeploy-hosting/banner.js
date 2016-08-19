var currentUser = WeDeploy.auth().currentUser;

var banner = document.getElementsByClassName('banner')[0];

if (currentUser) {
    banner.innerHTML = '<img src="'+currentUser.photoUrl+'" width=50> ' + currentUser.email;
}
else {
    banner.innerHTML = 'Sign in'
}

