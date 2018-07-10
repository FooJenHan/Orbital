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
        query_name = request.POST.get('pu_name', '')
        query_general = request.POST.get('general', '')

        if query_name == "" and query_general == "":
            return HttpResponse(template.render({}, request), \
                content_type='text/html')

        mappings = Mapping.objects.annotate(
            combined=Concat('nus_code', V(' '), 'pu_name', V(' '),
                'pu_code', V(' '), 'pu_title', output_field=CharField()
            )
        )

        mappings = mappings.filter(pu_name__icontains = query_name.upper())
        mappings = mappings.filter(combined__icontains = query_general.upper())
        context = {'query_name': query_name, 'mappings': mappings}

        rendered_template = template.render(context, request)
        return HttpResponse(rendered_template, content_type='text/html')

class SearchAjaxSubmitView(IndexView):
    template_name = 'mainpage/results.html'

def mod_list(request):
    return render(request, 'mainpage/mod_list.html')
