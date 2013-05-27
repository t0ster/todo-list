from tastypie.resources import ModelResource
from tastypie.authorization import DjangoAuthorization
from tastypie.authentication import ApiKeyAuthentication

from todo_list.core.models import Entry, TodoList


class EntryResource(ModelResource):
    def get_object_list(self, request):
        return Entry.objects.filter(todo_list__user=request.user)

    def dehydrate(self, bundle):
        if bundle.data['due_date']:
            bundle.data['due_date'] = bundle.data['due_date'].strftime("%Y-%m-%d %H:%M")
        return bundle

    def hydrate(self, bundle):
        bundle.obj.todo_list = TodoList.objects.get(user=bundle.request.user)
        return bundle

    class Meta:
        queryset = Entry.objects.all()
        authorization = DjangoAuthorization()
        authentication = ApiKeyAuthentication()
