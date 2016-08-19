var myRequests = WeDeploy.url('http://users.liferayferias.wedeploy.me/request')
	.filter('userid', '=', userid)
	.sort('createDate', 'desc')
	.get();


for (var i = myRequests.length - 1; i >= 0; i--) {
	console.log("request", myRequests[i]);
};
