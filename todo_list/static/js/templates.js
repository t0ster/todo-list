(function(){

  var BTS;
  if(typeof this.BTS === 'undefined'){
    BTS = this.BTS = {};
  }else{
    BTS = this.BTS;
  }

  BTS.templates = {
    'sortable-table': '<thead></thead><tbody></tbody>',

    'sortable-table-head': '<tr>\
      <th>Completed</th>\
      {{#col}}<th {{#className}}class="{{className}}"{{/className}} data-field="{{field}}">{{name}} <i class="js-sort-sprite"></i></th>{{/col}}\
      <th></th></tr>',

    'sortable-table-row':'<td><input data-cid="{{col.0.cid}}" id="completed-checkbox" type="checkbox" {{#model.completed}}checked="true"{{/model.completed}}></td>{{#col}}<td class="{{className}} {{#model.completed}}disabled{{/model.completed}}">{{#editable}}<a href="#" class="editable {{field}}" data-field="{{field}}" data-cid="{{cid}}">{{text}}{{{html}}}</a>{{/editable}}{{^editable}}{{text}}{{{html}}}{{/editable}}</td>{{/col}}<td>\
                <div class="btn-toolbar">\
                  <div class="btn-group">\
                    <a data-cid="{{col.0.cid}}" id="entry-down" class="btn" href="#"><i class="icon-arrow-down"></i></a>\
                    <a data-cid="{{col.0.cid}}" id="entry-up" class="btn" href="#"><i class="icon-arrow-up"></i></a>\
                    <a data-cid="{{col.0.cid}}" id="entry-delete" class="btn" href="#"><i class="icon-trash"></i></a>\
                  </div>\
                </div>\
              </td>'
  };

}.call(this));