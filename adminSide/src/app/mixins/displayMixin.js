"use strict";

module.exports = {
  isShow: function() {
    if (!this.$el.css("display") && !this.$el.height() && !this.$el.width()) {
      return false;
    } else if (this.$el.css("display") && this.$el.css("display") == "none") {
      return false;
    } else if (this.$el.css("display") && this.$el.css("display") !== "none") {
      return true;
    }
  },

  show: function() {
    this.$el.show();
  },

  hide: function hide() {
    this.$el.hide();
  }
};

