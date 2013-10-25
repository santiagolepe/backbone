$(document).ready(function(){
  $('#submit').attr('disabled', 'disabled');
  

  $('#password').keyup(function(){
    $('#password_c').val('');
  });

  $('#password_c').keyup(function(){
    if($(this).val() === $('#password').val()){
      $('#submit').removeAttr('disabled');
    } else {
      $('#submit').attr('disabled', 'disabled');
    }
  });
});
