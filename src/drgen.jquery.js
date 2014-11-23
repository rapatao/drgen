/**
 * Created by rapatao on 20/11/2014.
 */
;
(function ($, window, document, undefined) {

    var pluginName = "drgen",
        defaults = {
            data: {},
            prefix: 'drg-tpl',
            separator: '-'
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            this.fillGeneralPageInfo(this.settings.data);
            this.fillData($(this.element), this.settings.prefix, this.settings.data);
        },

        fillData: function (selector, prefix, data) {
            if (data instanceof Array) {
                this.fillArrayData(selector, prefix, data);
            } else {
                if (data instanceof Object) {
                    this.fillObjectData(selector, prefix, data);
                } else {
                    this.fillElement(selector, prefix, data);
                }
            }
        },

        fillObjectData: function (selector, prefix, data) {
            var drg = this;
            $.each(data, function (key, value) {
                var newPrefix = prefix + drg.settings.separator + key;
                var element = $('[' + newPrefix + ']');
                drg.fillData(element, newPrefix, value);
            });
        },

        fillArrayData: function (selector, prefix, data) {
            var drg = this;
            var template = $('[' + prefix + ']');
            $.each(data, function (index, value) {
                var element = template.clone();
                drg.fillData(element, prefix, value);
                element.insertBefore(template);
            });
            template.remove();
        },

        fillElement: function (selector, prefix, value) {
            console.log(prefix + ' - ' + value);
            if (selector.is('img')) {
                selector.attr('src', value);
            } else {
                if (selector.is('a')) {
                    selector.attr('href', value);
                } else {
                    selector.text(value);
                }
            }
        },

        fillGeneralPageInfo: function (data) {
            if (data.title != null) {
                document.title = data.title;
            }
        }

    });

    $.fn[ pluginName ] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
        return this;
    };

})(jQuery, window, document);