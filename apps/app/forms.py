from django import forms


class CreateEventForm2(forms.Form):

    # def __init__(self, *args, **kwargs):
    #     username = kwargs.pop('username')
    #     super(CreateEventForm2, self).__init__(*args, **kwargs)
    #     self.fields['calendar_name'].queryset = CalendarList.objects.filter(username=username)

    event_name = forms.CharField(label_suffix='', required=True,
                           widget=forms.TextInput(attrs={
                               "placeholder": "Type your event name",
                               "class": "form-control mb-2",
                               "type": "text",
                               "aria-label": "Type your event name",
                               "aria-describedby": "basic-addon2",
                               "id": "event-name-2"
                           }))

    attendees = forms.CharField(label_suffix='', required=False,
                                widget=forms.TextInput(attrs={
                                    "placeholder": "Enter attendees' e-mail addresses",
                                    "class": "form-control mb-2",
                                    "type": "text",
                                    "data-role": "tagsinput",
                                    "aria-label": "Enter attendees' e-mail addresses",
                                    "aria-describedby": "basic-addon2",
                                    "id": "attendees-2"}
                                ))

    start_date = forms.DateField(label_suffix='', required=True,
                                 widget=forms.DateInput(attrs={
                                     "placeholder": "Enter date e.g. 2021-11-01",
                                     "class": "form-control mb-2",
                                     "type": "date",
                                     "id": "start-date-2"}
                                 ))


class CreateEventForm3(forms.Form):

    event_name = forms.CharField(required=True,
                                 widget=forms.TextInput(attrs={
                                     "class": "form-control",
                                     "id": "event-name-3",
                                     # "readonly": "readonly",
                                     "data-role": "tagsinput",
                                 }))

    attendees = forms.CharField(required=False,
                                widget=forms.TextInput(attrs={
                                    "class": "form-control",
                                    "data-role": "tagsinput",
                                    # "readonly": "readonly",
                                    "id": "attendees-3"}
                                ))

    start_date = forms.DateField(required=True,
                                 widget=forms.DateInput(attrs={
                                     "class": "form-control",
                                     "type": "text",
                                     "data-role": "tagsinput",
                                     "id": "start-date-3"}
                                 ))

