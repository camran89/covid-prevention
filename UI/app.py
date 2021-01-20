from flask import Flask, render_template, request, redirect, url_for,flash, make_response,session
import requests
from datetime import date
import datetime

app = Flask(__name__)
app.secret_key = 'GribeshDhakal'
app.permanent_session_lifetime = datetime.timedelta(days=1)


@app.route('/')
def hello():
    url = "https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-getreviews"
    response = requests.request("GET",url)
    r=""
    r = response.json()
    # print("From / hello printing isUser  ", session['isUser'])
    # print(r)
    if('isUser' in session):
        print(session['isUser'])
    else:
        session['isUser'] = False

    if('user_reviews' in session):
        session['user_reviews']=r
        print(session['user_reviews'])
    else:
        session['user_reviews']=r
    return render_template('index.html',isUser=session['isUser'], response=r)

def check(email):
    url = "https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-getuserdata?email="+email
    status = requests.request("GET",url)
    # print(status.json())
    return status.json()
 
def errorHandling(value):
    print(value)
    # print(value['message'])
    # print(hasattr(value,'message'))
    if isinstance(value,dict):
        if ((('message' in value ) )and (value['message']=='Internal server error')):
            return True
        return False
    return False

@app.route('/login')
def login():
    if('isUser' in session):
        if(session['isUser']):
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', pred="Please login!")
    else:
        session['isUser']=False
        print(session['isUser'])
        return render_template('login.html', pred="Please login!")

@app.route('/loginpage',methods=['POST'])
def loginpage():
    user = request.form['user']
    passw = request.form['passw']
    # print(user,passw)
    data = check(user)
    print("[INFO]: Confidential Data")
    print(data)
    if(errorHandling(data)):
        return render_template('login.html', pred="The username is not found, recheck the spelling or please register.")
    else:
        if(passw==data['password']):
            print("[Info] making isUser True")
            session['isUser']=True
            session['user']=data['name']
            print(session['isUser'])
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', pred="Login unsuccessful. You have entered the wrong password.") 

@app.route('/registration')
def register_home():
    return render_template('register.html')

@app.route('/registration',methods=['POST'])
def register():
    x = [x for x in request.form.values()]
    # print(x)
    params = "name="+x[0]+"&email="+x[1]+"&phone="+x[2]+"&city="+x[3]+"&isInfected="+x[4]+"&blood_type="+x[5]+"&password="+x[6]
    
    if(errorHandling(check(x[1]))):
        # print("Inside this if")
        url = "https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-registration?"+params
        response = requests.get(url)
        return render_template('register.html', pred="Registration Successful, please login using your details")
    else:
        return render_template('register.html', pred="You are already a member, please login using your details")

@app.route('/requester')
def requester():
    # print(session['isUser'])
    if(session['isUser']):
        return render_template('requester.html')
    return redirect(url_for('login'))

@app.route('/requested',methods=['POST'])
def requested():
    bloodgrp = request.form['bloodgrp']
    #print(bloodgrp)
    url = "https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-request?blood="+bloodgrp
    status = requests.request("GET",url)
    a=status.json()
    # print(a)
    email=[]
    phone=[]
    for i in a:
        phonenos={
            "phone":str(i['phone'])
        }
        print("Sent message to "+str(phonenos))
        # Uncomment this line to send SMS to user
        respo= requests.post('https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-sendsms/', json = phonenos)
        print(respo)
        email.append(i['email'])
        result=requests.request("GET",url)
        print(result)
        phone.append(i['phone'])
    # print(email)
    payload={
        "email" :email
    }
    resp= requests.post('https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-sendnotification/', json = payload)
    # print(resp)
    # print(phone)
    return render_template('requester.html', pred="Your request is sent to the concerned people.")

@app.route('/dashboard')
def dashboard():
    if(session['isUser']):
        url = "https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-countbloodtypes"
        response = requests.request("GET",url)
        r = response.json()
        # print(r)
        return render_template('dashboard.html',b=sum(r),b1=str(r[0]),b2=str(r[1]),b3=str(r[2]),b4=str(r[3]),b5=str(r[4]),b6=str(r[5]),b7=str(r[6]),b8=str(r[7]))
    return redirect(url_for('login')) 


@app.route('/writereview')
def writereview():
    if(session['isUser']):
        print(session['user_reviews'])
        userreview=""
        for resp in session['user_reviews']:
            if (resp['username'] == session['user']):
                userreview=resp
                break
        print(userreview)
        return render_template('review.html', pastreview=userreview)
    # return redirect(url_for('login'))
    return render_template('review.html')

@app.route('/wrotereview',methods=['POST'])
def wrotereview():
    username=request.form['username']
    review=request.form['review']
    if(not username):
        username="Anonymous"
    params={
        'username':username,
        'review':review,
        'date':date.today().strftime("%d/%m/%Y")
    }
    print(params)
    respo= requests.post('https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-writereviews/', json=params)
    return render_template('review.html', pred="You have written review.")


@app.route('/handleupdates',methods=['POST'])
def handleupdates():
    print(request.form)
    username=request.form['username']
    review=request.form['review']
    ids=request.form['id']
    action=request.form['action']
    if(not username):
        username="Anonymous"
    params={
        'id':ids,
        'username':username,
        'review':review,
        'date':date.today().strftime("%d/%m/%Y")
    }
    print(params)
    if action=='Update':
        respo= requests.put('https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-updatereviews/', json=params)
        print('update')
    if action=='Delete':
        params={'id':ids}
        print('Delete')
        respo= requests.delete('https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-deletereviews/', json=params)
        return render_template('review.html', pred="You have deleted review.")
    respo= requests.post('https://259juy4wy8.execute-api.us-east-2.amazonaws.com/prod/pda-updatereviews/', json=params)
    return render_template('review.html', pred="You have updated review.")

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
 
