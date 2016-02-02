"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var ContactService = (function () {
            function ContactService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.ContactResource = $resource("/contacts/:id", null, {
                    "update": { method: "PUT" }
                });
            }
            ContactService.prototype.saveContact = function (contact) {
                return this.ContactResource.save(contact).$promise;
            };
            return ContactService;
        }());
        Services.ContactService = ContactService;
        angular.module("app").service("ContactService", ContactService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
