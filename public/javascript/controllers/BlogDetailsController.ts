"use strict";
namespace app.Controllers {
    export class BlogDetailsController{
        public blog;
        public hide = false;
        public comment;
        public tag;
        public TagService;


        public addComment() {
            let comment = {
                message: this.comment,
                blog: this.blog._id
            };
            this.CommentService.saveComment(comment).then((res) =>{
                this.blog.comments.push(res);
                this.comment = '';
            });
        }
        public deleteComment(comment)   {
            this.CommentService.deleteComment(comment).then((res) => {
                this.blog.comments.splice(this.blog.comments.indexOf(comment), 1);
            });
        }
        public addTag() {
            let tag = {
                tagmessage: this.tag,
                blog: this.blog._id
            }
            this.TagService.saveTag(tag).then((res) => {
                this.blog.tags.push(res);
            });
        }
        public deleteTag(tag) {
            this.TagService.deleteTag(tag).then((res) => {
                this.blog.tags.splice(this.blog.tag.indexOf(tag))
            })
        }



        public update()   {
            this.BlogService.updateBlog(this.blog).then((res) => {
                this.$location.path("/blog")
            });
        }

        public delete()   {
            this.BlogService.deleteBlog(this.blog).then((res) => {
                this.$location.path("/blog");
            });
        }
        public show()   {
            this.hide = true;
        }
        constructor(
            private BlogService: app.Services.BlogService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService,
            private CommentService: app.Services.CommentService
        ){
            this.blog = BlogService.getBlog( $routeParams["id"]);
        }
    }
    angular.module("app").controller("BlogDetailsController",BlogDetailsController);
}
