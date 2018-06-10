from django.shortcuts import render

from django.http import HttpResponse
from .models import Mapping
from .forms import QueryForm
# Create your views here.

def index(request):
		mappings = Mapping.objects.all()

		if request.method == 'GET':
				form = QueryForm(request.GET)
				if form.is_valid():
						# Filter by various criteria
						if form['nus_code'].value():
								mappings = mappings.filter(nus_code = form['nus_code'].value().upper())
						if form['pu_name'].value():
								mappings = mappings.filter(pu_name = form['pu_name'].value().upper())
						if form['pu_code'].value():
								mappings = mappings.filter(pu_code = form['pu_code'].value().upper())
						if form['pu_title'].value():
								mappings = mappings.filter(pu_title = form['pu_title'].value().upper())

		else:
				form = QueryForm()

		return render(request, 'mainpage/index.html', {'mappings':mappings,
				'form':form })