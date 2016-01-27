"use strict";
namespace app.Services{
    export class BlogService{
        public BlogResource;

        public getAll() {
            //GET: /blogs
            return this.BlogResource.query();
        }
        public getBlog(blogId)  {
            //GET: /blogs/{{blogId}}
            return this.BlogResource.get({ id: blogId });
        }

        public saveBlog(blog) {
            //POST: /blogs
            return this.BlogResource.save(blog).$promise;
        }

        public deleteBlog(blog) {
            //DELETE: /blogs_id={{id}}
            return this.BlogResource.delete({ _id:blog._id }).$promise;
        }


        constructor(
            private $resource: ng.resource.IResourceService
        ){
            this.BlogResource = $resource("/blogs/:id", null,
            {
                    "update": { method: "PUT"}
            });
        }

    }
    angular.module("app").service("BlogService", BlogService);
}
