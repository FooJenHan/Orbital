from django import forms


class QueryForm(forms.Form):
	pu_name = forms.CharField(label='', max_length=100, required = False,
		widget=forms.TextInput(attrs={'placeholder': 'Please enter institution name'}))
	general = forms.CharField(label='', max_length=100, required = False,
		widget=forms.TextInput(attrs={'placeholder': 'Enter NUS module code, pu module name, pu module title'}))

class CsvImportForm(forms.Form):
	csv_file = forms.FileField()
				