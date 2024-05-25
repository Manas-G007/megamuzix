from django.contrib import admin
from .models import Profile,Song,Follow,Card
# Register your models here.
admin.site.register(Profile)
admin.site.register(Song)
admin.site.register(Follow)
admin.site.register(Card)