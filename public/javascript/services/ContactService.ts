"use strict";
namespace app.Services {
    export class ContactService {

        constructor(
            private $resource: ng.resource.IResourceService,
            private $window: ng.IWindowService
        ){

        }
    }
    angular.module("app").service("ContactService",ContactService);
}
