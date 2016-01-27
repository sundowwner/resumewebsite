"use strict";
namespace app.Controllers {
    export class BlogDetailsController{
        public blog;


        public delete(id)   {
            this.BlogService.deleteBlog(this.blog).then((res) => {
                this.$location.path("/blog");
            });
        }
        constructor(
            private BlogService: app.Services.BlogService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
        ){
            this.blog = BlogService.getBlog( $routeParams["id"]);
        }
    }
    angular.module("app").controller("BlogDetailsController",BlogDetailsController);
}
