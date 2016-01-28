"use strict";
namespace app.Services {
    export class ResumeService {

        constructor(
            private $resource: ng.resource.IResourceService
        ){}
    }
    angular.module("app").service("ResumeService",ResumeService);
}
