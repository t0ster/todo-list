from tastypie.resources import ModelResource
from todo_list.core.models import Entry
from tastypie.authorization import DjangoAuthorization


class EntryResource(ModelResource):
    def get_object_list(self, request):
        return Entry.objects.filter(todo_list__user=request.user)

    class Meta:
        queryset = Entry.objects.all()
        authorization = DjangoAuthorization()
