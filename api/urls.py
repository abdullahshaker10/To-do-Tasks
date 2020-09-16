from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskList.as_view(), name="task-list"),
    path('tasks/create/', views.TaskCreate.as_view(), name="task-create"),
    path('tasks/update/<int:id>',
         views.TaskUpdate.as_view(), name="task-update"),
    path('tasks/delete/<int:id>',
         views.TaskDelete.as_view(), name="task-delete"),



]
