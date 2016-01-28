"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var TagService = (function () {
            function TagService($resource) {
                this.$resource = $resource;
                this.tagResource = $resource("/tags/:id", null, {
                    "update": { method: "PUT;" }
                });
            }
            TagService.prototype.getTag = function (tagId) {
                return this.tagResource.get({ id: tagId });
            };
            TagService.prototype.saveTag = function (tag) {
                return this.tagResource.save(tag).$promise;
            };
            TagService.prototype.updateTag = function (tag) {
                return this.tagResource.update({ id: tag._id }, tag).$promise;
            };
            TagService.prototype.deleteTag = function (tagId) {
                return this.tagResource.delete({ _id: tagId }).$promise;
            };
            return TagService;
        })();
        Services.TagService = TagService;
        angular.module("app").service("TagService", TagService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
