(function ($) {
  $(document).ready(function() {
    if ($('body').hasClass('page-berloga-price') || $('body').hasClass('page-admin-berloga-price')) {
      var tableOffset = $("#price-table").offset().top;
      var header = $("#price-table > thead").clone();
      var fixedHeader = $("#header-fixed").append(header);

      var chacheWarningText = ('Не забудьте очистить все кеши после завершения редактирования Прайса!</br></br>Иначе изменения цен не будут видны посетителям!');

      $(window).bind("scroll", function() {
        var offset = $(this).scrollTop();
        if (offset >= tableOffset && fixedHeader.is(":hidden")) {
          fixedHeader.show();
        }
        else if (offset < tableOffset) {
          fixedHeader.hide();
        }
      });

      $('.price-update').click(function() {
        $(this).text('Сохранено').css('background', 'green').css('color', 'white');
        var price = $(this).parent().parent().find('.current-price').val();
        var oldPrice = $(this).parent().parent().find('.old-price').val();
        var pid = $(this).data('pid');
        console.log('pid: ' + pid + ' price: ' + price + ' old price: ' + oldPrice);
        $.ajax({
          type: 'get',
          url: '/berloga_price_update',
          data: {pid: pid, price: price, oldprice: oldPrice},
          dataType: 'html',
          success: function (r) {
            console.log('ajax results: ' + r);
            if (r == 'success') {
              // alert ('ok');
            } else {
              alert ('somthing went wrong!');
            }
          }
        });
      });

      $('.input-price').change(function() {
        $(this).parent().parent().find('.price-update').text('Обновить').css('background', 'red').css('color', 'white');
        if ($('.chache-reminder').length == 0) {
          $('#block-system-main .content').append('<div class="chache-reminder">'+ chacheWarningText +'</div>');
        }
      });
      
      window.addEventListener('scroll', function() {
        $('.page-admin-berloga-price #header-fixed').css('width', $('#price-table').width());
      });

      $('.product-card-link-edit').click(function() {
        window.open($(this).attr('href'), '_blank');
        return false;
      });
      $('.product-card-link').click(function() {
        window.open($(this).attr('href'), '_blank');
        return false;
      });
    }
  });
})(jQuery);
