# backEnd for shop-Online

[githubLink](https://github.com/Azhar-lone/shop-online)

### Features
# 1-user features
### Public Routes
**1** signUp aka *createAccount*
```javascript
POST /user/signup
body=
{   email?:emailString,
    phoneNumber?:mobileNumber,  
    password:String, 
    confirmPassword:String,
    name:String,
    }   
```
#### if status=200 ok returns{msg,user,token} 
#### else returns{msg} 

**2** login 
```javascript
POST /user/login
body={ email?:emailString,
phoneNumber?:phoneNumber,  
    password:String,}
```
#### if status=200 ok returns{msg,user,token} 
#### else returns{msg} 
**3** getUserInfo
```javascript
GET /user/:username
where username=slugString
```
#### if status=200 ok returns{msg,user} 
#### else returns{msg} 
### Users Only Routes
**4** logout
```javascript
POST /user/logout
```
#### returns{msg} 
**5** upload profile picture

***note:*** set  content-type:multipart/formdata
```javascript

POST /user/upload/profilepic
body={
    image:imageFile
}
```
#### if status=200 ok returns{msg,user} 
#### else returns{msg}

**7** chat With user

### Owners Only Routes

**8** delete userAccount

```javascript
DELETE /user/delete

body={
    password:passwordString,
    email?:
}

```
#### returns{msg} 
**9** update userAccount

```javascript
PUT /user/update
body=
{   email?:emailString,  
    oldPassword:String, 
    userName?:String,
    firstName?:String,
    lastName?:String,
    newPassoword:string,
confirmNewPassword:String,

    }
```
#### if status=200 ok returns{msg,upadatedUser} 
#### returns{msg} 
**10** get users  cart

```javascript
GET /user/cart?limit&page
```
#### if status=200 ok returns{msg,cart} 
#### returns{msg} 


<!-- ### Admins Routes
**11** deleteMultipleUsers 
```javascript
DELETE /user/admin/deletemultiple
body={
    arrayOfUsersIds:mongoIds[]
}
```
#### returns{msg}  -->

<!-- **12** get All Users Info

```javascript
GET /user/admin/allusers
```
#### if status=200 ok returns{msg,user} 
#### else returns{msg} -->
# 2-products features
### PUBLIC Routes
**1** get a product

```javascript
GET /products/:id
```
#### if status=200 ok returns{msg,product} 
#### else returns{msg} 

**2** get all products

```javascript
GET /products?page&limit
page=positive Number
limit=positive Number
```

#### if status=200 ok returns{msg,products} 
#### else returns{msg} 
**3** get user Products

```javascript
GET /products/user/:id?page&limit
page=positive Number
limit=positive Number
body{
    id:userId
}
```
**4** get featured Book

```javascript
GET /book/featured
```
**5** get following Books

```javascript
GET /book/following?page&limit
page=positive Number
limit=positive Number
```
**6** get Related Books

```javascript
GET /book/related?id
id=bookId
```
### USERS ONLY Routes
**7** upload Book

```javascript
POST /book/upload
body={
    lots of things
}
```
**8** download Book

```javascript
GET /book/download/:id

```
**9** Like Book

```javascript
PATCH /book/like
body={
    id:bookId
}
```
### OWNERS Routes
**10** delete Book

```javascript
POST /book/delete
body={
    id:bookId
}
```
**11** update Book

```javascript
PUT /book/update
not implimented yet
```
### Admins Routes
**12** deleteMultipleBooks 
```javascript
DELETE /book/admin/deletemultiple
body={
    arrayOfBookIds:mongoIds[]
}
```

# 3-Reviews feature
### Public Routes
**1** get all Revews of a Book
```javascript
GET /review/getall?id
id =bookId
```
**2** get top range Revews of a Book
```javascript
GET /review/gettop?id&range
id =bookId
range=positive number
```
### USERS ONLY Routes
**3** add review to book
```javascript
POST /review/add
body={
review:String(10-300),
ratings:int(1-5),
reviewOfBook:monogId
}
```
#### if status=200 ok returns{msg,review} 
#### else returns{msg}
**4** like review 
```javascript
POST /review/like
body={
id:monogId=reviewId
}
```
#### returns{msg}















# 4-Search feature
### Public Routes
**1** search from All 
#### Canceled feature
```javascript
GET /search/?query
query=Search String
```
#### if status=200 ok returns{msg,users,books}
#### else returns{msg}
**2** search from books 
```javascript
GET /search/books/?query
query=Search String
```
#### if status=200 ok returns{msg,books}
#### else returns{msg}
**1** search from Users
#### Canceled feature

```javascript
GET /search/users/?query
query=Search String
```
#### if status=200 ok returns{msg,users}
#### else returns{msg}

# 4-AboutUs feature
### Public Routes
**1** get AboutUs Info
```javascript
GET /aboutus/

```
#### if status=200 ok returns{msg,aboutus}
#### else returns{msg}
### Admins Routes
**1** Edit AboutUs Info
```javascript
PUT /aboutus/edit

```
#### if status=200 ok returns{msg,aboutus}
#### else returns{msg}
