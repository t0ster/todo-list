app.TodoListView = Backbone.View.extend({
  el: '#todo_list',
  events: {
    'click #entry-down': 'entryDown',
    'click #entry-up': 'entryUp',
    'click #completed-checkbox': 'toggleComplete',
    'click #add_entry': 'entryAdd',
    'click #entry-delete': 'entryDelete'
  },
  priorityAscSort: false,

  initialize: function(){
    this.todoTable = new BTS.SortableTable({
      el: $('#todoTable'),
      tableClass:'table table-bordered table-hover',
      collection: app.entries,
      col: [
        {"name": "Entry", "field": "text", "editable": true},
        {"name": "Due Date", "field": "due_date", "editable": true},
        {"name": "Priority", "field": "priority", "editable": false}
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
    var self = this;
    this.todoTable.render();
    $(".editable.text").editable();
    $(".editable.due_date").editable({
      type: "datetime",
      format: "yyyy-mm-dd hh:ii"
    });
    $('.editable').on('save', function(e, params) {
        var entry_cid = self._getEntryCidFromEvent(e);
        var entry = app.entries.get(entry_cid);
        var field = $(e.currentTarget).data("field");
        if (moment(params.newValue).isValid())
          params.newValue = moment(params.newValue).format("YYYY-MM-DD HH:mm");
        if (entry.get(field) !== params.newValue) {
          entry.set(field, params.newValue);
          entry.save();
          self.render();
        }
    });
    return this;
  },

  _getEntryCidFromEvent: function(e){
    return $(e.currentTarget).data("cid");
  },

  entryUpDown: function(e, up_or_down){
    var self = this;
    var entry_cid = this._getEntryCidFromEvent(e);
    var entry = app.entries.get(entry_cid);
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
  },

  toggleComplete: function(e){
    var entry = app.entries.get(this._getEntryCidFromEvent(e));
    entry.set('completed', !entry.get('completed'));
    entry.save();
    this.render();
  },

  entryAdd: function(e) {
    var priority = app.entries.last() ? app.entries.last().get("priority") + 1 : 1;
    app.entries.create({"priority": priority});
    this.todoTable.collection.sortBy('priority', true);
    this.render();
  },

  _recalculatePriorities: function(){
    var i = 1;
    app.entries.each(function(entry){
      entry.set('priority', i);
      entry.save();
      i++;
    });
  },

  entryDelete: function(e){
    var entry = app.entries.get(this._getEntryCidFromEvent(e));
    entry.destroy();
    this._recalculatePriorities();
    this.render();
  }
});

app.entries.fetch({success: function(){
  app.todoListView = new app.TodoListView();
}});
