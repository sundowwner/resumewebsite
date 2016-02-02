'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.status = { _id: null, email: null, username: null };
                this.UserLoginResource = $resource('/users/login');
                this.UserRegisterResource = $resource('/users/register');
                if (this.getToken())
                    this.setUser();
            }
            UserService.prototype.register = function (user) {
                return this.UserRegisterResource.save(user).$promise;
            };
            ;
            UserService.prototype.login = function (user) {
                return this.UserLoginResource.save(user).$promise;
            };
            UserService.prototype.setToken = function (token) {
                this.$window.localStorage.setItem('token', token);
            };
            UserService.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            UserService.prototype.removeToken = function () {
                this.$window.localStorage.removeItem('token');
            };
            UserService.prototype.removeUser = function () {
                this.status._id = null;
                this.status.email = null;
                this.status.username = null;
            };
            UserService.prototype.setUser = function () {
                var u = JSON.parse(atob(this.$window.localStorage.getItem('token').split('.')[1]));
                this.status._id = u._id;
                this.status.email = u.email;
                this.status.username = u.username;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('app').service('UserService', UserService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
