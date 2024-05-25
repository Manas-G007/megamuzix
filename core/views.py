from django.http import JsonResponse
from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth.models import User,auth
from .models import Profile,Song,Follow,Card
from django.contrib.auth.decorators import login_required
# Create your views here.
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes,force_str
from django.core.mail import send_mail

@login_required(login_url='login')
def index(request):
    try:
        user_object=User.objects.get(username=request.user.username)
        user_profile=Profile.objects.get(user=user_object)
        
    except:
        user_object=User.objects.get(username=request.user)
        user_profile=Profile.objects.get(id_user=6969)
        user_profile.user=user_object
    

    content={
        'user_profile':user_profile
    }
    return render(request,'index.html',content)

@login_required(login_url='login')
def explore(request):   
    try:
        user_object=User.objects.get(username=request.user.username)
        user_profile=Profile.objects.get(user=user_object)
        
    except:
        user_object=User.objects.get(username=request.user)
        user_profile=Profile.objects.get(id_user=6969)
        user_profile.user=user_object
    

    content={
        'user_profile':user_profile
    }
    return render(request,'explore.html',content)

@login_required(login_url='login')
def profile(request):
    try:
        user_object=User.objects.get(username=request.user.username)
        user_profile=Profile.objects.get(user=user_object)
        
    except:
        user_object=User.objects.get(username=request.user)
        user_profile=Profile.objects.get(id_user=6969)
        user_profile.user=user_object
    
    
    liked_songs=Song.objects.filter(user=user_object)
    followed_artists=Follow.objects.filter(user=user_object)
    liked_cards=Card.objects.filter(user=user_object)

    content={
        'user_profile':user_profile,
        'liked_songs':liked_songs,
        'followed_artists':followed_artists,
        'liked_cards':liked_cards
    }
    return render(request,'profile.html',content)

@login_required(login_url='login')
def card(request):
    type=request.GET['type']
    id=request.GET['id']
    # print(type,id)
    try:
        user_object=User.objects.get(username=request.user.username)
        user_profile=Profile.objects.get(user=user_object)
        
    except:
        user_object=User.objects.get(username=request.user)
        user_profile=Profile.objects.get(id_user=6969)
        user_profile.user=user_object
    
    isliked=Card.objects.filter(cid=id,user=user_object).exists()
    likeText='fa fa-heart' if isliked else 'fa-regular fa-heart'

    content={
        'user_profile':user_profile,
        'type':type,
        'card_id':id,
        'likeText':likeText
    }
    return render(request,'cardInside.html',content)

@login_required(login_url='login')
def artist(request,id):
    try:
        user_object=User.objects.get(username=request.user.username)
        user_profile=Profile.objects.get(user=user_object)
        
    except:
        user_object=User.objects.get(username=request.user)
        user_profile=Profile.objects.get(id_user=6969)
        user_profile.user=user_object
    
    
    isFollowed=Follow.objects.filter(aid=id,user=user_object).exists()
    followText='Following' if isFollowed else 'Follow'

    content={
        'user_profile':user_profile,
        'artist_id':id,
        'followText':followText
    }
    return render(request,'artist.html',content)

@login_required(login_url='login')
def search(request):
    search_term=request.GET['q']
    try:
        user_object=User.objects.get(username=request.user.username)
        user_profile=Profile.objects.get(user=user_object)
        
    except:
        user_object=User.objects.get(username=request.user)
        user_profile=Profile.objects.get(id_user=6969)
        user_profile.user=user_object
    

    content={
        'user_profile':user_profile,
        'search_term':search_term
    }

    return render(request,'search.html',content)

@login_required(login_url='login')
def likeSong(request):
    mid=request.GET['mid']
    user=request.user.username
    img_url=request.GET['img_url']
    title=request.GET['title']
    name=request.GET['name']
    duration=request.GET['duration']

    isPresent=Song.objects.filter(mid=mid,user=user).exists()

    if(isPresent):
        oldLike=Song.objects.get(mid=mid,user=user)
        oldLike.delete()    
        response_data = {'message': 'deleted'}
    else:
        newLike=Song.objects.create(mid=mid,user=user,img_url=img_url,title=title,name=name,duration=duration)
        newLike.save()
        response_data = {'message': 'saved'}

    return JsonResponse(response_data)

@login_required(login_url='login')
def follow(request):
    aid=request.GET['aid']
    user=request.user.username
    img_url=request.GET['img_url']
    name=request.GET['name']

    isPresent=Follow.objects.filter(aid=aid,user=user).exists()

    if(isPresent):
        rmFollow=Follow.objects.get(aid=aid,user=user)
        rmFollow.delete()
        response_data={'message':'deleted'}
    else:
        addFollow=Follow.objects.create(aid=aid,user=user,img_url=img_url,name=name)
        addFollow.save()
        response_data={'message':'saved'}
    
    return JsonResponse(response_data)

@login_required(login_url='login')
def likeCard(request):
    cid=request.GET['cid']
    user=request.user.username
    img_url=request.GET['img_url']
    title=request.GET['title']
    name=request.GET['name']

    isPresent=Card.objects.filter(cid=cid,user=user).exists()

    if(isPresent):
        rmCard=Card.objects.get(cid=cid,user=user)
        rmCard.delete()
        res={'message':'deleted'}
    else:
        addCard=Card.objects.create(cid=cid,user=user,img_url=img_url,title=title,name=name)
        addCard.save()
        res={'message':'saved'}

    return JsonResponse(res)

@login_required(login_url='login')
def likeApi(request,id):
    isLikedSong=Song.objects.filter(mid=id,user=request.user.username).exists()
    message={'isLikedSong':isLikedSong}
    return JsonResponse(message)

@login_required(login_url='login')
def updateProfile(request):
    if request.method=='POST':
        user=request.user.username
        print('her')
        image=request.FILES.get('dp')
        user_obj=User.objects.get(username=user)
        user_profile=Profile.objects.get(user=user_obj)
        user_profile.profileImg=image
        user_profile.save()
    
    return redirect('/')
# reset password service
def email(request):
    if request.method=='POST':
        email=request.POST['email']
        user_obj=User.objects.filter(email=email).first()
        if user_obj:
            token=default_token_generator.make_token(user_obj)
            # print(token)
            uid=urlsafe_base64_encode(force_bytes(user_obj.pk))

            reset_link=request.build_absolute_uri('reset_password/'+uid+'/'+token+'/')
            
            subject='Password Reset'
            message=f"""
                hi {user_obj},
                reset link {reset_link}
                """
            from_email='manasjiok100@gmail.com'
            recipient_list=[user_obj.email]
            
            send_mail(subject,message,from_email,recipient_list)

            messages.info(request,f"Reset Password Email has been sent to {email}, update password and login again.")
            return redirect('email')
        else:     
            messages.error(request,"Email Doesn't exist")
            return redirect('email')
   
    return render(request,'email.html')

def reset_password(request,uidb64,token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            password = request.POST['password']
            cPassword=request.POST['cPassword']
            if password==cPassword:
                user.set_password(password)
                user.save()
                messages.info(request, 'Password has been reset successfully.')
                return redirect('/') 
            else:
                messages.error(request,'Password didn\'t matched!')
    else:
        messages.error(request, 'Invalid reset link.')

    form_link=f'/reset_password/{uidb64}/{token}/'
    content={
        'form_link':form_link
    }
    return render(request,'reset_password.html',content)


def login(request):
    if(request.method=='POST'):
        username=request.POST['username']
        password=request.POST['password']

        user=auth.authenticate(username=username,password=password)
        print(user)
        if user is None:
            messages.info(request,'Invalid Credentials')
            return redirect('login')
        else:
            auth.login(request,user)
            return redirect('/')
    if(request.user.username==''):
        return render(request,'login.html')
    else:
        return redirect('/')
    
def register(request):
    if(request.method=='POST'):
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        cPassword=request.POST['cPassword']

        if(password==cPassword):
            if(User.objects.filter(username=username).exists()):
                messages.info(request,'username taken')
                return redirect('register')
            elif(User.objects.filter(email=email).exists()):
                messages.info(request,'email taken')
                return redirect('register')
            else:
                user=User.objects.create_user(username=username,email=email,password=password)
                user.save()

                user_model=User.objects.get(username=username)
                new_profile=Profile.objects.create(user=user_model,id_user=user_model.id,email=email)
                new_profile.save()

                user_login=auth.authenticate(username=username,password=password)
                auth.login(request,user_login)

                return redirect('/')
            
        else:
            messages.info(request,'Passwords are not Matching')
            return redirect('register')

    if(request.user.username==''):
        return render(request,'register.html')
    else:
        return redirect('/')

def logout(request):
    auth.logout(request)
    return  redirect('login')