from django.shortcuts import render

from django.http import HttpResponse
from .models import Mapping
# Create your views here.

"""
def index(request):
    return HttpResponse("Hello, world. You're at the mainpage index.")
"""

def index(request):
		query = Mapping.objects.all()
		return render(request, 'mainpage/index.html', {'query':query})