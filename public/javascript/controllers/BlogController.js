"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BlogController = (function () {
            function BlogController(BlogService, $location, $routeParams) {
                this.BlogService = BlogService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.blogs = BlogService.getAll();
            }
            return BlogController;
        }());
        Controllers.BlogController = BlogController;
        angular.module("app").controller("BlogController", BlogController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
