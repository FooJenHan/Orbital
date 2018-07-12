from django.shortcuts import render

from django.http import HttpResponse
from .models import Mapping
from .forms import QueryForm

from django.db.models import CharField, Value as V, Q
from django.db.models.functions import Concat

from django.views.generic.base import View
from django.views.generic import TemplateView
from django.template import loader

import re
# Create your views here.

class IndexView(TemplateView):
    template_name = "mainpage/index.html"

    def pu_namelist(self):
        data = Mapping.objects.values_list('pu_name').distinct()
        pu_names = list(map(lambda x: x[0], data))
        pu_names.sort()
        return pu_names

    def nus_prefixes(self):
        data = Mapping.objects.values_list('nus_code')
        prefixes = list(set(map(
            lambda x: re.split("[^a-zA-Z]*" ,x[0])[0], data)
        ))
        prefixes.sort()
        return prefixes

    def post(self, request):
        template = loader.get_template(self.template_name)
        query_general = request.POST.get('general', '')
        pu_name = request.POST.getlist('pu_name')
        pu_prefix = request.POST.getlist('pu_prefix')

        if len(query_general) < 2 and pu_name == [] and pu_prefix == []:
            return HttpResponse(template.render({}, request), \
                content_type='text/html')

        mappings = Mapping.objects.annotate(
            combined=Concat('nus_code', V(' '), 'pu_code', V(' '),
                'pu_title', output_field=CharField()
            )
        )

        mappings = mappings.filter(combined__icontains = query_general.upper())
        if pu_name != []:
            mappings = mappings.filter(pu_name__in = pu_name)
        if pu_prefix != []:
            q_objects = Q()
            for pref in pu_prefix:
                q_objects |= Q(nus_code__contains = pref)
            mappings = mappings.filter(q_objects)

        context = {'mappings': mappings}
        rendered_template = template.render(context, request)
        return HttpResponse(rendered_template, content_type='text/html')

class SearchAjaxSubmitView(IndexView):
    template_name = 'mainpage/results.html'

def mod_list(request):
    return render(request, 'mainpage/mod_list.html')
