"use strict";
namespace app.Services {
  export class HomeService {


    constructor(
        private $resource: ng.resource.IResourceService
    ) {

    }
  }

  angular.module('app').service('HomeService', HomeService);
}
