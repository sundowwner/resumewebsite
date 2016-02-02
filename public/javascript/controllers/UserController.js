"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UserController = (function () {
            function UserController(UserService, $location, ngToast) {
                this.UserService = UserService;
                this.$location = $location;
                this.ngToast = ngToast;
            }
            UserController.prototype.login = function () {
                var _this = this;
                this.UserService.login(this.user).then(function (res) {
                    _this.UserService.setToken(res.token);
                    _this.UserService.setUser();
                    _this.$location.path("/blog");
                    _this.ngToast.success({
                        content: "Congrats you are now logged in succesfully!",
                        horizontalPosition: "right"
                    });
                }, function (err) {
                    _this.ngToast.warning({
                        content: err.data.message,
                        horizontalPosition: "right"
                    });
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
                    _this.ngToast.success({
                        content: "Congrats you've registered, please login!",
                        horizontalPosition: "right"
                    });
                }, function (err) {
                    _this.ngToast.warning({
                        content: err.data.message,
                        horizontalPosition: "right"
                    });
                });
            };
            return UserController;
        }());
        Controllers.UserController = UserController;
        angular.module("app").controller("UserController", UserController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
