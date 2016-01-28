"use strict";
namespace app.Controllers {
    export class BlogUpdateController {
        public blog;

        

         constructor(
             private BlogService: app.Services.BlogService,
             private $location: ng.ILocationService,
             private $routeParams: ng.route.IRouteParamsService
         ){
             this.blog = BlogService.getBlog($routeParams["id"]);
         }

    }
    angular.module("app").controller("BlogUpdateController",BlogUpdateController);
}
