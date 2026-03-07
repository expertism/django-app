from django.urls import path

from . import views

app_name = 'polls'

urlpatterns = [
    path('polls/',                          views.question_list,    name='polls'),
    path('polls/<int:question_id>/',        views.question_detail,  name='detail'),
    path('polls/<int:question_id>/results/',views.question_results, name='results'),
    path('polls/<int:question_id>/vote/',   views.vote_on_question, name='vote'),
]
