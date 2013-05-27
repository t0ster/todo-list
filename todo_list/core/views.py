from django.views.generic import TemplateView, FormView, RedirectView
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit
from tastypie.models import ApiKey


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        if self.errors:
            return self.cleaned_data

        username = self.cleaned_data["username"]
        password = self.cleaned_data["password"]

        user = authenticate(username=username, password=password)
        if not user:
            raise forms.ValidationError("Invalid username or password")

        self.cleaned_data["user"] = user
        return self.cleaned_data


class LoginView(FormView):
    template_name = "login.html"
    form_class = LoginForm
    success_url = '/'

    def form_valid(self, form):
        user = form.cleaned_data["user"]
        if user.is_active:
            login(self.request, user)
        return super(LoginView, self).form_valid(form)


class LogoutView(RedirectView):
    url = "/"

    def get(self, request, *args, **kwargs):
        logout(self.request)
        return super(LogoutView, self).get(request, *args, **kwargs)


class IndexView(TemplateView):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        return {
            "tastypie_username": self.request.user.username,
            "tastypie_key": ApiKey.objects.get(user=self.request.user).key
        }

    template_name = "index.html"
