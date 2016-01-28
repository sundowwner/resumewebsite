"use strict";
namespace app.Controllers {
    export class CommentUpdateController {
        public comment;

        public update(id)   {
            this.CommentService.updateComment(this.comment).then((res) => {
                this.$location.path("/details/" + this.comment.blog );
            });
        }
        constructor(
            private CommentService: app.Services.CommentService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService
        ){
            this.comment = CommentService.getComment($routeParams["id"]);
        }
    }
    angular.module("app").controller("CommentUpdateController",CommentUpdateController);
}
