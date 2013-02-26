var Todos = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  //List all Todo's here
  this.index = function (req, resp, params) {
    var self = this;
    geddy.model.adapter.Todo.all(function(err,todos){
      self.respond({params:params,todos:todos});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  //Add or Create Todos here
  this.create = function (req, resp, params) {
    // Save the resource, then display index page
    var self = this
    ,todo = geddy.model.Todo.create({title:params.title,id:geddy.string.uuid(10),status:'open'});
    todo.save(function(err,data){
        if(err){
          params.errors = err;
          self.transfer('add');
        }else{
          self.redirect({controller:self.name});
        }
    });
  };

 this.show = function (req, resp, params) {
    var self = this;
    geddy.model.Todo.load(params.id, function(err,todo){
      self.respond({params:params,todo:todo});
    });
 };

 //Edit Todos here
 this.edit = function (req, resp, params) {
    var self = this;
    geddy.model.Todo.load(params.id,function(err,todo){
      self.respond({params:params,todo:todo});
    });
 };

// Update action
 this.update = function (req, resp, params) {
    var self = this;
    geddy.model.Todo.load(params.id, function(err,todo){
      todo.updateAttributes(params);
      todo.save(function(err,data){
        if(err){
          params.errors = err;
          self.transfer('edit');
        }
        else{
          self.redirect({controller:self.name});
        }
      });
    });
 };

 this.remove = function(req,resp,params){
    var self = this;
    geddy.model.adapter.Todo.remove(params.id, function(err){
      if(err){
        params.errors = err;
        self.transfer('edit');
      }else{
        self.redirect({controller:self.name});
      }
    });
 };
};

exports.Todos = Todos;

