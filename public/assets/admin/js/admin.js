jQuery(function($) {
    $('[data-rel=tooltip]').tooltip({container:'body'});
    $('[data-rel=popover]').popover({container:'body'});

    $(".action-delete").on(ace.click_event, function() {
        var $this = $(this);
        bootbox.confirm("Вы уверены что хотите удалить объект?", function(result) {
            if(result) {
                $this.closest('form').submit();
                return true;
            }
        });
    });

    $(".action-restore").on(ace.click_event, function() {
        var $this = $(this);
        bootbox.confirm("Вы уверены что хотите востановить объект?", function(result) {
            if(result) {
                $this.closest('form').submit();
                return true;
            }
        });
    });

    $('.chosen-select').chosen({allow_single_deselect:true});

    if($('.chosen-autocomplite').length) {
        $('.chosen-autocomplite').each(function(){
            var $id = $(this).attr('id');
            $id = $id.replace(/\-/gi, "_");
            var selector = '#'+$id+'_chosen .chosen-search input';
            var $url = $(this).data('url');
            var MySelect = $(this);

            $(selector).autocomplete({
                source: function( request, response ) {
                    $search_param = $(selector).val();
                    var data = {
                        search_param: $search_param
                    };
                    if($search_param.length > 2) { //отправлять поисковой запрос к базе, если введено более 2 символов
                        $.post($url, data, function onAjaxSuccess(data) {
                            if((data.length!='0')) {
                                $('ul.chosen-results').find('li').each(function () {
                                    $(this).remove();//отчищаем выпадающий список перед новым поиском
                                });
                                MySelect.find('option').each(function () {
                                    $(this).remove(); //отчищаем поля перед новым поисков
                                });
                            }
                            jQuery.each(data, function(){
                                MySelect.append('<option value="' + this.id + '">' + this.name + ' </option>');
                            });
                            MySelect.trigger("chosen:updated");
                            $(selector).val($search_param);
                            anSelected = MySelect.val();
                        });
                    }
                }
            });

        });
    }


    $('textarea.limited').inputlimiter({
        remText: '%n символ(ов) осталось...',
        limitText: 'максимально: %n.'
    });

    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl+V, Command+V
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('.spinbox-input').ace_spinner({min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});

    if($('.calculate').length) {
        $('.calculate input[name="price"], .calculate input[name="price_old"]').change(function(){
            var price = $('.calculate input[name="price"]').val();
            var price_old = $('.calculate input[name="price_old"]').val();
            var discount = Math.ceil((price_old-price)*100/price_old);
            if(discount < 0) {
                discount = 0;
            }
            $('.calculate input[name="discount"]').val(discount)
        });

        $('.calculate input[name="discount"]').change(function(){
            var discount = $(this).val();
            var price = $('.calculate input[name="price"]').val();
            var price_old = Math.ceil(price*100/(100-discount));

            $('.calculate input[name="price_old"]').val(price_old)
        });
    }

    if($('#photo-crop').length) {

        function preview(img, selection) {
            if (!selection.width || !selection.height)
                return;

            $('#x1').val(selection.x1);
            $('#y1').val(selection.y1);
            $('#x2').val(selection.x2);
            $('#y2').val(selection.y2);
        }

        var ias = $('#photo-crop').imgAreaSelect({
            movable:true,
            fadeSpeed: 200, onSelectChange: preview,
            instance: true, show:true, x1:0, y1:0, x2: $('#photo-crop').data('width'), y2:$('#photo-crop').data('height')
        });

        ias.setOptions({aspectRatio: $('#photo-crop').data('width') + ':' + $('#photo-crop').data('height')});
        ias.setOptions({minWidth: $('#photo-crop').data('width')});
        ias.setOptions({minHeight:$('#photo-crop').data('height')});
        ias.update();
    }


    CKEDITOR.replaceAll('ck-editor');

    $('.file-input-img').ace_file_input({
        no_file:'Не выбрано ...',
        btn_choose:'Выберите',
        btn_change:'Изменить',
        droppable:false,
        onchange:null,
        thumbnail:false, //| true | large
        whitelist:'gif|png|jpg|jpeg'
    });


    $('.img-drop').ace_file_input({
        style:'well',
        btn_choose:'Выберите или перенесите изображение',
        btn_change:null,
        no_icon:'ace-icon fa fa-cloud-upload',
        droppable:true,
        thumbnail:'fit'//large | fit
        ,
        preview_error : function(filename, error_code) {
        }
    }).on('change', function(){
    });
    var colorbox_params = {
        rel: 'colorbox',
        reposition:true,
        scalePhotos:true,
        scrolling:false,
        previous:'<i class="ace-icon fa fa-arrow-left"></i>',
        next:'<i class="ace-icon fa fa-arrow-right"></i>',
        close:'&times;',
        current:'{current} of {total}',
        maxWidth:'100%',
        maxHeight:'100%',
        onOpen:function(){
            $overflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        },
        onClosed:function(){
            document.body.style.overflow = $overflow;
        },
        onComplete:function(){
            $.colorbox.resize();
        }
    };

    $('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);

    $(".youtube-popup").colorbox({iframe:true, innerWidth:640, innerHeight:390});

    $('.dynamic-input-item .plus').click(function(e){
        e.preventDefault();
        var block = $(this).closest('.dynamic-input-item').clone();
        block.find('.ace-file-container').remove();
        block.find('.plus').removeClass('plus').addClass('minus').end().
              find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus').end().
              find(':input').val('').end().
              find('.field').hide();
        $(this).closest('.dynamic-input').append(block);

        $('.file-input-img').ace_file_input({
            no_file:'Не выбрано ...',
            btn_choose:'Выберите',
            btn_change:'Изменить',
            droppable:false,
            onchange:null,
            thumbnail:false, //| true | large
            whitelist:'gif|png|jpg|jpeg'
        });

        $('.input-mask').each(function(){
            $(this).mask($(this).data('mask'));
        });
    });

    $(document).on("click",".dynamic-input-item .minus",function(e) {
        e.preventDefault();
        $(this).closest('.dynamic-input-item').remove();
    });

    $(document).on("change",".select-get-sub",function(e) {
        var $select = $(this);
        $.ajax({
            url: $select.data('url'),
            type:'POST',
            data: 'id='+$select.val()+'&val='+$select.data('val'),
            success:function(data){
                $('#'+$select.data('content-id')).html(data);
            }
        });
    });

    if ($('.select-get-sub').length){
        $('.select-get-sub').trigger('change');
    }

    $('.photo-container .photo-action-delete').click(function(e){
        e.preventDefault();
        var el = $(this).closest('.photo-container-item');
        el.find('.photo-action-cancel').show().end().
        find('.photo-action-delete').hide().end().
        find('.label-delete').show().end().
        find('.input-delete').val(1);
    });

    $('.photo-container .photo-action-cancel').click(function(e){
        e.preventDefault();
        var el = $(this).closest('.photo-container-item');
        el.find('.photo-action-cancel').hide().end().
        find('.photo-action-delete').show().end().
        find('.label-delete').hide().end().
        find('.input-delete').val(0);
    });

    $.mask.definitions['~']='[+-]';
    $('.phone-mask').mask('+7(999) 999-99-99');

    $('.input-mask').each(function(){
        $(this).mask($(this).data('mask'));
    });

    $(".select2").css('width','200px').select2({allowClear:true})
        .on('change', function(){
            $(this).closest('form').validate().element($(this));
    });

    $('.date-picker').datepicker({
        autoclose: true,
        todayHighlight: true
    }).next().on(ace.click_event, function(){
        $(this).prev().focus();
    });

    $('.date-timepicker').datetimepicker({autoclose:true, format: 'DD.MM.YYYY H:mm'}).next().on(ace.click_event, function(){
        $(this).prev().focus();
    });



    $('.input-daterange').datepicker({autoclose:true, format: 'dd.mm.yyyy'});

    $('.nestable').nestable();
    $('.sortable .dd-list').sortable();

    $('.check-vision').change(function(){
        $('.vision-group').hide();
        $('.'+$(this).val()+'-group').show();
    });

    $('.spinner').ace_spinner({value:0,min:0,max:20,step:1, btn_up_class:'btn-info' , btn_down_class:'btn-info'})
        .closest('.ace-spinner')
        .on('changed.fu.spinbox', function(){
            //alert($('#spinner1').val())
        });

    var multisortInner = function($form, $item, $id) {
        $item.find('> .dd-list > .dd-item').each(function(){
            $form.append('<input type="hidden" name="ids['+$id+'][]" value="'+$(this).data('id')+'">');
            multisortInner($form, $(this), $(this).data('id'));
        });
    }

    $('.multisort').submit(function(e){
       var $form = $(this);
       $form.find('.dd > .dd-list > .dd-item').each(function(){
          $form.append('<input type="hidden" name="ids[0][]" value="'+$(this).data('id')+'">');
          multisortInner($form, $(this), $(this).data('id'));
       });
       return true;
    });

    if($('.cart').length) {
        var cart_delivery = function() {
            var $cost = parseInt($('.cart').find(':input[name=delivery_id] option:selected').data('price'));
            var $amount = parseInt($('.cart .goods .amount').text());
            $('.cart .goods .delivery').text($cost);
            $('.cart .goods .total').text($cost + $amount);
        }

        $('.cart :input[name=delivery_id]').change(function(){
            cart_delivery();
        });

        cart_delivery();
    }

    $('.show-hidden-option').change(function(){
        if($(this).data('class')) {
            $('.' + $(this).data('class')).hide();
        }
        if($(this).find('option:selected').data('id')) {
            $('#' + $(this).find('option:selected').data('id')).show();
        }
    });

    $(document).on("change", '.dynamic-attributes .select-attribute', function(e) {
        var $block = $(this).closest('.dynamic-attributes');
        var $el = $(this).find('option:selected');
        $block.find('.field').hide();
        if($el.data('type')) {
            if($el.data('type') == 'integer' || $el.data('type') == 'string') {
                $block.find('.field-value').show();
                $block.find('.field-value .input-group-addon').hide();
                if ($el.data('type') == 'integer' && $el.data('unit')) {
                    $block.find('.field-value .input-group-addon').show().text($el.data('unit'));
                }
            } else if($el.data('type') == 'list' && $el.data('list')) {
                var $select = $block.find('.field-values select');
                $select.empty();
                $select.append('<option value="">--Не выбран--</option>');
                $($el.data('list')).each(function(index, value){
                    if($select.data('val') && $select.data('val') == value) {
                        $select.append('<option value="' + value + '" selected>' + value + '</option>');
                    } else {
                        $select.append('<option value="' + value + '">' + value + '</option>');
                    }
                });
                $block.find('.field-values').show();
            }
        }
    });

    if($('.dynamic-attributes .select-attribute').length) {
        $('.dynamic-attributes .select-attribute').each(function(){
            if($(this).val()) {
                $(this).trigger('change');
            }
        });
    }

    $('.nestable-off').change(function() {
        //if($(this).is(':checked')) {
            $('.goods-nestable').toggleClass('nestable');
            $('.nestable').data('uk-nestable', "{maxDepth:0, group:'widgets'}");
        //}
    })


});