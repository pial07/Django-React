from django.contrib import admin
from .models import Note



class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created', 'updated')
    search_fields = ('title', 'category')

admin.site.register(Note,NoteAdmin)