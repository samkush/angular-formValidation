'use strict';

angular
.module('formValidation', [])
.directive('validateNospace', function() {
  var _link = function (scope, element, attrs) {
    scope.isNospace = false;
    element.bind('keyup', function(event){
      scope.$apply(function () {
        scope.isNospace = (event.target.value.indexOf(' ') != -1);
      });
    });
  }
  return {
    restrict: 'A',
    link: _link,
  }
})
.directive('validateLine', function() {
  var _link = function (scope, element, attrs) {
    element.bind('keyup', function(event){
      var len = (scope.isNewLine)? event.target.value.length:event.target.value.replace(/[\n\r]/g,"").length;
      scope.$apply(function () {
        console.log(len,Number(attrs.ngMaxlength),Number(attrs.ngMinlength));
        scope.form.text.$error.minlength = !(len >= Number(attrs.ngMinlength));
        scope.form.text.$error.maxlength = !(Number(attrs.ngMaxlength) >= len);
      });
    });
  }
  return {
    restrict: 'A',
    link: _link,
  }
})
.directive('validationFile', function() {
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
            scope.isImageHeight = (scope.maxHeight >= image.height && image.height >= scope.minHeight);
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