"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var GlobalController = (function () {
            function GlobalController(UserService) {
                this.UserService = UserService;
                this.status = UserService.status;
            }
            GlobalController.prototype.logout = function () {
                this.UserService.removeToken();
                this.UserService.removeUser();
            };
            return GlobalController;
        })();
        Controllers.GlobalController = GlobalController;
        angular.module("app").controller("GlobalController", GlobalController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
