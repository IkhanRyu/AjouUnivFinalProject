function YepNopeDirective() {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.check, function (val) {
        var words = val ? 'Yep' : 'Nope';
        element.text(words);
      });
    }
  }
}

module.exports = YepNopeDirective;
//angular.module('dashboard').directive('yepNope', YepNopeDirective);