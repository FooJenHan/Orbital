from django.test import TestCase, Client
from django.urls import reverse
from .models import Mapping

# Create your tests here.

class MappingModelTests(TestCase):

	def setUp(self):
		self.obj = Mapping(
				nus_code = "ma1100", 
				nus_credits = 4.0, 
				pu_name = "school2", 
				pu_code = "mAtH101", 
				pu_title = "basic MATH", 
				pu_credits = 3.0
		)
		self.obj.save()
	
	def test_obj_strings_uppercase(self):
		nus_code = self.obj.nus_code == "MA1100"
		pu_name = self.obj.pu_name == "SCHOOL2"
		pu_code = self.obj.pu_code == "MATH101"
		pu_title = self.obj.pu_title == "BASIC MATH"
		bool_test = nus_code and pu_name and pu_code and pu_title
		self.assertIs(bool_test, True)


	def test_obj_created_with_time(self):
		bool_test = False
		if self.obj.created_at and self.obj.updated_at:
				bool_test = True
		self.assertIs(bool_test, True)


class ViewTests(TestCase):

	def setUp(self):
			self.client = Client()

	def test_pages_rendered(self):
			url = reverse("index")
			response = self.client.get(url)
			self.assertEqual(response.status_code, 200)
			self.assertTemplateUsed(response, 'mainpage/index.html')
