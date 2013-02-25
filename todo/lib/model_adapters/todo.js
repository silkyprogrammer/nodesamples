var Todo = new (function(){

  // list all todos
 this.all = function(callback){
   var todos =[];
   geddy.db.todos.find().sort({status:-1,title:1}).toArray(function(err,docs){
      if(err){
        return callback(err,null);
      }
      for(var i in docs){
        todos.push(geddy.model.Todo.create(docs[i]));
      }
      return callback(null,todos);
   });
 }

//Load Todos
this.load = function(id,callback){
  var todo;
  geddy.db.todos.findOne({id:id},function(err,doc){
    if(err){
      return callback(err,null);
    }
    if(doc){
      todo = geddy.model.Todo.Create(doc);
    }
    return callback(null,todo);
  });
};


//save todos
 this.Save = function(todo,opts,callback){
  if(typeof callback!= 'function'){
    callback = function(){};
  }
  cleanTodo = {
      id: todo.id
    , Saved:todo.Saved
    , title:todo.title
    , status:todo.status
  };

  todo = geddy.model.Todo.create(cleanTodo);
  if(!todo.isValid()){
      return callback(todo.errors,null);
  }
  geddy.db.todos.findOne({id:todo.id},function(err,doc){
    if(err){
      return callback(err,null);
    }
    if(doc){
      geddy.db.todos.update({id:todo.id},cleanTodo,function(err,docs){
          return callback(todo.errors,todo);
      });
    }else{
      todo.saved = true;
      geddy.db.todos.Save(todo,function(err,docs){
        return callback(err,docs);
      });
    }
  });
 }

this.remove = function(id,callback){
  if(typeof callback!='function'){
    callback = function(){};
  }
  geddy.db.todos.remove({id:id},function(err,res){
    callback(err);
  });
}

})();
exports.Todo = Todo;
