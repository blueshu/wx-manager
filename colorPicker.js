/**
 * Created by Kevin on 2017/7/31.
 */
(function($) {
    jQuery.fn.farbtastic = function (opts) {
        $.farbtastic(this, opts);
        return this;
    };

    jQuery.farbtastic = function (container, opts) {
        var container = $(container).get(0);
        if(container) {
            return container.farbtastic || (container.farbtastic = new jQuery._farbtastic(container, opts));
        }
    }

    jQuery._farbtastic = function (container, opts) {
        // Store farbtastic object
        var callback = opts.callback,
            defaultColor = opts.color || '#000000',
            fb = this,
            nonImgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTlEMTExMDMyOTBFMTFFNUEzQzQ5OURDQTcxNjAzM0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTlEMTExMDQyOTBFMTFFNUEzQzQ5OURDQTcxNjAzM0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOUQxMTEwMTI5MEUxMUU1QTNDNDk5RENBNzE2MDMzRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOUQxMTEwMjI5MEUxMUU1QTNDNDk5RENBNzE2MDMzRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgAPtH0AAAFmSURBVHja7JXBSgJBGMdXV9fVi+BF6RG8RJCn3qHu9R5evAmFL5AvYF4U8hZ08h4i2M3ATtEhIUxdoy369U2RRLSzs1JQ0P80e5jfb2a+mW9jgPWTif15gaUEOgmOs0MyeUQmc0Ui8SBjT8aX2PahfG/pmK/cIIGANkinzykWp9TrMByC58FkAoMB1GpPFAozUqlTmb0WSSCr2xb4jEbjGV18H6rVR9nJnRD2jASy8k05gjm9HkbpdCCbRebdCqWgFaCK7roXtFrm8Hwe+n2oVHyp17FeYNu7lErTyHCVxQJyubnsZD1Y4LonNJvR4e8pl33i8f1ggePMGY9Xg6t0u0j9zr4UyDAtt8FfGa4yGinB9WqCMHiYQHtEJvCwIwossincqMifr2kU+Ns19fTX9ONDiwJXMXloy1bhOPeyGnN4u40s7Ca0VSwllnUgXdIzbnauO1bd9/e06+/84cT+f/pheRFgANRsojPagvn9AAAAAElFTkSuQmCC',
            aColor = ['rgb(255, 255, 255)','rgb(229, 229, 229)','rgb(204, 204, 204)','rgb(153, 153, 153)','rgb(128, 128, 128)','rgb(102, 102, 102)','rgb(51, 51, 51)','rgb(34, 34, 34)','rgb(0, 0, 0)','rgb(229, 184, 174)','rgb(243, 204, 203)','rgb(252, 229, 203)','rgb(255, 241, 202)','rgb(217, 233, 210)','rgb(192, 248, 241)','rgb(208, 224, 228)','rgb(207, 226, 244)','rgb(217, 210, 234)','rgb(234, 209, 220)','rgb(151, 18, 0)','rgb(253, 37, 0)','rgb(254, 153, 0)','rgb(255, 251, 0)','rgb(45, 249, 0)','rgb(38, 252, 207)','rgb(36, 253, 255)','rgb(4, 51, 255)','rgb(150, 55, 255)','rgb(252, 64, 255)','rgb(165, 32, 0)','rgb(202, 27, 0)','rgb(229, 145, 42)','rgb(241, 192, 10)','rgb(108, 166, 71)','rgb(25, 163, 145)','rgb(70, 129, 143)','rgb(61, 134, 201)','rgb(102, 82, 170)','rgb(165, 79, 122)','rgb(90, 16, 0)','rgb(101, 8, 0)','rgb(119, 63, 0)','rgb(127, 95, 0)','rgb(41, 77, 9)','rgb(10, 115, 102)','rgb(13, 52, 62)','rgb(7, 56, 101)','rgb(30, 21, 79)','rgb(75, 20, 49)'];

        fb.rgbToHex = function(rgb) {
            rgb = rgb.replace('rgb(','').replace(')','').split(',');
            var hexCode= '#';

            for(var i = 0; i< rgb.length ; i++){
                var num = parseInt(rgb[i],10),
                    c = '0123456789ABCDEF',
                    b = '',
                    a = num % 16;
                b = c.substr(a,1);
                a = (num - a)/16;
                hexCode += c.substr(a,1)+b;
            }
            return hexCode;
        }

        // Insert markup
        defaultColor = defaultColor.toUpperCase();
        var sdefaultColor = defaultColor;
        var innerHtml = '<div class="wk-colorpicker"><div class="wk-colorpicker-color-list">';
        if(defaultColor == 'RGBA(255,255,255,0)'){
            innerHtml += '<div class="color-box active" style="background-color: rgb(255, 255, 255);"><img src="'+nonImgData+'" ></div>';
            sdefaultColor = '无';
        }
        else {
            innerHtml += '<div class="color-box" style="background-color: rgb(255, 255, 255);"><img src="'+nonImgData+'" ></div>';
        }

        for(var i = 0,len = aColor.length; i < len; i++) {
            var activeStr = defaultColor == fb.rgbToHex(aColor[i]) ? 'active':'';
            innerHtml += '<div class="color-box '+activeStr+'" style="background-color: '+aColor[i]+'"></div>';
        }
        innerHtml += '</div>'
        var moreColorHtml = '<div class="wk-more-color"><span>更多颜色</span><div class="u-iphone-switch switch-bg"><div class="switch-btn"></div></div></div>';
        var farbtasticHtml = '<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>';
        var resHtml = '<div class="color-input"><div id="cpColor" class="bg-color-show" style="background-color: '+defaultColor+'"></div><div class="bg-des-show"><input type="text" value="'+sdefaultColor+'" /></div></div></div>';
        //$(container).html(innerHtml+''+moreColorHtml+''+farbtasticHtml+''+resHtml+'</div>');
        $(container).html(farbtasticHtml);

        var e = $('.farbtastic', container);
        fb.wheel = $('.wheel', container).get(0);
        // Dimensions
        fb.radius = 84;
        fb.square = 100;
        fb.width = 194;
        $('.wk-color-picker-con').unbind('click').bind('click', function () {
            return false;
        });

        $('.bg-des-show').find('input').bind('keyup',function () {
            var val = $.trim($(this).val());
            var sC = fb.colorHex(val);
            if(sC) {
                fb.setColor(sC);
                $('.bg-color-show').css('background-color',fb.color);
                $('.bg-des-show').find('input').val(fb.color);
            }
        });

        // Fix background PNGs in IE6
        if (navigator.appVersion.match(/MSIE [0-6]\./)) {
            $('*', e).each(function () {
                if (this.currentStyle.backgroundImage != 'none') {
                    var image = this.currentStyle.backgroundImage;
                    image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
                    $(this).css({
                        'backgroundImage': 'none',
                        'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
                    });
                }
            });
        }

        /**
         * Link to the given element(s) or callback.
         */
        fb.linkTo = function (callback) {
            // Unbind previous nodes
            if (typeof fb.callback == 'object') {
                $(fb.callback).unbind('keyup', fb.updateValue);
            }

            // Reset color
            fb.color = null;

            // Bind callback or elements
            if (typeof callback == 'function') {
                fb.callback = callback;
            }
            else if (typeof callback == 'object' || typeof callback == 'string') {
                fb.callback = $(callback);
                fb.callback.bind('keyup', fb.updateValue);
                if (fb.callback.get(0).value) {
                    fb.setColor(fb.callback.get(0).value);
                }
            }
            return this;
        }
        fb.updateValue = function (event) {
            if (this.value && this.value != fb.color) {
                fb.setColor(this.value);
            }
        }

        /**
         * Change color with HTML syntax #123456
         */
        fb.setColor = function (color) {
            var unpack = fb.unpack(color);
            if (fb.color != color && unpack) {
                fb.color = color;
                fb.rgb = unpack;
                fb.hsl = fb.RGBToHSL(fb.rgb);
                fb.updateDisplay();
            }
            return this;
        }

        /**
         * Change color with HSL triplet [0..1, 0..1, 0..1]
         */
        fb.setHSL = function (hsl) {
            fb.hsl = hsl;
            fb.rgb = fb.HSLToRGB(hsl);
            fb.color = fb.pack(fb.rgb);
            fb.updateDisplay();
            return this;
        }

        /////////////////////////////////////////////////////

        /**
         * Retrieve the coordinates of the given event relative to the center
         * of the widget.
         */
        fb.widgetCoords = function (event) {
            var x, y;
            var el = event.target || event.srcElement;
            var reference = fb.wheel;

            if (typeof event.offsetX != 'undefined') {
                // Use offset coordinates and find common offsetParent
                var pos = { x: event.offsetX, y: event.offsetY };

                // Send the coordinates upwards through the offsetParent chain.
                var e = el;
                while (e) {
                    e.mouseX = pos.x;
                    e.mouseY = pos.y;
                    pos.x += e.offsetLeft;
                    pos.y += e.offsetTop;
                    e = e.offsetParent;
                }

                // Look for the coordinates starting from the wheel widget.
                var e = reference;
                var offset = { x: 0, y: 0 }
                while (e) {
                    if (typeof e.mouseX != 'undefined') {
                        x = e.mouseX - offset.x;
                        y = e.mouseY - offset.y;
                        break;
                    }
                    offset.x += e.offsetLeft;
                    offset.y += e.offsetTop;
                    e = e.offsetParent;
                }

                // Reset stored coordinates
                e = el;
                while (e) {
                    e.mouseX = undefined;
                    e.mouseY = undefined;
                    e = e.offsetParent;
                }
            }
            else {
                // Use absolute coordinates
                var pos = fb.absolutePosition(reference);
                x = (event.pageX || 0*(event.clientX + $('html').get(0).scrollLeft)) - pos.x;
                y = (event.pageY || 0*(event.clientY + $('html').get(0).scrollTop)) - pos.y;
            }
            // Subtract distance to middle
            return { x: x - fb.width / 2, y: y - fb.width / 2 };
        }

        /**
         * Mousedown handler
         */
        fb.mousedown = function (event) {
            // Capture mouse
            if (!document.dragging) {
                $(document).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
                document.dragging = true;
            }

            // Check which area is being dragged
            var pos = fb.widgetCoords(event);
            fb.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > fb.square;

            // Process
            fb.mousemove(event);
            return false;
        }

        fb.pack = function (rgb) {
            var r = Math.round(rgb[0] * 255);
            var g = Math.round(rgb[1] * 255);
            var b = Math.round(rgb[2] * 255);
            return '#' + (r < 16 ? '0' : '') + r.toString(16) +
                (g < 16 ? '0' : '') + g.toString(16) +
                (b < 16 ? '0' : '') + b.toString(16);
        }

        /**
         * Mousemove handler
         */
        fb.mousemove = function (event) {
            // Get coordinates relative to color picker center
            var pos = fb.widgetCoords(event);

            // Set new HSL parameters
            if (fb.circleDrag) {
                var hue = Math.atan2(pos.x, -pos.y) / 6.28;
                if (hue < 0) hue += 1;
                fb.setHSL([hue, fb.hsl[1], fb.hsl[2]]);
            }
            else {
                var sat = Math.max(0, Math.min(1, -(pos.x / fb.square) + .5));
                var lum = Math.max(0, Math.min(1, -(pos.y / fb.square) + .5));
                fb.setHSL([fb.hsl[0], sat, lum]);
            }
            return false;
        }

        /**
         * Mouseup handler
         */
        fb.mouseup = function () {
            // Uncapture mouse
            $(document).unbind('mousemove', fb.mousemove);
            $(document).unbind('mouseup', fb.mouseup);
            document.dragging = false;
        }

        /**
         * Update the markers and styles
         */
        fb.updateDisplay = function () {
            // Markers
            var angle = fb.hsl[0] * 6.28;
            $('.h-marker', e).css({
                left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
                top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
            });

            $('.sl-marker', e).css({
                left: Math.round(fb.square * (.5 - fb.hsl[1]) + fb.width / 2) + 'px',
                top: Math.round(fb.square * (.5 - fb.hsl[2]) + fb.width / 2) + 'px'
            });

            // Saturation/Luminance gradient
            $('.color', e).css('backgroundColor', fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));
            $('.bg-color-show').css('background-color',fb.color);
            $('.bg-des-show').find('input').val(fb.color);
            // Linked elements or callback
            if (typeof fb.callback == 'object') {
                // Set background/foreground color
                $(fb.callback).css({
                    backgroundColor: fb.color,
                    color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
                });

                // Change linked value
                $(fb.callback).each(function() {
                    if (this.value && this.value != fb.color) {
                        this.value = fb.color;
                    }
                });
            }
            else if (typeof fb.callback == 'function') {
                fb.callback.call(fb, fb.color);
            }
        }

        /**
         * Get absolute position of element
         */
        fb.absolutePosition = function (el) {
            var r = { x: el.offsetLeft, y: el.offsetTop };
            // Resolve relative to offsetParent
            if (el.offsetParent) {
                var tmp = fb.absolutePosition(el.offsetParent);
                r.x += tmp.x;
                r.y += tmp.y;
            }
            return r;
        };

        /* Various color utility functions */


        fb.unpack = function (color) {
            if (color.length == 7) {
                return [parseInt('0x' + color.substring(1, 3)) / 255,
                    parseInt('0x' + color.substring(3, 5)) / 255,
                    parseInt('0x' + color.substring(5, 7)) / 255];
            }
            else if (color.length == 4) {
                return [parseInt('0x' + color.substring(1, 2)) / 15,
                    parseInt('0x' + color.substring(2, 3)) / 15,
                    parseInt('0x' + color.substring(3, 4)) / 15];
            }
        }

        fb.HSLToRGB = function (hsl) {
            var m1, m2, r, g, b;
            var h = hsl[0], s = hsl[1], l = hsl[2];
            m2 = (l <= 0.5) ? l * (s + 1) : l + s - l*s;
            m1 = l * 2 - m2;
            return [this.hueToRGB(m1, m2, h+0.33333),
                this.hueToRGB(m1, m2, h),
                this.hueToRGB(m1, m2, h-0.33333)];
        }
        var regC = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        fb.colorHex = function (val) {
            if(regC.test(val)) {
                var aNum = val.replace(/#/, "").split("");
                if (aNum.length === 6) {
                    return val;
                } else if (aNum.length === 3) {
                    var numHex = "#";
                    for (var i = 0; i < aNum.length; i += 1) {
                        numHex += (aNum[i] + aNum[i]);
                    }
                    return numHex;
                }
            }
        };

        fb.hueToRGB = function (m1, m2, h) {
            h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
            if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
            if (h * 2 < 1) return m2;
            if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
            return m1;
        }

        fb.RGBToHSL = function (rgb) {
            var min, max, delta, h, s, l;
            var r = rgb[0], g = rgb[1], b = rgb[2];
            min = Math.min(r, Math.min(g, b));
            max = Math.max(r, Math.max(g, b));
            delta = max - min;
            l = (min + max) / 2;
            s = 0;
            if (l > 0 && l < 1) {
                s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
            }
            h = 0;
            if (delta > 0) {
                if (max == r && max != g) h += (g - b) / delta;
                if (max == g && max != b) h += (2 + (b - r) / delta);
                if (max == b && max != r) h += (4 + (r - g) / delta);
                h /= 6;
            }
            return [h, s, l];
        };

        fb.switch = function (e) {
            var $this = $(this),
                isSelect = $this.hasClass('u-iphone-switch-on');
            $this.toggleClass('u-iphone-switch-on');
            if(isSelect) {
                $('.farbtastic').hide();
            }
            else {
                $('.farbtastic').show();
            }
            e.stopPropagation();
        };
        fb.getFormBox = function (e) {
            var $this = $(this),
                sColor = $this.css('background-color'),
                shex = fb.rgbToHex(sColor);
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            if($this.find('img').length > 0) {
                if(callback && typeof callback == 'function') {
                    callback('RGBA(255,255,255,0)');
                    $('.bg-color-show').css('background-color','RGBA(255,255,255,0)');
                    $('.bg-des-show').find('input').val('无');
                }
            }
            else {
                fb.setColor(shex);
            }
            $this = null;
            e.stopPropagation();
        };

        // Install mousedown handler (the others are set on the document on-demand)
        $('*', e).mousedown(fb.mousedown);
        $('.wk-color-picker-con .u-iphone-switch').click(fb.switch);
        $('.wk-colorpicker-color-list .color-box').click(fb.getFormBox);
        // Init color
        fb.setColor(defaultColor);

        // Set linked elements/callback
        if (callback) {
            fb.linkTo(callback);
        }
        if($('.wk-color-picker-con').length === 1) {
            function callWinDown() {
                if($('.wk-color-picker-con').length === 0) {
                    $(document).unbind('click',callWinDown);
                }
                else if($('.wk-color-picker-con').is(':visible')) {
                    $('.wk-color-picker-con').hide();
                }
            }
            $(document).unbind('click',callWinDown).bind('click',callWinDown);
        }
    }
})(jQuery);
