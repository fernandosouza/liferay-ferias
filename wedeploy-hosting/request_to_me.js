var currentUser = WeDeploy.auth().currentUser;

var requestToMe = WeDeploy.url('http://users.liferayferias.wedeploy.me/request')
	.filter('managerId', '=', currentUser.userid)
	.sort('createDate', 'desc')
	.get();


for (var i = requestToMe.length - 1; i >= 0; i--) {
	console.log("request", requestToMe[i]);
};