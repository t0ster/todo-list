(function(){

  var BTS;
  if(typeof this.BTS === 'undefined'){
    BTS = this.BTS = {};
  }else{
    BTS = this.BTS;
  }

  BTS.templates = {
    'sortable-table': '<thead></thead><tbody></tbody>',

    'sortable-table-head': '<tr>{{#col}}<th {{#className}}class="{{className}}"{{/className}} data-field="{{field}}">{{name}} <i class="js-sort-sprite"></i></th>{{/col}}<th></th></tr>',
    // <tr>
    //   {{#col}}
    //     <th {{#className}}class="{{className}}"{{/className}} data-field="{{field}}">
    //       {{name}} <i class="js-sort-sprite"></i>
    //     </th>
    //   {{/col}}
    //  </tr>
    'sortable-table-row':'{{#col}}<td {{#className}}class="{{className}}"{{/className}}><a href="#" id="wtf" data-type="text" data-pk="1" data-url="/post" data-original-title="Enter username">{{text}}{{{html}}}</a></td>{{/col}}<td>\
                <div class="btn-toolbar">\
                  <div class="btn-group">\
                    <a data-cid="{{col.0.cid}}" id="entry-down" class="btn" href="#"><i class="icon-arrow-down"></i></a>\
                    <a data-cid="{{col.0.cid}}" id="entry-up" class="btn" href="#"><i class="icon-arrow-up"></i></a>\
                    <a data-cid="{{col.0.cid}}" id="entry-up" class="btn" href="#"><i class="icon-trash"></i></a>\
                  </div>\
                </div>\
              </td>',
    // {{#col}}
    //   <td {{#className}}class="{{className}}"{{/className}}>
    //     {{text}}
    //     {{{html}}}
    //   </td>
    // {{/col}}
    'expanded-twitter-row': '<td colspan="{{colspan}}"><h1 style="text-align:center;">{{model.from_user}} is awesome!</h1></td>'
  };


}.call(this));