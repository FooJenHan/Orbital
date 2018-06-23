from django.db import models
from django.utils import timezone
from django.db import IntegrityError, transaction


# Create your models here.
class Mapping(models.Model):
    nus_code = models.CharField(max_length=200)
    nus_credits = models.FloatField()
    pu_name = models.CharField(max_length=200)
    pu_code = models.CharField(max_length=200)
    pu_title = models.CharField(max_length=200)
    pu_credits = models.FloatField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
    	return self.nus_code

    def save(self, **kwargs):
        self.nus_code = self.nus_code.upper()
        self.pu_name = self.pu_name.upper()
        self.pu_code = self.pu_code.upper()
        self.pu_title = self.pu_title.upper()
        try:
            with transaction.atomic():
                super(Mapping,self).save()
        except IntegrityError:
            pass

    class Meta:
        unique_together = (('nus_code', 'nus_credits', 'pu_name', 'pu_code',
            'pu_title', 'pu_credits'),)

"""
Format:
Mapping(nus_code = "", nus_credits = 0, pu_name = "", pu_code = "",
    pu_title = "", pu_credits = 0)
Note that created_at and updated_at should not be modified manually (read-only)

Creation using API in Shell:

from mainpage.models import Mapping
Mapping.objects.all()

Mapping(nus_code = "MA1100", nus_credits = 4.0, pu_name = "school2", 
	pu_code = "MATH101", pu_title = "Basic Math", pu_credits = 3.0)

"""	