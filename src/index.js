function load () {
  if (!window.__jquery_angular_shim__) {
    // avoid conflicts; keep old angular and jQuery references.
    var originalJQuery = window.jQuery
    var originalAngular = window.angular

    var jQuery = require('jquery')
    window.jQuery = jQuery                // needed by some libraries, we do not want to explicitly require jQuery
    window.angular = null                 // trick angular into loading itself and not just return the global one.
    var angular = require('angular')
    window.__jquery_angular_shim__ = {
      jquery: jQuery,
      angular: angular,
      originalAngular: originalAngular,
      originalJQuery: originalJQuery,
    }
  }
  return window.__jquery_angular_shim__.angular
}


module.exports = load()
