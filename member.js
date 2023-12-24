function skillsMember() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      member: '=',
      show: '='
    },
    templateUrl: 'templates/directives/skills-member.html',
    controller: function($scope) {
      $scope.show = false;
      $scope.toggle = function() {
        $scope.show = !$scope.show;
      };
    }
  };
}