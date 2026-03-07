from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User


class EmailLoginForm(AuthenticationForm):
    """Login form that uses email instead of username."""
    username = forms.EmailField(label='Email')


class SignUpForm(UserCreationForm):
    """Registration form — stores email as the username."""
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(username=email).exists():
            raise forms.ValidationError('An account with this email already exists.')
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.username = self.cleaned_data['email']  # use email as username
        if commit:
            user.save()
        return user
