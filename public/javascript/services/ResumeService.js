"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var ResumeService = (function () {
            function ResumeService($resource) {
                this.$resource = $resource;
            }
            return ResumeService;
        })();
        Services.ResumeService = ResumeService;
        angular.module("app").service("ResumeService", ResumeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
