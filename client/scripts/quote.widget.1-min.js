QuoteHelper = {
  quoteChangeScheduler: null, quoteIndex: -1, showQuote: function () {
    this.quoteIndex = -1;
    this.reDrawQuote()
  }, isDaily: function () {
    return "daily" === quoteSettings.wixUi.updateTimeP.value
  }, isHourly: function () {
    return "hourly" === quoteSettings.wixUi.updateTimeP.value
  }, findPeriodicQuote: function () {
    var b = QuoteHelper.isDaily() ? new Date(new Date().getTime() - deltaTime).getUTCDate() : new Date(new Date().getTime() - deltaTime).getUTCHours();
    for (var a = 0; a < quotes.length; a++) {
      if (quotes[a].p == b) {
        return quotes[a]
      }
    }
    return (0 == QuoteHelper.quoteIndex) ? quotes[0] : null
  }, reDrawQuote: function () {
    QuoteHelper.quoteChangeScheduler = null;
    QuoteHelper.quoteIndex = QuoteHelper.quoteIndex + 1;
    if (QuoteHelper.isDaily() || QuoteHelper.isHourly()) {
      QuoteHelper.quote = QuoteHelper.findPeriodicQuote();
      if (!QuoteHelper.quote) {
        QuoteHelper.loadQuotes();
        return
      }
    } else {
      if (QuoteHelper.quoteIndex >= quotes.length) {
        QuoteHelper.loadQuotes();
        return
      }
      QuoteHelper.quote = quotes[QuoteHelper.quoteIndex]
    }
    $("#widgetBody").fadeOut(1500, function () {
      $("#quoteText").text(QuoteHelper.quote.q);
      $("#quoteAuthor").text(QuoteHelper.quote.a);
      QoutesUtilHelper.showWidget(false);
      QoutesUtilHelper.updateHeight();
      QoutesUtilHelper.showWidget(true);
      $("#widgetBody").fadeIn(1500, function () {
        QuoteHelper.scheduleQuoteChange()
      })
    })
  }, getQuoteUpdateTime: function () {
    if (this.isDaily()) {
      var a = new Date();
      a.setHours(23, 59, 59, 999);
      res = a.getTime() - new Date().getTime() + 2000;
      return res
    } else {
      if (this.isHourly()) {
        var a = new Date();
        a.setMinutes(59, 59, 999);
        res = a.getTime() - new Date().getTime() + 2000;
        return res
      } else {
        return quoteSettings.wixUi.updateTimeP.value * 1
      }
    }
  }, scheduleQuoteChange: function () {
    if (!this.quoteChangeScheduler) {
      this.quoteChangeScheduler = setTimeout("QuoteHelper.reDrawQuote()", QuoteHelper.getQuoteUpdateTime())
    }
  }, loadQuotes: function () {
    if (!needUpdate) {
      QuoteHelper.showQuote();
      return
    }
    $.ajax({
      type: "post",
      url: "/app/getquotespack",
      dataType: "json",
      contentType: "application/json; chatset=UTF-8",
      data: JSON.stringify({instance: instanceVar, compId: Wix.Utils.getCompId()}),
      cache: false,
      success: function (a) {
        quotes = a;
        QuoteHelper.showQuote()
      },
      error: function (a) {
        console.error("error load quotes with message " + a.responseText)
      }
    })
  }
};
SettingsHelper = {
  applySettings: function () {
    QoutesUtilHelper.changeWidgetSize();
    var a = 20 + "px";
    $("#widgetBody").css({
      "border-width": 200 + "px",
      "border-style": "solid",
      "-moz-border-radius": a + " " + a + " " + a + " " + a,
      "-webkit-border-radius": a + " " + a + " " + a + " " + a,
      "border-radius": a + " " + a + " " + a + " " + a
    });
    if (quoteSettings.wixUi.bgTransparent) {
      $("#widgetBody").removeClass("bodyBack").addClass("bodyBackTransparent")
    } else {
      $("#widgetBody").removeClass("bodyBackTransparent").addClass("bodyBack")
    }
    a = null
  }
};
QoutesUtilHelper = {
  timer: null,
  changeWidgetSize: function () {
    console.log('bordersize', quoteSettings.wixUi.borderSize);
    var a = quoteSettings.wixUi.borderSize * 2;
    console.log('width', $(window).width(), 'height', $(window).height());
    //$("#widgetBody").css({width: $(window).width() - a, height: $(window).height() - a});
    a = null;
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(QoutesUtilHelper.updateHeight, 500)
  },
  hasScrollBar: function (a) {
    return $("#" + a).get(0).scrollHeight > $("#" + a).height()
  },
  updateHeight: function () {
    var a = $("#quoteContent").height();
    $("#widgetBody").height(a + 10);
    Wix.setHeight(a + 10 + quoteSettings.wixUi.borderSize * 2);
    a = null
  }, showWidget: function (a) {
    if (a) {
      $("#widgetBody").css({opacity: "", display: "none"})
    } else {
      $("#widgetBody").css({opacity: 0, display: ""})
    }
  }
};
$(document).ready(function () {
  window.onresize = function () {
    QoutesUtilHelper.changeWidgetSize()
  };
  SettingsHelper.applySettings();
  QuoteHelper.showQuote()
});
