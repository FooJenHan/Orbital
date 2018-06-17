from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('mod_list/', views.mod_list, name='mod_list')
]