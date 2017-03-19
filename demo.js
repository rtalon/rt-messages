
			angular.module("rt.messages.demo", ["rt.messages"])
			.controller('RtMessagesDemo', function($scope, RtMessageSender) {
					$scope.sendMessage = function() {
						console.log("test");
						RtMessageSender.send("Ceci est un test", "info");
					}
			});
