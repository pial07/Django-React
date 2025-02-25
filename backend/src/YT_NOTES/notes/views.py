from django.shortcuts import render
from rest_framework import generics
from .serializers import NoteSerializer

from .models import Note
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q

@api_view(['GET'])
def search_notes(request):
    query = request.query_params.get("search")
    notes = Note.objects.filter(Q(title__icontains=query) | Q(body__icontains=query) | Q(category__icontains=query))
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class NoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    
    def perform_create(self, serializer):
        title=serializer.validated_data.get('title')
        body=serializer.validated_data.get('body')
        if body is None:
            body=title
        serializer.save(body=body)    

class NoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = "slug"

class NoteUpdateAPIView(generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_update(self, serializer):
        instance=serializer.save()  
        if instance.body is None:
            instance.body=instance.title
        instance.save() 

class NoteDestroyAPIView(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)                


# @api_view(['GET','POST'])
# def notes(request):
#     if request.method=='GET':
#         notes=Note.objects.all()
#         serializer=NoteSerializer(notes, many=True)
#         return Response(serializer.data)
#     elif request.method=='POST':
#         serializer=NoteSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
