from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('search/', views.SearchAjaxSubmitView.as_view(), name='search-ajax-submit'),
    path('mod_list/', views.mod_list, name='mod_list'),
]