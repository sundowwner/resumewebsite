"use strict";
namespace app.Controllers {
    export class ContactCreateController {
        public contact;

        public createContact() {
            this.ContactService.saveContact(this.contact).then((res) =>{
                this.$location.path("/contact");
                this.ngToast.success({
                    content: "Thanks for the message. We'll be in touch soon!",
                    horizontalPosition: "right"
                })
            })
        }


        constructor(
            private ContactService: app.Services.ContactService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService,
            private ngToast
        ){

        }
    }
    angular.module("app").controller("ContactCreateController",ContactCreateController);
}
