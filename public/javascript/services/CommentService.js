"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var CommentService = (function () {
            function CommentService($resource) {
                this.$resource = $resource;
                this.commentResource = $resource("/api/comments/:id", null, {
                    "update": { method: "PUT" }
                });
            }
            CommentService.prototype.saveComment = function (comment) {
                return this.commentResource.save(comment).$promise;
            };
            CommentService.prototype.updateComment = function (comment) {
                return this.commentResource.update({ id: comment._id }, comment).$promise;
            };
            CommentService.prototype.deleteComment = function (comment) {
                return this.commentResource.delete({ id: comment._id }).$promise;
            };
            CommentService.prototype.getComment = function (commentId) {
                return this.commentResource.get({ id: commentId });
            };
            return CommentService;
        })();
        Services.CommentService = CommentService;
        angular.module("app").service("CommentService", CommentService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
