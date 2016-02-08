(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'json-schema-form',
      templateUrl: 'app/json-schema-form.html',
      //directives: [ng.NgFor],
    })
    .Class({
      constructor: function() {
        this.http = new ng.http.Http();
        this.schema = {};
        this.http.get('../test-hyper-schema.json', new ng.http.BaseRequestOptions())
        .observer({next: (value) => this.schema = value});
      }
    });
})(window.app || (window.app = {}));
