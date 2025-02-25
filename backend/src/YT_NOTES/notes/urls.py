from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreateAPIView.as_view(), name='notes'),
    path('notes/<slug:slug>/', views.NoteDetailAPIView.as_view(), name='notes-detail'),
    path('notes-search/', views.search_notes, name='notes-search'),
]


# endpoints

# http://127.0.0.1:8000/notes/
# http://127.0.0.1:8000/notes/secondary-transmission/