"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var ResumeController = (function () {
            function ResumeController(ResumeService, $location, $routeParams) {
                this.ResumeService = ResumeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            return ResumeController;
        }());
        Controllers.ResumeController = ResumeController;
        angular.module("app").controller("ResumeController", ResumeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
