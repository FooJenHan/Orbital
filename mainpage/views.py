from django.shortcuts import render

from django.http import HttpResponse
from .models import Mapping
from .forms import QueryForm

from django.db.models import CharField, Value as V
from django.db.models.functions import Concat

from django.views.generic.base import View
from django.views.generic import TemplateView
from django.template import loader
# Create your views here.

class IndexView(TemplateView):
    template_name = "mainpage/index.html"

    def post(self, request):
        template = loader.get_template(self.template_name)
        query = request.POST.get('search', '')

        mappings = Mapping.objects.filter(pu_name__icontains = query.upper())
        context = {'query': query, 'mappings': mappings}

        rendered_template = template.render(context, request)
        return HttpResponse(rendered_template, content_type='text/html')

class SearchAjaxSubmitView(IndexView):
    template_name = 'mainpage/results.html'

def mod_list(request):
    return render(request, 'mainpage/mod_list.html')
