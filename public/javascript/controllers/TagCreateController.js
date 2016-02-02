"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var TagCreateController = (function () {
            function TagCreateController(TagService, $location, BlogService, $routeParams) {
                this.TagService = TagService;
                this.$location = $location;
                this.BlogService = BlogService;
                this.$routeParams = $routeParams;
                this.blog = BlogService.getBlog($routeParams["id"]);
            }
            TagCreateController.prototype.addTag = function () {
                var _this = this;
                var tag = {
                    tagmessage: this.tagmessage,
                    blog: this.blog._id
                };
                this.TagService.saveTag(tag).then(function (res) {
                    _this.blog.tag.push(res);
                    _this.$location.path("/blog");
                });
            };
            return TagCreateController;
        }());
        Controllers.TagCreateController = TagCreateController;
        angular.module("app").controller("TagCreateController", TagCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
