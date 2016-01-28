"use strict";
namespace app.Services {
    export class CommentService {
        private commentResource;

        public saveComment(comment) {
            return this.commentResource.save(comment).$promise;
        }
        public updateComment(comment)   {
            return this.commentResource.update({ id: comment._id }, comment).$promise;

        }
        public deleteComment(comment) {
            return this.commentResource.delete({ id: comment._id }).$promise;
        }
        public getComment(commentId)    {
            return this.commentResource.get({id: commentId});
        }

        constructor(
            private $resource: ng.resource.IResourceService
        ){
            this.commentResource = $resource("/api/comments/:id", null,
            {
                    "update": { method: "PUT"}
            });
        }
    }
    angular.module("app").service("CommentService", CommentService);
}
