from django.contrib import admin
from django.contrib.auth.models import Group
admin.site.unregister(Group)

from .models import Mapping
# Register your models here.

class MappingAdmin(admin.ModelAdmin):
		list_display = ('nus_code', 'nus_credits', 'pu_name', 'pu_code',
				'pu_title', 'pu_credits', 'created_at', 'updated_at')
		list_filter = ['nus_code']
		search_fields = ['nus_code', 'pu_name', 'pu_code', 'pu_title']


admin.site.register(Mapping, MappingAdmin)