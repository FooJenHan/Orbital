from django import forms

class QueryForm(forms.Form):
		nus_code = forms.CharField(label='', max_length=10, required = False,
			widget=forms.TextInput(attrs={'placeholder': 'Please enter NUS module code'}))
		pu_name = forms.CharField(label='', max_length=100, required = False,
			widget=forms.TextInput(attrs={'placeholder': 'Please enter institution name'}))
		pu_code = forms.CharField(label='', max_length=10, required = False,
			widget=forms.TextInput(attrs={'placeholder': 'Please enter institution\'s module code'}))
		pu_title = forms.CharField(label='', max_length=100, required = False,
			widget=forms.TextInput(attrs={'placeholder': 'Please enter module title'}))