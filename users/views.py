from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib import messages
from .forms import SignUpForm


def logout_user(request):
    logout(request)
    messages.success(request, "You've been logged out.")
    return redirect('home:home')


def signup_user(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, f"Account created! Welcome!")
            return redirect('home:home')
    else:
        form = SignUpForm()
    return render(request, 'users/signup.html', {'form': form})
