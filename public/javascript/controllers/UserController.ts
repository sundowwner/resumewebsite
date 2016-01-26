"use strict";
namespace app.Controllers{
    export class UserController {
        public user;

        public login()  {
            this.UserService.login(this.user).then((res) => {
                this.UserService.setToken(res.token);
                this.UserService.setUser();
                this.$location.path("/");
            })
        }

        public register()   {
            let user = {
                username: this.user.username,
                email: this.user.email,
                password: this.user.password
            }
            this.UserService.register(user).then((res) => {
                this.$location.path("/login");
            });
        };

        constructor(
            private UserService: app.Services.UserService,
            private $location: ng.ILocationService
        ){

        }
    }
    angular.module("app").controller("UserController",UserController);
}
