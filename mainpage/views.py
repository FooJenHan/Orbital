from django.shortcuts import render

from django.http import HttpResponse
from .models import Mapping
from .forms import QueryForm

from django.db.models import CharField, Value as V
from django.db.models.functions import Concat

from django.views.generic.base import View
from django.template import loader
# Create your views here.


def index(request):

		mappings = Mapping.objects.annotate(
			combined=Concat('nus_code', V(' '), 'pu_name', V(' '), 'pu_code', V(' '), 'pu_title',
				output_field=CharField()
				)
			)

		if request.method == 'GET':
			form = QueryForm(request.GET)
			if form.is_valid():
				if form['general'].value():
					mappings = mappings.filter(combined__icontains = form['general'].value())
				if form['pu_name'].value():
					mappings = mappings.filter(pu_name__icontains = form['pu_name'].value())
					
		else:
			form = QueryForm()

		return render(request, 'mainpage/index.html', {'mappings':mappings, 
				'form':form })



def mod_list(request):
	return render(request, 'mainpage/mod_list.html')






