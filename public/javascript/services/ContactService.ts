"use strict";
namespace app.Services {
    export class ContactService {
        public ContactResource;

        public saveContact(contact)   {
            return this.ContactResource.save(contact).$promise;
        }


        constructor(
            private $resource: ng.resource.IResourceService,
            private $window: ng.IWindowService
        ){
            this.ContactResource = $resource("/contacts/:id", null,
            {
                "update": { method: "PUT"}
            });
        }
    }
    angular.module("app").service("ContactService",ContactService);
}
