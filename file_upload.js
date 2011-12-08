(function($) {
  $.fn.file_upload = function(url, options) {
    var settings = $.extend({
      start:    $.noop,
      success:  $.noop,
      fail:     $.noop,
      progress: $.noop
    }, options);

    var _start = function(event) {
      var xhr = event.target;
      settings.start.apply(this, [xhr]);
    }

    var _load = function(event) {
      var xhr = event.target;

      if (xhr.readyState === 4 && xhr.status === 200) {
        settings.success.apply(this, [xhr]);
      } else {
        settings.fail.apply(this, [xhr]);
      }
    };

    var _progress = function(event) {
      settings.progress.apply(this, [event.loaded, event.total, event]);
    }

    return this.each(function() {
      var xhr = new XMLHttpRequest();
      var form_data = new FormData();

      form_data.append(this.id, this.files[0]);
      xhr.upload.addEventListener('progress', $.proxy(_progress, this), false);
      xhr.addEventListener('load', $.proxy(_load, this), false);
      xhr.addEventListener('loadstart', $.proxy(_start, this), false);

      xhr.open('POST', url, true);
      xhr.send(form_data);
    });
  };
})(jQuery);
