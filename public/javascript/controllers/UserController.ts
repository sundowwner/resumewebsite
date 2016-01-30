"use strict";
namespace app.Controllers{
    export class UserController {
        public user;


        public login()  {
            this.UserService.login(this.user).then((res) => {
                this.UserService.setToken(res.token);
                this.UserService.setUser();
                this.$location.path("/");
                this.ngToast.success({
                    content: "Congrats you are now logged in succesfully!",
                    horizontalPosition:"right"
                })
            }, (err) => {
                this.ngToast.warning({
                    content: err.data.message,
                    horizontalPosition:"right"
                })
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
                this.ngToast.success({
                    content: "Congrats you've registered, please login!",
                    horizontalPosition:"right"
                })
            }, (err) => {
                this.ngToast.warning({
                    content: err.data.message,
                    horizontalPosition:"right"
                })
            })
        }

        constructor(
            private UserService: app.Services.UserService,
            private $location: ng.ILocationService,
            private ngToast
                ){

        }
    }
    angular.module("app").controller("UserController",UserController);
}
