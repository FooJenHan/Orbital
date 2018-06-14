from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib.auth.models import Group
admin.site.unregister(Group)

import csv
from io import StringIO

from .models import Mapping
from .forms import CsvImportForm
# Register your models here.

class MappingAdmin(admin.ModelAdmin):
		list_display = ('nus_code', 'nus_credits', 'pu_name', 'pu_code',
				'pu_title', 'pu_credits', 'created_at', 'updated_at')
		list_filter = ['nus_code', 'pu_name']
		search_fields = ['nus_code', 'pu_name', 'pu_code', 'pu_title']

		def get_queryset(self, request):
				queryset = super(MappingAdmin, self).get_queryset(request)
				queryset = queryset.order_by('nus_code', 'pu_name')
				return queryset

		# For importing data in .csv file format
		change_list_template = "mainpage/mappings_changelist.html"

		def get_urls(self):
				urls = super().get_urls()
				my_urls = [path('import-csv/', self.import_csv)]
				return my_urls + urls

		def import_csv(self, request):
				if request.method == "POST":
						csv_file = request.FILES["csv_file"]
						csvf = StringIO(csv_file.read().decode())
						reader = csv.reader(csvf)
						# Create Mapping objects from passed in data
						# ...
						for row in reader:
								obj = Mapping(
										nus_code = row[0].upper(), 
										nus_credits = float(row[1]), 
										pu_name = row[2].upper(), 
										pu_code = row[3].upper(),
										pu_title = row[4].upper(), 
										pu_credits = float(row[5])
									)
								try:
										obj.save()
								except Exception:
										pass
								else:
										continue

						self.message_user(request, "Your csv file has been imported")
						return redirect("..")
				form = CsvImportForm()
				payload = {"form": form}
				return render(
						request, "admin/csv_form.html", payload
				)


admin.site.register(Mapping, MappingAdmin)