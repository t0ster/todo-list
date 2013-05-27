from django.views.generic import TemplateView, FormView
from django import forms
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit


class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        if self.errors:
            return self.cleaned_data

        email = self.cleaned_data["email"]
        password = self.cleaned_data["password"]

        user = authenticate(username=email, password=password)
        if not user:
            raise forms.ValidationError("Invalid email or password")

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


class IndexView(TemplateView):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

    template_name = "index.html"
