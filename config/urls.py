from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),       # / -> home
    path('', include('polls.urls')),      # /polls/ -> polls
    path('', include('users.urls')),      # /login/, /signup/, /logout/
]
