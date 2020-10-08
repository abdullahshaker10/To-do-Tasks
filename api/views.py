from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from rest_framework.views import APIView
from .models import Task
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView,
CreateAPIView, DestroyAPIView, UpdateAPIView


class TaskList(ListAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all().order_by('-id')


class TaskCreate(CreateAPIView):
    serializer_class = TaskSerializer


class TaskDelete(DestroyAPIView):
    queryset = Task.objects.all()
    lookup_field = 'id'


class TaskUpdate(UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'id'


class TaskRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    lookup_field = 'id'
    queryset = Task.objects.all()
