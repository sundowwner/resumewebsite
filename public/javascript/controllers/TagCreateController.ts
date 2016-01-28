"use strict";
namespace app.Controllers {
    export class TagCreateController{
        public blog;
        public tagmessage;



        public addTag() {
            let tag = {
                tagmessage: this.tagmessage,
                blog: this.blog._id
            }
            this.TagService.saveTag(tag).then((res) => {
                this.blog.tag.push(res);
                this.$location.path("/blog")
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
    angular.module("app").controller("TagCreateController", TagCreateController);
}
