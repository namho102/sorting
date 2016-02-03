

$(document).ready(function () {
  console.log('wtf');
  var $selectRef = $('.controls__select .option');
  var $sizeRef = $('.controls__size .option');
  $selectRef.each(function () {
    $(this).click(function() {
      // $selectRef.removeClass('selected');
      $(this).addClass('selected');
    })
  })

  $sizeRef.each(function () {
    $(this).click(function() {
      $sizeRef.removeClass('selected');
      $(this).addClass('selected');
    })
  })


});
