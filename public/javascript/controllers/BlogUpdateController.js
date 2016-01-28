"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BlogUpdateController = (function () {
            function BlogUpdateController(BlogService, $location, $routeParams) {
                this.BlogService = BlogService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.blog = BlogService.getBlog($routeParams["id"]);
            }
            return BlogUpdateController;
        })();
        Controllers.BlogUpdateController = BlogUpdateController;
        angular.module("app").controller("BlogUpdateController", BlogUpdateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
