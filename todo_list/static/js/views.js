app.TodoListView = Backbone.View.extend({
  el: '#todo_list',
  template: _.template($('#todolist-template').html()),
  events: {
    'click #entry-down': 'entryDown',
    'click #entry-up': 'entryUp'
  },
  priorityAscSort: false,

  initialize: function(){
    // entries =
    this.todoTable = new BTS.SortableTable({
      el: $('#todoTable'),
      tableClass:'table table-bordered table-hover',
      collection: app.entries,
      col: [
        {"name": "Entry", "field": "text"},
        {"name": "Due Date", "field": "due_date"},
        {"name": "Priority", "field": "priority"}
      ]
    });

    var self = this;
    app.entries.on("sort", function(e){
      if (e.sortByMe === "priority") {
        self.priorityAscSort = !self.priorityAscSort;
      }
    });
    this.render();
    this.todoTable.collection.sortBy('priority', true);
  },

  render: function(){
    this.todoTable.render();
    return this;
  },

  _getEntryCidFromEvent: function(e){
    return $(e.currentTarget).data("cid");
  },

  entryUpDown: function(e, up_or_down){
    var self = this;
    entry_cid = this._getEntryCidFromEvent(e);
    entry = app.entries.get(entry_cid);
    var sortFunc = function() {
      result = up_or_down === "down";
      if (!self.priorityAscSort)
        result = !result;
      return result;
    };
    next_entry = app.entries.findWhere({priority: entry.get('priority') + (sortFunc() ? 1 : -1)});
    if (!next_entry)
      return;
    next_entry.set('priority', next_entry.get('priority') - (sortFunc() ? 1 : -1));
    entry.set('priority', entry.get('priority') + (sortFunc() ? 1 : -1));
    entry.save();
    next_entry.save();
    app.entries.sort({silent: true});
    this.render();
  },

  entryDown: function(e){
    this.entryUpDown(e, "down");
  },

  entryUp: function(e){
    this.entryUpDown(e, "up");
  }
});

app.entries.fetch({success: function(){
  app.todoListView = new app.TodoListView();
}});
