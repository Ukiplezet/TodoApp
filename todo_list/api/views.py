import datetime
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
from django.contrib.auth.models import User


@api_view(['GET'])
def getRoutes(request):

    routes = [

        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data['note']

    data['updated'] = datetime.datetime.now()
    if(data['is_completed']):
        data['date_completed'] = datetime.datetime.now()
    else:
        data['date_completed'] = None

    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data, many=False)

    if(serializer.is_valid()):
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Task deleted Successfully')


@api_view(['POST'])
def createNote(request):
    data = request.data['note']
    note = Note.objects.create(
        user_id=data['user'],
        title=data['title'],
        description=data['description'],
    )

    serializer = NoteSerializer(data=note, many=False)
    if(serializer.is_valid()):
        serializer.save()

    return Response(serializer.data)
