"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BlogDetailsController = (function () {
            function BlogDetailsController(BlogService, $routeParams, $location, CommentService) {
                this.BlogService = BlogService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.CommentService = CommentService;
                this.hide = false;
                this.blog = BlogService.getBlog($routeParams["id"]);
            }
            BlogDetailsController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment,
                    blog: this.blog._id
                };
                this.CommentService.saveComment(comment).then(function (res) {
                    _this.blog.comments.push(res);
                    _this.comment = '';
                });
            };
            BlogDetailsController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.CommentService.deleteComment(comment).then(function (res) {
                    _this.blog.comments.splice(_this.blog.comments.indexOf(comment), 1);
                });
            };
            BlogDetailsController.prototype.addTag = function () {
                var _this = this;
                var tag = {
                    tagmessage: this.tag,
                    blog: this.blog._id
                };
                this.TagService.saveTag(tag).then(function (res) {
                    _this.blog.tags.push(res);
                });
            };
            BlogDetailsController.prototype.deleteTag = function (tag) {
                var _this = this;
                this.TagService.deleteTag(tag).then(function (res) {
                    _this.blog.tags.splice(_this.blog.tag.indexOf(tag));
                });
            };
            BlogDetailsController.prototype.update = function () {
                var _this = this;
                this.BlogService.updateBlog(this.blog).then(function (res) {
                    _this.$location.path("/blog");
                });
            };
            BlogDetailsController.prototype.delete = function () {
                var _this = this;
                this.BlogService.deleteBlog(this.blog).then(function (res) {
                    _this.$location.path("/blog");
                });
            };
            BlogDetailsController.prototype.show = function () {
                this.hide = true;
            };
            return BlogDetailsController;
        }());
        Controllers.BlogDetailsController = BlogDetailsController;
        angular.module("app").controller("BlogDetailsController", BlogDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
