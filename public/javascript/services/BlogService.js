"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var BlogService = (function () {
            function BlogService($resource) {
                this.$resource = $resource;
                this.BlogResource = $resource("/blogs/:id", null, {
                    "update": { method: "PUT" }
                });
            }
            BlogService.prototype.getAll = function () {
                return this.BlogResource.query();
            };
            BlogService.prototype.getBlog = function (blogId) {
                return this.BlogResource.get({ id: blogId });
            };
            BlogService.prototype.saveBlog = function (blog) {
                return this.BlogResource.save(blog).$promise;
            };
            BlogService.prototype.updateBlog = function (blog) {
                return this.BlogResource.update({ id: blog._id }, blog).$promise;
            };
            BlogService.prototype.deleteBlog = function (blog) {
                return this.BlogResource.delete({ _id: blog._id }).$promise;
            };
            return BlogService;
        })();
        Services.BlogService = BlogService;
        angular.module("app").service("BlogService", BlogService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
