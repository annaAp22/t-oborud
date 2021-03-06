@if($analogues->count())
<div class="also-buy">
    <h2 class="total-c-8">Аналоги товара</h2>
    <div id="g-slider-4" class="g-slider-2 sl-wrapper-6">
        <div class="item-wr">
            <div class="items clear-parent sl-wrapper-7">
                @foreach($analogues as $good)
                    @include('catalog.goods.good_simple', ['good' => $good])
                @endforeach
            </div>
        </div>
        @if($analogues->count() > 4)
        <div class="nav-wr">
            <div class="prev btn m-15 ef ch-i tr-1 icon-wr a-c in-19 hv-12">
                <div class="icon sprite-icons n-left-btn-1-h"></div>
                <div class="icon sprite-icons n-left-btn-1"></div>
            </div>
            <div class="next btn m-15 ef ch-i tr-1 icon-wr a-c in-19 hv-12 mirror-x">
                <div class="icon sprite-icons n-left-btn-1-h"></div>
                <div class="icon sprite-icons n-left-btn-1"></div>
            </div>
        </div>
        @endif
    </div>
</div>
@endif