;(function (window, document, undefined) {

'use strict';

// create angular controller
angular
.module('formValidationApp', ['formValidation'])
.controller('mainController', function($scope) {
  /*
  file.html
  */
  //条件
  //最大サイズ
  $scope.fileMaxSize = 200000;
  //最小サイズ
  $scope.fileMimSize = 100000;
  //拡張子
  $scope.fileType = ['image/png','image/gif'];
  //最大サイズ
  $scope.maxWidth = 500;
  //最小サイズ
  $scope.mimWidth = 100;
  //最大サイズ
  $scope.maxHeight = 500;
  //最小サイズ
  $scope.minHeight = 100;
});
}(window, document));