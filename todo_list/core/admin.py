from django.contrib import admin
from todo_list.core.models import Entry, TodoList


class EntryAdmin(admin.ModelAdmin):
    pass


class TodoListAdmin(admin.ModelAdmin):
    pass


admin.site.register(Entry, EntryAdmin)
admin.site.register(TodoList, TodoListAdmin)
