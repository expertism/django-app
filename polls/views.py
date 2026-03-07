from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render

from .models import Question


@login_required
def question_list(request):
    questions = Question.objects.all()
    return render(request, 'polls/index.html', {'questions': questions})


@login_required
def question_detail(request, question_id):
    question = Question.objects.get(pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})


@login_required
def question_results(request, question_id):
    return HttpResponse(f"You're looking at the results of question {question_id}.")


@login_required
def vote_on_question(request, question_id):
    return HttpResponse(f"You're voting on question {question_id}.")
