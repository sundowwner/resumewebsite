'use strict';
namespace app.Services {
  export class UserService {
    public status = { _id: null, email: null, username: null };
    public UserLoginResource;
    public UserRegisterResource;

    public register(user) {
      return this.UserRegisterResource.save(user).$promise;
    };

    public login(user) {
      return this.UserLoginResource.save(user).$promise;
    }

    public setToken(token) {
      this.$window.localStorage.setItem('token', token);
      // this.$window.localStorage['token'] = token;
    }

    public getToken() {
      return this.$window.localStorage.getItem('token');
      // return this.$window.localStorage['token'];
    }

    public removeToken() {
      this.$window.localStorage.removeItem('token');
      // delete this.$window.localStorage['token'];
    }

    public removeUser() {
      this.status._id = null;
      this.status.email = null;
      this.status.username = null;
    }

    public setUser() {
      let u = JSON.parse( atob( this.$window.localStorage.getItem('token').split('.')[1] ) );
      this.status._id = u._id;
      this.status.email = u.email;
      this.status.username = u.username;
    }

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService
      ) {
      this.UserLoginResource = $resource('/users/login');
      this.UserRegisterResource = $resource('/users/register');

      if (this.getToken()) this.setUser();
    }
  }

  angular.module('app').service('UserService', UserService);
}
