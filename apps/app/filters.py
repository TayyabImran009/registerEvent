import django_filters
from .models import *

class CalendarEventsFilter(django_filters.FilterSet):
    class Meta:
        model = CalendarEvents
        fields = '__all__'