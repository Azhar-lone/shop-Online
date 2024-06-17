# backEnd for shop-Online

[githubLink](https://github.com/Azhar-lone/shop-online)

### Features
# 1-user features
## Public Routes
### 1-signUp aka *createAccount*
```javascript
POST /users/signup
body=
{   email:emailString,
    password:String,
    confirmPassword:String,
    firstName:String,
    lastName:String,
    userName:String,
    country:String
    }   
```
#### if status=200 ok returns{userName}
#### else returns{msg} 

### 2-login 
```javascript
POST /users/login
body={ email:emailString,
    password:String,}
```
#### if status=200 ok returns{userName}
#### else returns{msg} 
### 3-getUserInfo
```javascript
GET /users/:username
```
#### if status=200 ok returns{user} 
#### else returns{msg} 

### 4-Send OTP
```javascript
POST /users/send-otp
body={ email:emailString}
```

#### if status=200 ok returns{otp} 
#### else returns{msg}

### 5-forgot Password
```javascript
POST /users/forgot-password
body={ email:emailString,otp}
```
#### if status=200 ok returns{userName} 
#### else returns{msg}


<!-- // Public routes Done -->



## Users Only Routes
### 6-logout
```javascript
POST /users/logout
```
#### if status 200 returns  
#### else returns{msg} 

### 7-upload profile picture

***note:*** set  content-type:multipart/formdata
```javascript

POST /users/upload-profile
body={
    image:imageFile
}
```
#### if status=200 ok returns{newProfile} 
#### else returns{msg}

<!-- // User routes Done -->





## Owners Only Routes

### 8-delete userAccount

```javascript
DELETE /users/delete

body={
    password:passwordString,
    email:emailString, 
    otp:OTP 
}

```
#### if status=200 ok returns
#### else returns{msg}

### 9-update userAccount

```javascript
PUT /users/update
body=
{   email?:emailString,  
    userName?:String,
    firstName?:String,
    lastName?:String,
    oldPassword:String, 
    newPassoword:string,
    confirmNewPassword:String,

    }
```
#### if status=200 ok returns{upadatedUser} 
#### returns{msg} 

### 10-get users  cart

```javascript
GET /users/cart?limit&page
```
#### if status=200 ok returns{cart} 
#### returns{msg} 


### 11-get users  cart

```javascript
PUT /users/change-password
body= {
    oldPassword:String, 
    newPassoword:string,
    confirmNewPassword:String,
    }
```
#### if status=200 ok returns
#### returns{msg} 



<!-- // owners routes Done -->



<!-- <!-- ### Admins Routes -->
<!-- **11** deleteMultipleUsers 
```javascript
DELETE /users/admin/multiple
body={
    arrayOfUsersIds:mongoIds[]
}
```
#### returns{msg}  --> -->

<!-- **12** get All Users Info

```javascript
GET /users/admin/users
```
#### if status=200 ok returns{msg,user} 
#### else returns{msg} -->












<!-- PRODUCT ROUTES -->
# 2-products features
## PUBLIC Routes
### 1-get a product

```javascript
GET /products/:id
```
#### if status=200 ok returns{product} 
#### else returns{msg} 

### 2-get all products

```javascript
GET /products/?page&limit
page=positive Number
limit=positive Number
```

#### if status=200 ok returns{products} 
#### else returns{msg} 

### 3-get user Products

```javascript
GET /products/user/:id?page&limit
page=positive Number
limit=positive Number
id:userId
```
#### if status=200 ok returns{products} 
#### else returns{msg} 
### 4-get Products Count 

```javascript
GET /products/count
```
#### if status=200 ok returns{count} 
#### else returns{msg} 


<!-- Public Product routes end here -->












# 4-Search feature
### Public Routes
**1** search from All 
#### Canceled feature
```javascript
GET /search/?query
query=Search String
```
#### if status=200 ok returns{users,books}
#### else returns{msg}
**2** search from products
```javascript
GET /search/products/?query
query=Search String
```
#### if status=200 ok returns{books}
#### else returns{msg}
**1** search from Users
#### Canceled feature

```javascript
GET /search/users/?query
query=Search String
```
#### if status=200 ok returns{users}
#### else returns{msg}


# 4-General feature
### Public Routes
**1** get AboutUs Info
```javascript
GET /general/aboutus/

```
#### if status=200 ok returns{aboutus}
#### else returns{msg}
### Admins Routes
**1** Edit AboutUs Info
```javascript
PUT  /general/aboutus/

```
#### if status=200 ok returns{aboutus}
#### else returns{msg}
