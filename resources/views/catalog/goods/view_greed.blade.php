<!-- вид:сетка -->
<div class="main_product_list you_viev">
    <ul class="g-item filtr">
        @foreach($goods as $good)
            @include('catalog.goods.good_greed', ['good' => $good])
        @endforeach
   </ul>
    @include('vendor.pagination.default', ['paginator' => $goods])
</div>