"use strict";
namespace app.Controllers {
    export class BlogCreateController {
        public blog = {};


        public createBlog() {
            this.BlogService.saveBlog(this.blog).then((res) => {
                this.$location.path("/blog")
            })
        }

        constructor(
            private BlogService: app.Services.BlogService,
            private $location: ng.ILocationService

        ){

        }

    }
    angular.module("app").controller("BlogCreateController",BlogCreateController);
}
