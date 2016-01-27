"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BlogDetailsController = (function () {
            function BlogDetailsController(BlogService, $routeParams, $location) {
                this.BlogService = BlogService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.blog = BlogService.getBlog($routeParams["id"]);
            }
            BlogDetailsController.prototype.delete = function (id) {
                var _this = this;
                this.BlogService.deleteBlog(this.blog).then(function (res) {
                    _this.$location.path("/blog");
                });
            };
            return BlogDetailsController;
        })();
        Controllers.BlogDetailsController = BlogDetailsController;
        angular.module("app").controller("BlogDetailsController", BlogDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
