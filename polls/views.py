import json
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.core import serializers
# from rest_framework import serializers


def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")

    from django.utils import timezone
    # Import the model classes we just wrote.
    from polls.models import Choice, Question

    # Create a new Question.
    # Support for time zones is enabled in the default settings file, so
    # Django expects a datetime with tzinfo for pub_date. Use timezone.now()
    # instead of datetime.datetime.now() and it will do the right thing.
    q = Question(question_text="What's up?", pub_date=timezone.now())
    q.save()

    # result = Question.objects.all()

    # data = serializers.serialize('json', result)
    # return HttpResponse(data, content_type="application/json")

    # Give the Question a couple of Choices. The create call constructs a new
    # Choice object, does the INSERT statement, adds the choice to the set
    # of available choices and returns the new Choice object. Django creates
    # a set to hold the "other side" of a ForeignKey relation
    # (e.g. a question's choice) which can be accessed via the API.

    # Create three choices.
    q.choice_set.create(choice_text='Not much', votes=0)
    q.choice_set.create(choice_text='The sky', votes=0)
    q.choice_set.create(choice_text='Just hacking again', votes=0)

    q = Question(question_text="What is the best dessert?",
                 pub_date=timezone.now())
    q.save()

    # Create three choices.
    q.choice_set.create(choice_text='Chocolate cake', votes=0)
    q.choice_set.create(choice_text='Cheesecake', votes=0)
    q.choice_set.create(choice_text='Ice cream', votes=0)

    # # The API automatically follows relationships as far as you need.
    # # Use double underscores to separate relationships.
    # # This works as many levels deep as you want; there's no limit.
    # # Find all Choices for any question whose pub_date is in this year
    # # (reusing the 'current_year' variable we created above).
    # current_year = timezone.now().year
    # Question.objects.get(pub_date__year=current_year)
    # Choice.objects.filter(question__pub_date__year=current_year)

    result = []
    ques = Question.objects.values()
    for q in ques:
        # choices = Choice.objects.filter(question__id=q['id']).values()
        choices = list(Choice.objects.filter(question__id=q['id']).values())
        result.append({
            "question": q,
            "choices": choices,
        })

    # print('result ',result)
    # data = serializers.serialize('json', result)
    # return HttpResponse(data, content_type="application/json")
    return JsonResponse({'result' : result})


def questions(request):
    from django.utils import timezone
    # Import the model classes we just wrote.
    from polls.models import Choice, Question

    questions = Question.objects.all()

    data = serializers.serialize('json', questions)
    return HttpResponse(data, content_type="application/json")


def choices(request):
    from django.utils import timezone
    # Import the model classes we just wrote.
    from polls.models import Choice, Question

    choices = Choice.objects.all()

    data = serializers.serialize('json', choices)
    return HttpResponse(data, content_type="application/json")


def delete(request):
    from django.utils import timezone
    # Import the model classes we just wrote.
    from polls.models import Choice, Question

    # delete everything
    Question.objects.all().delete()
    Choice.objects.all().delete()

    result = {
        'questions_count': Question.objects.count(),
        'choice_count': Choice.objects.count()
    }
    return JsonResponse(result)
