"use strict";
namespace app.Controllers {
    export class ContactController {

        constructor(
            private ContactService: app.Services.ContactService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService
        ){

        }
    }
    angular.module("app").controller("ContactController",ContactController);
}
