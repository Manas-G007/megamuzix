from django.db import models
from django.contrib.auth import get_user_model

User=get_user_model()
# Create your models here.
class Profile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    id_user=models.IntegerField()
    email=models.EmailField()
    profileImg=models.ImageField(upload_to='profile_img',default='dp.jpg')

    def __str__(self):
        return self.user.username
    
class Song(models.Model):
    mid=models.TextField(max_length=500)
    user=models.TextField(max_length=150)
    img_url=models.TextField(max_length=500)
    title=models.TextField(max_length=150)
    name=models.TextField(max_length=150)
    duration=models.TextField(max_length=100)

    def __str__(self):
        return self.user
    
class Follow(models.Model):
    aid=models.TextField(max_length=500)
    user=models.TextField(max_length=150)
    img_url=models.TextField(max_length=500)
    name=models.TextField(max_length=150)

    def __str__(self):
        return self.user

class Card(models.Model):
    cid=models.TextField(max_length=500)
    user=models.TextField(max_length=150)
    img_url=models.TextField(max_length=500)
    title=models.TextField(max_length=150)
    name=models.TextField(max_length=150)

    def __str__(self):
        return self.user