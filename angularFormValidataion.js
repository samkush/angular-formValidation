'use strict';

angular
.module('formValidation', [])
.directive('formValidationDirectiveNoSpace', function() {
  var _link = function (scope, element, attrs) {
    element.bind('change', function(event){
      var val = event.target.value;
      val = val.replace(/\s+/g, "");
      this.value = val;
    });
  }
  return {
    restrict: 'A',
    link: _link,
  }
})
.directive('formValidationDirectiveOneByteNum', function() {
  var _link = function (scope, element, attrs) {
    element.bind('change', function(event){
      var val = event.target.value;
      val = val.replace(/[０-９]/g, function(s) {
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });
      this.value = val;
    });
  }
  return {
    restrict: 'A',
    link: _link,
  }
})
.directive('formValidationDirectiveOneByte', function() {
  var _link = function (scope, element, attrs) {
    element.bind('change', function(event){
      var val = event.target.value;
      val = val.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });
      this.value = val;
    });
  }
  return {
    restrict: 'A',
    link: _link,
  }
})
.directive('formValidationDirectiveLimit', function() {
  var _link = function (scope, element, attrs) {
    element.bind('keyup', function(event){
      var len;
      if(scope.isNewLine){
        len = event.target.value.length;
      }else{
        var val = event.target.value.replace(/[\n\r]/g,"");
        len = val.length;
      }
      scope.$apply(function () {
        scope.form.username.$error.minlength = !(len >= Number(attrs.ngMinlength));
        scope.form.username.$error.maxlength = !(Number(attrs.ngMaxlength) >= len);
      });
    });
  }
  return {
    restrict: 'A',
    link: _link,
  }
})
.directive('formValidationDirectiveFile', function() {
  var _link = function (scope, element, attrs) {
    element.bind('change', function(event){

      var
      file = (event.dataTransfer)? event.dataTransfer.files[0]:event.target.files[0],
      image = new Image(),
      fileReader = new FileReader();

      scope.$apply(function () {
          scope.isFileSize = (scope.fileMaxSize >= file.size && file.size >= scope.fileMimSize);
          scope.isFileType = (scope.fileType.indexOf(file.type.toLowerCase()) != -1);
      });

      fileReader.onloadend = function(){
        image.src = fileReader.result;

        scope.$apply(function () {
            scope.isImageWidth = (scope.maxWidth >= image.width && image.width >= scope.mimWidth);
            scope.isImageHeight = (scope.maxHeight >= image.height && image.height >= scope.mimHeight);
        });

      };
      fileReader.readAsDataURL(file);
    });
  }
  return {
    restrict: 'A',
    link: _link,
  };
});