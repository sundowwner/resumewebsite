"use strict";

namespace app.Controllers {
    export class ResumeController {

        constructor(
            private ResumeService: app.Services.ResumeService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService
        ){}

    }
    angular.module("app").controller("ResumeController",ResumeController);
}
