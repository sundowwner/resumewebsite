"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var CommentUpdateController = (function () {
            function CommentUpdateController(CommentService, $location, $routeParams) {
                this.CommentService = CommentService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.comment = CommentService.getComment($routeParams["id"]);
            }
            CommentUpdateController.prototype.update = function (id) {
                var _this = this;
                this.CommentService.updateComment(this.comment).then(function (res) {
                    _this.$location.path("/details/" + _this.comment.blog);
                });
            };
            return CommentUpdateController;
        }());
        Controllers.CommentUpdateController = CommentUpdateController;
        angular.module("app").controller("CommentUpdateController", CommentUpdateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
