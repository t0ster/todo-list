from django.conf.urls import patterns, include, url
from django.contrib import admin

from todo_list.core.views import LoginView, LogoutView, IndexView
from todo_list.core.api import EntryResource

entry_resource = EntryResource()
admin.autodiscover()


urlpatterns = patterns('',
    url(r'^login/', LoginView.as_view()),
    url(r'^logout/', LogoutView.as_view(), name='logout'),
    (r'^api/', include(entry_resource.urls)),
    url(r'^$', IndexView.as_view()),
    # Examples:
    # url(r'^$', 'todo_list.views.home', name='home'),
    # url(r'^todo_list/', include('todo_list.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
