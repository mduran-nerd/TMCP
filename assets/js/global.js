
var NERD = NERD || {};

(function ($, APP){

    $(function(){
        APP.slider.init($('.js-slider'));
    });

    APP.slider = {
        init: function(slider){
            this.$slider = slider;
            this.$inner = this.$slider
                              .find('.slider-inner');
            this.slideCount = this.$inner
                                  .children()
                                  .length;
            this.setInnerWidth();
            this.createControls();
            this.position = 0;
            this.bindEvents();
            this.interval = setInterval(this.autoPlay,5000);
        },
        setInnerWidth: function(){
            this.$inner
                .width(this.slideCount + '00%');
        },
        createControls: function(){
            this.$slider
                .append('<div class="slider-cntrls" />');
            while(this.slideCount > 0) {
                $('.slider-cntrls').append('<span class="slider-cntrl"/>');
                this.slideCount--;
            }
            $('.slider-cntrl:first').addClass('slider-cntrl_isActive');
        },
        toggleActive: function(target){
            $(target).toggleClass('slider-cntrl_isActive')
                     .siblings()
                     .removeClass('slider-cntrl_isActive');
        },
        getPosition: function(target){
            this.position = $(target).index();
        },
        moveSlider: function(marginleft){
            this.$inner
                .css({
                    'margin-left' : '-' + marginleft + '00%'
                });
        },
        bindEvents: function(){
            var self = this;
            $('.slider-cntrl').on('click',function(){
                clearInterval(self.interval);
                self.toggleActive($(this));
                self.getPosition($(this));
                self.moveSlider(self.position);
                self.interval = setInterval(self.autoPlay,5000);
            });
        },
        autoPlay: function(){
            APP.slider.position++;
            if(APP.slider.position == 4) { // TODO -- get APP.slider.slideCount to work
                APP.slider.position = 0;
            }
            APP.slider.toggleActive($('.slider-cntrl:nth-child('+(APP.slider.position + 1)+')'));
            APP.slider.moveSlider(APP.slider.position);
        }
    };

}(jQuery, NERD));