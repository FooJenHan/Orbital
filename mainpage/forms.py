from django import forms


class QueryForm(forms.Form):
    general = forms.CharField(label='', max_length=100, required = False,
        widget=forms.TextInput(attrs={'placeholder': 'Search by NUS module code, Partner University module code or module title'}))
    pu_name = forms.CharField(label='', max_length=100, required = False,
        widget=forms.TextInput(attrs={'placeholder': 'Please enter institution name'}))

class CsvImportForm(forms.Form):
    csv_file = forms.FileField()