from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import Question

def polls(request):
    return render(request, "polls/index.html")

def detail(request, question_id):
    question = Question.objects.get(pk=question_id)
    return render(request, "polls/detail.html", {"question": question})


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)


# Create your views here.
