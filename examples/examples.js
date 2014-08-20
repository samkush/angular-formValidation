;(function (window, document, undefined) {

'use strict';

// create angular controller
angular
.module('formValidationApp', ['formValidation'])
.controller('mainController', function($scope) {
  /*
  file.html
  */
  //初期化
  $scope.isFileSize = true;
  $scope.isFileType = true;
  $scope.isImageWidth = true;
  $scope.isImageHeight = true;
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
  $scope.mimHeight = 100;
  /*
  custom.html
  */
})
.controller('main2ndController', function($scope) {
  /*
  custom.html
  */
  //改行を文字数に含める・含めない
  $scope.isNewLine = false;
});
}(window, document));