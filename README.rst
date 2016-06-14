angular-local
=============

Reusable, requirable Angular library.

The modules may be imported using an `import` or `require` syntax.

A better implementation, later, would be to allow various
jquery_angular_shims, namespaced for every app.

The issue is that we cannot easily configure this from the app; code like:

.. code-block:: javascript

    window.__jquery_angular_shim_params__ = {
        'name': 'my_app',
        'restoreAngular': false,
    }

    import angular from 'jquery-angular-shim'

does not work since the resulting Webpack bundle will load the dependencies
before executing line 1. Ideas welcome.

Still, this is now possible:

.. code-block:: html

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Holysheets</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.js"></script>
      </head>
      <body>

        <div id="myapplication">
          <div ui-view=""></div>
        </div>

      <script src="bundle.js"></script>
      <script>
          console.log("Here, 'angular' is angular 1.2")
          angular.element(document).ready(function() {

            var item = document.getElementById('myapplication')
            var appNg = window.__jquery_angular_shim__.angular

            console.log("And here, it's the one from myapplication")
            appNg.bootstrap(item, ['myapplication']);
          });
      </script>
      </body>
    </html>

`jquery-angular-shim` will save any original AngularJS instance inside
`window.__jquery_angular_shim__.originalAngular`

You can restore it at the end of your bundle in order not to bother the
rest of the host webpage too much.

Finally, due to the extremely "global" nature of AngularJS v1, it's advised
to edit your webpack configuration as such::

  {
    resolve: {
      alias: {
        'angular': 'jquery-angular-shim', // Make sure EVERY require to angular gets resolved to that one.
      }
    }
  }

