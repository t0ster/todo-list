Entries = BTS.SortableList.extend({
  model: app.Entry,
  urlRoot: '/api/entry'
});

app.entries = new Entries();
