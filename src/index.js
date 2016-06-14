function load () {
  if (!window.__jquery_angular_shim__) {
    var jQuery = require('jquery')
    var originalAngular = window.angular  // avoid conflicts; keep old angular reference.
    window.angular = null                 // trick angular into loading itself and not just return the global one.
    var angular = require('angular')
    window.__jquery_angular_shim__ = {
      jquery: jQuery,
      angular: angular,
      originalAngular: originalAngular,
    }
  }
  return window.__jquery_angular_shim__.angular
}


module.exports = load()
