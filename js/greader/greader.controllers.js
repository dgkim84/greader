define([], function(subscriptions) {
  function MainCtrl($scope, $http, $routeParams, $location) {
    /* selected feed */
    $scope.feed = null;
    /* subscriptions info */
    $scope.subscriptions = {};
    /* feed items */
    $scope.items = [];

    $scope.show = show;
    $scope.expand = expand;
    $scope.collapse = collapse;
    $scope.expandOrCollapse = expandOrCollapse;

    $http.get('/greader/meta/subscriptions.json').success(function(data) {
      $scope.subscriptions = data;

      if ($routeParams.feed) {
        var feed = data.feeds
          .filter(function(i) { return i.id == $routeParams.feed })
          .forEach(function(i) {show(i)});
      }
    });

    function preprocess(items) {
      if (items) {
        items.map(function(i) {
          i.title = i.title || 'No title';
        });
      }
      return items;
    };

    function expandOrCollapse(item) {
      item._meta = item._meta || {};
      if (!item._meta.expand) {
        item._meta.expand = false;
      }
      item._meta.expand = !item._meta.expand;
    };

    function expand(item) {
      item._meta = item._meta || {};
      item._meta.expand = true;
    };

    function collapse(item) {
      item._meta = item._meta || {};
      item._meta.expand = false;
    };

    function show(feed) {
      $location.path('/greader/feeds/'+feed.id);
      $scope.feed = feed;
      $http.get('/greader/feeds/'+feed.id+'.json').success(function(data) {
        $scope.items = preprocess(data.items);
      });
    };
  };
  MainCtrl.$inject = ['$scope', '$http', '$routeParams', '$location'];

  function GReaderCtrls($scope) {
    $scope.MainCtrl = MainCtrl;
  };
  GReaderCtrls.$inject = ['$scope'];
  return {
    GReaderCtrls: GReaderCtrls
  };
});