from django.http.response import JsonResponse
from django.shortcuts import render
import os
import tensorflow
from tensorflow.keras.models import load_model

#def function here
def predictNab(savedmodel, ihsg, unit):
  scalled_ihsg = (ihsg-5432.33208)/ 672.061332
  scalled_unit = (unit-1371.292453)/ 484.752248
  scalled_nab = savedmodel.predict([[scalled_ihsg,	scalled_unit]])[0]
  nab = (scalled_nab * 117903.313572) + 354201.501981
  return nab

# Create your views here.
def index(request):
    context = {
        'css': 'ini link css'
    }
    return render(request, 'index.html', context)

def predictnab(request):
    ihsg = request.POST['ihsg']
    unit = request.POST['unit']
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)),'my_lstm_model.h5')
    clf = load_model(model_path)
    data = predictNab(clf, 5299.213, 1141)
    return JsonResponse(data)