"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var ContactCreateController = (function () {
            function ContactCreateController(ContactService, $location, $routeParams, ngToast) {
                this.ContactService = ContactService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.ngToast = ngToast;
            }
            ContactCreateController.prototype.createContact = function () {
                var _this = this;
                this.ContactService.saveContact(this.contact).then(function (res) {
                    _this.$location.path("/");
                    _this.ngToast.success({
                        content: "Thanks for the message. We'll be in touch soon!",
                        horizontalPosition: "right"
                    });
                });
            };
            return ContactCreateController;
        }());
        Controllers.ContactCreateController = ContactCreateController;
        angular.module("app").controller("ContactCreateController", ContactCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
