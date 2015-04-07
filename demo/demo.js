'use strict';

$(document).on('ready', function (e) {
  var $pNav = $('#product-nav')
  var $window = $(window)
  var $body = $('body')
  var pNavTopPosition = $('#product-nav').offset().top

  var sectDemoPos = $('#section-demo').position().top
  var sectHighlightsPos = $('#section-highlights').offset().top
  var sectExamplesPos = $('#section-examples').offset().top
  var sectApiPos = $('#section-api').offset().top
  var sectContributePos = $('#section-contribute').offset().top
  var sectGithubPos = $('#section-github').offset().top
  var windowScrollPrevPos
  var windowScrollPos
  var downCounter = 0
  var upCounter = 0
  var pageVersion = 1

  if ($body.hasClass('version2')) {
    pageVersion = 2
  }

  // nope
  $('iframe').on('scroll', function (e) {
    console.log(e)
    e.preventDefault()
    e.stopImmedatePropagation()
  })

  $window.on('scroll', function (e) {
    windowScrollPrevPos = windowScrollPos
    windowScrollPos = $window.scrollTop()

    if (windowScrollPrevPos > windowScrollPos && windowScrollPos > 300) {
      // scrolling up
      downCounter = 0
      upCounter++
    } else  {
      // scrolling down
      upCounter = 0
      downCounter++
    }

    if (pageVersion == 2 || pageVersion == 3) {
      if (windowScrollPos > 260) {
        $('.product-nav').addClass('show-product-logo')
      } else {
        $('.product-nav').removeClass('show-product-logo')
      }
    }

    // TODO: clear the counters after a certain time has elapsed, if no other scroll action
    // has taken place

    if (upCounter >= 3) {
      if (!$body.hasClass('is-scrolling')) {
        // this eneds to be done better, timing is off
        $body.addClass('fix-main-nav')
        $('nav').addClass('navbar-fixed-top')
      }
    } else if (downCounter >= 1) {
      $body.removeClass('fix-main-nav')
      $('nav').removeClass('navbar-fixed-top')
    }

    //console.log($window.scrollTop())
    if (windowScrollPos >= (pNavTopPosition - 1)) {
      $body.addClass("fix-product-nav");
    } else {
      $body.removeClass("fix-product-nav");
    }

    if (windowScrollPos >= sectGithubPos - 60) {
      $('.top-nav-item').removeClass('active')
      $('#nav-github').addClass('active')
    }
    else if (windowScrollPos >= sectContributePos - 60) {
      $('.top-nav-item').removeClass('active')
      $('#nav-contribute').addClass('active')
    }
    else if (windowScrollPos >= sectApiPos - 60) {
      $('.top-nav-item').removeClass('active')
      $('#nav-api').addClass('active')
    }
    else if (windowScrollPos >= sectExamplesPos - 60) {
      $('.top-nav-item').removeClass('active')
      $('#nav-examples').addClass('active')
    }
    else if (windowScrollPos >= sectHighlightsPos - 60) {
      $('.top-nav-item').removeClass('active')
      $('#nav-highlights').addClass('active')
    } else {
      $('.top-nav-item').removeClass('active')
      $('#nav-demo').addClass('active')
    }

  })

  function momentarilyDisableMainNavReveal () {
    $body.addClass('do-not-reveal-main-nav')
    $body.addClass('is-scrolling')
    window.setTimeout(function () {
      $body.removeClass('do-not-reveal-main-nav')
    }, 500)
  }

  var scrollToSettings = {
    onAfter: function (target) {
      $body.removeClass('is-scrolling')
      // Clear counter here to prevent main nav from fixing
      upCounter = 0
      $('.top-nav-item').removeClass('activated')
    }
  }

  // Clicks
  $('#nav-demo').on('click', function (e) {
    momentarilyDisableMainNavReveal()
    $(this).addClass('activated')
    $(window).scrollTo(sectDemoPos, 250, scrollToSettings);
  })
  $('#nav-highlights').on('click', function (e) {
    momentarilyDisableMainNavReveal()
    $(this).addClass('activated')
    $(window).scrollTo(sectHighlightsPos - 60, 250, scrollToSettings);
  })
  $('#nav-examples').on('click', function (e) {
    momentarilyDisableMainNavReveal()
    $(this).addClass('activated')
    $(window).scrollTo(sectExamplesPos - 60, 250, scrollToSettings);
  })
  $('#nav-api').on('click', function (e) {
    momentarilyDisableMainNavReveal()
    $(this).addClass('activated')
    $(window).scrollTo(sectApiPos - 60, 250, scrollToSettings);
  })
  $('#nav-contribute').on('click', function (e) {
    momentarilyDisableMainNavReveal()
    $(this).addClass('activated')
    $(window).scrollTo(sectContributePos - 60, 250, scrollToSettings);
  })
  $('#nav-github').on('click', function (e) {
    momentarilyDisableMainNavReveal()
    $(this).addClass('activated')
    $(window).scrollTo(sectGithubPos - 60, 250, scrollToSettings);
  })

})