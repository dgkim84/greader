define([], function() {
  angular.module('greader.services', []);

  angular.module('greader.filters', [])
    .filter('encodeURI', [function() {
      return function(input) {
        return encodeURIComponent(input);
      }
    }])
    .filter('timeago', [function() {
      return function(input) {
        var now = new Date().getTime() / 1000 ^ 0;
        var past = parseInt(input);
        var diff = now - past;
        if (diff < 60) {
          return 'just now';
        } else if (diff < 120) {
          return diff + ' seconds ago';
        } else if (diff < 7200) {
          return (diff / 60 ^ 0) + ' minutes ago';
        } else if (diff < 129600) {
          return (diff / 3600 ^ 0) + ' hours ago';
        } else if (diff < 2678400) {
          return (diff / 86400 ^ 0) + ' days ago';
        } else if (diff < 15724800) {
          return (diff / 604800 ^ 0) + ' weeks ago';
        } else if (diff < 47174400) {
          return (diff / 2626560 ^ 0) + ' months ago';
        } else {
          return (diff / 31536000 ^ 0) + ' years ago';
        }
      };
    }]);
});