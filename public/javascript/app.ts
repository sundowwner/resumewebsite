'use strict';
namespace App {
  angular.module('app', ['ngRoute', 'ngResource',"ui.bootstrap",'ngToast',"angularTrix","wysiwyg.module","textAngular"])
  .config((
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider) => {

    $routeProvider
    .when('/', {
      templateUrl: '/templates/Home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .when("/register", {
        templateUrl: "/templates/Register.html",
        controller: app.Controllers.UserController,
        controllerAs: "vm"
    })
    .when("/login", {
        templateUrl: "/templates/Login.html",
        controller: app.Controllers.UserController,
        controllerAs: "vm"
    })
    .when("/blogcreate", {
        templateUrl: "/templates/BlogCreate.html",
        controller: app.Controllers.BlogCreateController,
        controllerAs: "vm"
    })
    .when("/blog", {
        templateUrl: "/templates/Blog.html",
        controller: app.Controllers.BlogController,
        controllerAs: "vm"
    })
    .when("/details/:id", {
        templateUrl: "/templates/BlogDetails.html",
        controller: app.Controllers.BlogDetailsController,
        controllerAs: "vm"
    })
    .when("/update/:id", {
        templateUrl: "/templates/BlogUpdate.html",
        controller: app.Controllers.BlogUpdateController,
        controllerAs: "vm"
    })
    .when("/commentUpdate/:id" , {
        templateUrl: "/templates/CommentUpdate.html",
        controller: app.Controllers.CommentUpdateController,
        controllerAs: "vm"
    })
    .when("/contact", {
        templateUrl: "/templates/Contact.html",
        controller: app.Controllers.ContactController,
        controllerAs: "vm"
    })
    .when("/resume", {
        templateUrl: "/templates/Resume.html",
        controller: app.Controllers.ResumeController,
        controllerAs: "vm"
    })
    .when("/tagCreate/:id", {
        templateUrl: "/templates/TagCreate.html",
        controller: app.Controllers.TagCreateController,
        controllerAs: "vm"
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
