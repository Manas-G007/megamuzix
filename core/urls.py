from django.urls import path
from django.views.generic.base import RedirectView
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('explore',views.explore,name='explore'),
    path('profile',views.profile,name='profile'),
    path('card',views.card,name='card'),
    path('artist/<id>',views.artist,name='artist'),
    path('search',views.search,name='search'),
    path('likeSong',views.likeSong,name='likeSong'),
    path('likeCard',views.likeCard,name='likeCard'),
    path('follow',views.follow,name='follow'),
    path('likeApi/<id>',views.likeApi,name='likeApi'),
    path('updateProfile',views.updateProfile,name='updateProfile'),
    path('email',views.email,name='email'),
    path('reset_password/<str:uidb64>/<str:token>/',views.reset_password,name='reset_password'),
    path('login',views.login,name='login'),
    path('register',views.register,name='register'),
    path('logout',views.logout,name='logout')
]