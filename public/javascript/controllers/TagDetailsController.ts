"use strict"
namespace app.Controllers {
    export class TagDetailsController {
        public blog;


        public deleteTag(tag)   {
            this.TagService.deleteTag(tag).then((res) => {
                this.blog.tag.splice(this.blog.tag.indexOf(tag), 1);
            });
        }

        constructor(
            private TagService: app.Services.TagService,
            private $location: ng.ILocationService,
            private BlogService: app.Services.BlogService,
            private $routeParams: ng.route.IRouteParamsService
        ){
            this.blog = BlogService.getBlog($routeParams["id"]);
        }
    }
    angular.module("app").controller("TagDetailsController", TagDetailsController);
}
