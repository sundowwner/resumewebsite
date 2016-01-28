"use strict";
namespace app.Services {
    export class TagService{
        public tagResource;


        public getTag(tagId)    {
            return this.tagResource.get({ id: tagId});
        }
        public saveTag(tag) {
            return this.tagResource.save(tag).$promise;
        }
        public updateTag(tag)   {
            return this.tagResource.update({ id: tag._id}, tag).$promise;
        }
        public deleteTag(tagId) {
            return this.tagResource.delete({ _id: tagId }).$promise;
        }


        constructor(
            private $resource: ng.resource.IResourceService
        ){
            this.tagResource = $resource("/tags/:id", null,
            {
                    "update": {method: "PUT;"}
            });
        }

    }
    angular.module("app").service("TagService", TagService);
}
