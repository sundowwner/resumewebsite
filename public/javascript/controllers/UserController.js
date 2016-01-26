"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UserController = (function () {
            function UserController(UserService, $location) {
                this.UserService = UserService;
                this.$location = $location;
            }
            UserController.prototype.login = function () {
                var _this = this;
                this.UserService.login(this.user).then(function (res) {
                    _this.UserService.setToken(res.token);
                    _this.UserService.setUser();
                    _this.$location.path("/");
                });
            };
            UserController.prototype.register = function () {
                var _this = this;
                var user = {
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password
                };
                this.UserService.register(user).then(function (res) {
                    _this.$location.path("/login");
                });
            };
            ;
            return UserController;
        })();
        Controllers.UserController = UserController;
        angular.module("app").controller("UserController", UserController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
