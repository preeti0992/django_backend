import json
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .serializers import TodoSerializer
from django.views import View

from .models import Todo


def index(request):
    return HttpResponse("Hello, this is the empty start page.")


class TodoAPIView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def get (self, request):
        queryset = Todo.objects.values()
        return JsonResponse({'result' : queryset})
