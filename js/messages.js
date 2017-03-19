angular.module('rt.messages', [])
    .service("RtMessageSender", function($rootScope) {
        return {
            send: function(content, style) {
                $rootScope.$emit("rt-messages.new", {
                    content: content,
                    style: style
                })
            }
        }
    })

    .directive("rtMessages", function($rootScope) {
        return {
            templateUrl: '/module/rt/messages/view/messages.html',
            restrict: 'A',
            link: function (scope, elem, attrs) {
                scope.rtMessages = [];
                $rootScope.$on("rt-messages.new", function (event, args) {
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

