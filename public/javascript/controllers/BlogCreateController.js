"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BlogCreateController = (function () {
            function BlogCreateController(BlogService, $location) {
                this.BlogService = BlogService;
                this.$location = $location;
                this.blog = {};
            }
            BlogCreateController.prototype.createBlog = function () {
                var _this = this;
                this.BlogService.saveBlog(this.blog).then(function (res) {
                    _this.$location.path("/blog");
                });
            };
            return BlogCreateController;
        }());
        Controllers.BlogCreateController = BlogCreateController;
        angular.module("app").controller("BlogCreateController", BlogCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
