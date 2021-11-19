from django import template
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.db.models.expressions import Window
from django.db.models.functions import RowNumber
from django.db.models import F, Max
from django.conf import settings
from django.forms import modelformset_factory
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from apps.app.models import RegisterEvents

from apps.app.models import *
from apps.app.forms import *

import os
import requests
import base64
import json


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:
        load_template = request.path.split('/')[-1]

        segment, active_menu = get_segment(request)

        context['segment'] = segment
        context['active_menu'] = active_menu

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template

        html_template = loader.get_template(load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('page-500.html')
        return HttpResponse(html_template.render(context, request))


# Helper - Extract current page name from request
def get_segment(request):
    try:
        segment = request.path.split('/')[-1]
        active_menu = None

        if segment == '' or segment == 'index.html':
            segment = 'index'
            active_menu = 'dashboard'

        if segment.startswith('dashboard-'):
            active_menu = 'dashboard'

        return segment, active_menu

    except:
        return 'index', 'dashboard'


@csrf_exempt
def test(request):
    username = request.user.username
    form = CreateEventForm2()
    form_side = CreateEventForm3()
    # cal_lists = CalendarList.objects.filter(username=username)
    print("Hello")
    params = {
        'form': form,
        'form_side': form_side,
        'submit_text': ''
    }
    if request.method == 'POST':
        events = RegisterEvents(
            title=request.POST['title'], date=request.POST['date'], startTime=request.POST['startTime'], length=request.POST['length'], email=request.POST['email'], location=request.POST['location'], calender=request.POST['calender'], description=request.POST['description'])
        events.save()
        return JsonResponse({'status': 1})
    return render(request, 'test2.html', params)


@csrf_exempt
def storEvent(request):
    print("working")
    if request.method == 'GET':
        return JsonResponse({'status': 0})
    return JsonResponse({'status': 1})
