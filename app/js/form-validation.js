function formValidation() {
  var self = this;
  this.form = $('#id-comment-form');
  this.fieldName = $('#id-name');
  this.fieldEmail = $('#id-email');
  this.fieldText = $('#id-text');

  var addValidClass = function(element) {
    element.addClass('success');
    element.removeClass('error');
  }

  var addInvalidClass = function(element) {
    element.removeClass('success');
    element.addClass('error');
  }

  var nameValidate = function() {
    if (self.fieldName.val() == '') {
      addInvalidClass(self.fieldName);
      return false;
    }

    addValidClass(self.fieldName);
    return true;
  }

  var emailValidate = function() {
    if (self.fieldEmail.val() == '') {
      addInvalidClass(self.fieldEmail);
      return false;
    }

    addValidClass(self.fieldEmail);
    return true;
  }

  var textValidate = function() {
    if (self.fieldText.val() == '') {
      addInvalidClass(self.fieldText);
      return false;
    }

    addValidClass(self.fieldText);
    return true;
  }

  var addComment = function(name, text) {

      var commentItem = $('<div>').attr({'class':'comments-list-item'});
          commentItem.html('<span class="comment-name">' + name + '</span><div class="comment-text"><p>' + text + '</p></div>');

      var commentsList = $('.comments-list');
          commentsList.append(commentItem);
  }

  var formSubmit = function(event) {
    event.preventDefault();
    var isNameValid = nameValidate();
    var isEmailValid = emailValidate();
    var isTextValid = textValidate();

    if (isNameValid && isEmailValid && isTextValid) {
        addComment(self.fieldName.val(), self.fieldText.val());
    }
  }

  var bindFromEvents = function() {
    self.fieldName.on('blur', nameValidate);
    self.fieldEmail.on('blur', emailValidate);
    self.fieldText.on('blur', textValidate);
    self.form.on('submit', formSubmit);
  }

  this.init = function() {
    bindFromEvents();
  }
}

$(function() {
  var validation = new formValidation();
  validation.init();
});

console.log('Validation');
