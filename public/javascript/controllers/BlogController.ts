"use strict";
namespace app.Controllers {
    export class BlogController{
        public blogs;

        

        constructor(
            private BlogService: app.Services.BlogService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService
        ){
            this.blogs = BlogService.getAll();
        }

    }
    angular.module("app").controller("BlogController", BlogController);
}
