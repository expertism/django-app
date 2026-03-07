from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Question


@login_required
def question_list(request):
    questions = Question.objects.all()
    return render(request, "polls/index.html", {"questions": questions})


@login_required
def question_detail(request, question_id):
    question = Question.objects.get(pk=question_id)
    return render(request, "polls/detail.html", {"question": question})


@login_required
def question_results(request, question_id):
    return HttpResponse("You're looking at the results of question %s." % question_id)


@login_required
def vote_on_question(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
