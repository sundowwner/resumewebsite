"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var ContactController = (function () {
            function ContactController(ContactService, $location, $routeParams) {
                this.ContactService = ContactService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            return ContactController;
        })();
        Controllers.ContactController = ContactController;
        angular.module("app").controller("ContactController", ContactController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
