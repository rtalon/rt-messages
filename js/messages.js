angular.module('rt.messages', [
		'rt.messages/template.html'
])
    .service("RtMessageSender", function($rootScope) {
        return {
            send: function(content, style) {
                $rootScope.$emit("rt.messages.new", {
                    content: content,
                    style: style
                })
            }
        }
    })

    .directive("rtMessages", function($rootScope) {
        return {
            templateUrl: function(element, attrs) {
							return attrs.templateUrl || 'rt.messages/template.html';
						},
            restrict: 'A',
            link: function (scope, elem, attrs) {
                scope.rtMessages = [];
                $rootScope.$on("rt.messages.new", function (event, args) {
                    args.class = {};
                    args.class[args.style] = true;
                    scope.rtMessages.push(args);
                });

                scope.removeMessage = function(message) {
                    for (var x in scope.rtMessages) {
                        if (scope.rtMessages[x] == message) {
                            scope.rtMessages.splice(x, 1);
                            break;
                        }
                    }
                }
            }
        }
    });

angular.module("rt.messages/template.html", []).run(function($templateCache) {
	$templateCache.put("rt.messages/template.html",
		'<div class="rt.messages">' +
		'  <div class="rt.message"' +
    '       ng-class="rtMessage.class"' +
    '       ng-repeat="rtMessage in rtMessages">' +
    '     {{ rtMessage.content }}' +
    '    <i ng-click="removeMessage(rtMessage)">x</i>' +
    '  </div>' +
		'</div>');
});
