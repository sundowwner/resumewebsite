"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var TagDetailsController = (function () {
            function TagDetailsController(TagService, $location, BlogService, $routeParams) {
                this.TagService = TagService;
                this.$location = $location;
                this.BlogService = BlogService;
                this.$routeParams = $routeParams;
                this.blog = BlogService.getBlog($routeParams["id"]);
            }
            TagDetailsController.prototype.deleteTag = function (tag) {
                var _this = this;
                this.TagService.deleteTag(tag).then(function (res) {
                    _this.blog.tag.splice(_this.blog.tag.indexOf(tag), 1);
                });
            };
            return TagDetailsController;
        }());
        Controllers.TagDetailsController = TagDetailsController;
        angular.module("app").controller("TagDetailsController", TagDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
