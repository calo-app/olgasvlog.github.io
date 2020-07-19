$ = jQuery.noConflict();//Fix

var hour_s = '00';
var minutes_s = 59;
var seconds_s = 59;
$(document).ready(function () {
    act_timer();
    //intialize flickity
    $('.opinions-carousel').flickity({
        cellAlign: 'center',
        adaptiveHeight: true,
        prevNextButtons: false,
        resize: true,
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        autoPlay: 4000,
        wrapAround: true
    });
    $('.gallery-carousel').flickity({
        cellAlign: 'center',
        adaptiveHeight: true,
        prevNextButtons: false,
        resize: true,
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        autoPlay: 4000,
        wrapAround: true,
        pauseAutoPlayOnHover: false
    });
    //scroll to order
    $(document).on('click', '.scroll_to_order', function(event) {
        event.preventDefault();
        var jump = $(this).attr('href');
        var new_position = $(jump).offset();
        $('html, body').stop().animate({ scrollTop: new_position.top }, 500);
    });
    // init Masonry
    var $grid = $('.reviews').masonry({
        itemSelector: '.grid-item',
        olumnWidth: '.grid-sizer',
        percentPosition: true,
        fitWidth: true
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });
    //initialize fluidvids
    fluidvids.init({
        selector: ['iframe'], 
        players: ['www.youtube.com']
    });
    scroll_video();
});

function act_timer() {
    if (!(minutes_s == '00' && seconds_s == '00')) {
        seconds_s--;
        if (seconds_s == -01) {
            seconds_s = 59;
            minutes_s = minutes_s - 1;
        } else minutes_s = minutes_s;
        if (seconds_s <= 9) seconds_s = "0" + seconds_s;
        minutes_sh = minutes_s;
        if (minutes_s < 10) minutes_sh = '0' + minutes_s;
        $('#time ul').html("<li>" + hour_s + "<div class='podp'>ORE</div>" + "</li><li>" + minutes_sh + "<div class='podp'>MINUTI</div>" + "</li><li>" + seconds_s + "<div class='podp'>SECONDI</div>" + "</li>");
        setTimeout("act_timer()", 1000);
    } else {//finish
        $(window).scrollTop($('#order_frame').offset().top);
    }
}

var flag_video = false;
window.onscroll = function() {
    if(!flag_video)
        scroll_video();
}

function scroll_video() {
    var dv = document.getElementById('video');
    var v = document.getElementById('i_video');
    if ((window.scrollY < (dv.offsetTop + dv.offsetHeight)) && ((window.scrollY + window.outerHeight) > dv.offsetTop)) {
        if (v.src=='' || v.src==location.href) {
            v.src='https://www.youtube.com/embed/sObcTMY5kVQ?autoplay=1';
            //initialize fluidvids
            fluidvids.init({
                selector: ['iframe'], 
                players: ['www.youtube.com']
            });
            flag_video = true;
        }
    } else {
        v.src='';
    }
}