'use strict';

angular
.module('formValidation', [])
.directive('formValidationDirectiveFile', function() {
  return function(scope,elm,attr){
    elm.bind('change', function(event){
      var file = (event.dataTransfer)? event.dataTransfer.files[0]:event.target.files[0];
      
      var image = new Image();
      var fileReader = new FileReader();

      var imageSize = {};

      fileReader.onloadend = function(){
        image.src = fileReader.result;
        imageSize.width = image.width;
        imageSize.height = image.height;
        alert('fileSizeWidth:' + imageSize.width);
        alert('fileSizeHeight:' + imageSize.height);
      };
      fileReader.readAsDataURL(file);
      alert('fileSize:' + file.size);
      alert('fileType:' + file.type);
    });
  }
});