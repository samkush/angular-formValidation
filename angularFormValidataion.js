'use strict';

angular
.module('formValidation', [])
.directive('validate',function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      noSpace: '@',
      noHyphen: '@',
      isNewLine: '@'
    },
    link: function(scope, element, attrs, ctrl){
      var val;
      element.bind('blur keyup keydown keypress change', function(event) {
        if(val === event.target.value){
          return false;
        }
        val = event.target.value;
        if(scope.noSpace){
          ctrl.$setValidity('noSpace', val.indexOf(' ') === -1);
        }
        if(scope.noHyphen){
          ctrl.$setValidity('noHyphen', val.indexOf('-') === -1);
        }
        var len = (scope.isNewLine) ?
        event.target.value.replace(/[\n\r]/g,"").length:
        event.target.value.length;
        ctrl.$setValidity('minlength', (len >= Number(attrs.ngMinlength)));
        ctrl.$setValidity('maxlength', (Number(attrs.ngMaxlength) >= len));
        scope.$apply();
      });
    }
  };
})
.directive('validateFile', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl){
      console.log(ctrl);
      element.bind('change',function(event){
        var
        file = (event.dataTransfer)? event.dataTransfer.files[0]:event.target.files[0],
        image = new Image(),
        fileReader = new FileReader();
        ctrl.$setValidity('isFileSize', (scope.fileMaxSize >= file.size && file.size >= scope.fileMimSize));
        ctrl.$setValidity('isFileType', (scope.fileType.indexOf(file.type.toLowerCase()) != -1));
        fileReader.onloadend = function(){
          image.src = fileReader.result;
          ctrl.$setValidity('isImageWidth', (scope.maxWidth >= image.width && image.width >= scope.mimWidth));
          ctrl.$setValidity('isImageHeight', (scope.maxHeight >= image.height && image.height >= scope.minHeight));
        };
        fileReader.readAsDataURL(file);
        scope.$apply();
      });
    }
  };
});