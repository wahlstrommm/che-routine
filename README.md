

# Giftary

The company has entrusted me with the responsibility of designing and developing their routine page. This comprehensive platform is designed to cater specifically to the needs of new employees, offering them valuable assistance in effectively managing their tasks and responsibilities. By utilizing this user-friendly system, new hires can streamline their workflows, allowing them to allocate their time more efficiently and stay on top of their work commitments.

The routine page serves as a centralized hub, providing a range of helpful features and resources. It offers easy access to essential tools, guidelines, and information necessary for completing tasks effectively. Additionally, it enables employees to prioritize and organize their work in a structured manner, ensuring that nothing falls through the cracks.

One of the primary objectives of this initiative is to enhance productivity by eliminating unnecessary administrative burdens. By automating certain processes and simplifying routine tasks, the platform empowers employees to focus on high-value work and strategic initiatives. Furthermore, the system provides real-time updates and notifications, keeping employees informed about important deadlines, meetings, and project milestones.

With this innovative routine page in place, the company aims to foster a culture of efficiency and collaboration. It not only assists new employees in quickly adapting to their roles but also promotes a sense of accountability and transparency across the organization. By leveraging this tool, employees can easily track their progress, share updates with their team members, and seek assistance whenever needed.

In summary, the implementation of this dedicated routine page will significantly contribute to the company's overall operational effectiveness. It will empower new employees to navigate their responsibilities with ease, optimize their time management, and ensure a smoother workflow within the organization.

## References

 - [Amazon får nobben av svenskarna – ”har inte lyckats i Sverige”.](https://www.ehandel.se/amazon-far-nobben-av-svenskarna-har-inte-lyckats-i-sverige)

- [Figma overview](https://www.figma.com/file/gNN8MjeTvOYKfU4KayNxMg/exjobb-flow?node-id=0%3A1&t=mUEXCnpAh8fUbmNi-1) 
## 🛠 What i used


![](https://skillicons.dev/icons?i=figma,git,github,react,ts,html,tailwind,mongodb,nodejs,express,vscode,postman,powershell,ps&perline=3)

![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) 

![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)

![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)

![Brave](https://img.shields.io/badge/Brave-FB542B?style=for-the-badge&logo=Brave&logoColor=white)
## API Reference

### Login

```http
  POST /api/Login
```

| User | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`  `password` | `string` `string` | **Required**. Your email and password |

| Company | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orgNumber`  `password` | `string` `string` | **Required**. Your orgNumber and password |



### Create User / Company

#### User
```http
  POST /api/register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `FirstName` `lastName`  `sex`  `phone`  `email` `password`   `productList`         | `string` `string` `string` `string` `string` `string` `array` | **Required**. All is Required |


#### Company
```http
  POST /api/register/Company
```



| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` `orgNumber`  `products`   `password`   `companyName`         | `string` `string` `array` `string` `string` `string` `array` | **Required**. All is Required |


### Products


#### Get all products

```http
  GET /api/products
```



#### Get one product

```http
  GET /api/products/details/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch. Getting it from req.params.id |


#### Create product

```http
  POST /api/products
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `companyName` `product`     | `string` `object` | **Required**. Id of item to fetch. Getting it from req.body.companyName.And adding the product from req.body.product |

#### Get products from company

```http
  POST /api/products/${company}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `companyName`      | `string` | **Required**. CompanyName of company to fetch. Getting it from req.body.companyName |

#### Get list of saved products (User)

```http
  POST /api/user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email to fetch user and their list of products  |

#### Added product to list (User)

```http
  POST /api/user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productId`  `email`     | `string`  `string` | **Required**. productId comes from req.params.id if founded product then i will try to find the user with req.body.email if found i will add it in thier list of saved products |

### Get saved/created products  (User & Company)

```http
  POST /api/users/:id
```
```http
  POST /api/company/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ID`      | `string`  | **Required**. ID comes from req.params.id. That will get the user and thier info.  |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|   `name`     | `string`   | **Required**. name comes from req.params.id that will get me the company and thier info. |

### Products organizer (Top list)

#### Get all products
```http
  GET /api/overview
```



#### Get category

```http
  GET /api/overview/sort/${category}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**. Id of category to fetch. I get the category from req.params.category. |

#### Share list 

```http
  POST /api/overview/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `string` | **Required**. Id of product the user wanna go to. I get the productId from req.params.id. Then i send back the url for the list of products. |


### Product List (Saved list / Products)

### User

#### Get list

```http
  GET /api/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userID`      | `string` | **Required**. userID of user to fetch the users itemlist  |

#### Delete users Product list

```http
  POST /api/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userID`      | `string` | **Required**. userID of user to fetch and then delete userlist  |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Run Locally

Clone the project

```bash
  git clone https://github.com/wahlstrommm/Giftary
```

Go to the project directory

```bash
  cd front
```
```bash
  cd back
```

Install dependencies

```bash
  npm install
```

Start the servers

```bash
  npm run 
```
```bash
  npm nodemon start
```


## Application flow
This project is used by the following users:

- Private user
- Company
- Anonymous (Not signed in)


Depending on the type of visitor (a single person or company) that enter the site is faced with three different options:


#### User:
The user just wanna browse, try the generator without signing in or save anything to their list of saved items. 
The user has an account already and logs in and browses, uses the generator, saves or removes items from their list. 
The user wants to create an account. 

#### Company: 
The company has an account already and logs in and browses, uses the generator, either to create a new listing of their product or removes already a published product from their list products. 
The company wants to create an account. 

#### Anonymous (Not signed in)
They just wanna browse, try the generator without signing in or save anything to their list of saved items.



### Login:
 ```bash
  User = Email: String
  password: String

  company = orgNumber: String
  password: String
```

Once logged in as a user you will have the option to view your list or lists of saved items. If they don't have a saved list prior then there will be a text that will be displayed. 

As a company they will have “Create product/ create listing” and “My products”. Where the first one is where the company create the listing of their product that they wanna upload which should contain the following: 

### Create a product:
 ```bash
Name: String (required)
Summary: String (required)
Age: String (optional)
Aimed for: String (required) 
options: Man,Female,Unisex
Price: String (required)
Image: String (required) (URL)
Favorited: boolean (optional)
Category: Category (required)
```


The three that isn't included in the list that will be in the database is ID because that will be generated by MongoDB and then Favorited which is a boolean that will make the user enable to save the item. And the Favorited Counter that will be the type number that will keep track of how many users have saved the item. So the Company will get an idea of what the people think about their product. The counter will be a future feature.

### Category:
 ```bash
For both: String
For her: String
For him: String
Clothes: String
Mothers day: String
Fathers day: String
Valentines present: String
Christmas: String
```

I choose strings just because I will be working with alot of input fields but I will set the type of input as a number on a few but it will return as a string that I will use in my database. 

Check the [Figma](https://www.figma.com/file/gNN8MjeTvOYKfU4KayNxMg/exjobb-flow?node-id=0%3A1&t=mUEXCnpAh8fUbmNi-1) file more details.
## Purpose



The purpose of this product is the result of different realizations both from what I have experienced in my personal life but also from my time as an intern at Ampilio. And how society has changed after the pandemic.

Usually when I buy something either for myself or for people as a birthday present I find it extremely boring and time consuming to browse and not really know what to buy. 

One might say that “just order something online” but then the problem will remain the same. 
“Why not just use Amazon then? ”That's an option but I still find it hard. And I'm not alone according to a survey done by Qvik in an article where they ask about people's views on Amazon in Sweden. It was confirmed that 21.3 % of people who were asked about Amazon Sweden completely disagreed with Amazon and went for the familiar site or the local alternative. 

*Totalt ska mer än en femtedel, 21,3 procent för att vara exakt, helt valt bort Amazon och istället varit den bekanta webbutiken och lokala alternativ trogen.* 
 
During this Black week when I was trying out some clothes, I happened to overhear people asking the salesperson of the store for help to find a good gift for their loved ones and also asking for recommendations on what's popular etc.

And that got me thinking both from a customer perspective but also from the company. Customers go into the store they are only limited to just that store and that store alone. The customer can probably order something from a different store if the current one happens to be out but that's it. That just assumes that the different items are good & popular but what's confirming it? The person working there? They will probably try to sell you something and say what you want to hear. 

So I wanted to give the people a product that takes the power from the company and gives it to the consumer, the ones that actually matter. Where people can see the product for what it really is.  

And this product will be available to everyone despite their socioeconomic status and background and that hopefully will decrease the bridge between people when people often associate by appearance. And also help with the increasing problem that younger people are taking text-loan to support their lavish lifestyle according to Kronofogden which usually includes fancier clothes. By showing it on my product and how many people are actually buying that product hopefully that will show the people to buy cheaper and better alternatives. And also help stores to reach a bigger customer group that maybe are now limited to their local area.

## Target audience

The target audience for this product will both be the private person but also as a company. 

Private person:
There are going to be people that will use it maybe once or twice just for a special occasion. And then there's going to be ones that are going to use it on a more regular basis. Those that either are looking for products for themself, or for their loved ones upcoming birthdays and holidays. 

Company:
This will be either the ones that maybe already have a successful store and just wanna increase and try to expand their business on the Swedish market. Or maybe already have a successful online store on the Swedish market and wanna see how many people that “only” save their product and don't actually buy it.

To get a better understanding about their customers' view on their product. For example maybe they have a good interactive with a lot of “likes” but no sales. Maybe that can be an indicator of a good product that people want but a bad price. 

And there will be the stores that don't have any online presence and are relying on their physical store with local customers. And they want to expand their business to increase sales and get new customers.

And why they are just going to use my product is that it's easier to use compared to hosting it yourself. And they can use Amazon to get easier exposure because they have, despite the result from the survey, more customer and steadier customer flow then one could have archived yourself. 

## NPM  
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
[Docs NPM](https://docs.npmjs.com/).

### Front: 

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[Docs React with TypeScript](https://create-react-app.dev/docs/adding-typescript/).  

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
[Docs TypeScript](https://www.npmjs.com/package/typescript).

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
[Docs React Router](https://www.npmjs.com/package/react-router).

![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
[Docs React Hook Form](https://www.npmjs.com/package/react-hook-form).

![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
[Docs Framer motion](https://www.npmjs.com/package/framer-motion).

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
[Docs Tailwind CSS](https://www.npmjs.com/package/tailwindcss).



### Back  

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
[Docs NodeJS](https://nodejs.org/en/download/).

![.Env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)
[Docs .Env](https://www.npmjs.com/package/dotenv).

![Nodemon](https://img.shields.io/badge/Nodemon-76D04B.svg?style=for-the-badge&logo=Nodemon&logoColor=white)
[Docs Nodemon](https://www.npmjs.com/package/nodemon).

![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
[Docs Express](https://www.npmjs.com/package/express).

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
[Docs MongoDB](https://www.mongodb.com/).

![Mongoose](https://badgen.net/badge/icon/Mongoose?icon=npm&label)
[Docs Mongoose](https://www.npmjs.com/package/mongoose).

![Bcrypt](https://badgen.net/badge/icon/Bcrypt?icon=npm&label)
[Docs Bcrypt](https://www.npmjs.com/package/bcrypt).

![Cors](https://badgen.net/badge/icon/Cors?icon=npm&label)
[Docs Cors](https://www.npmjs.com/package/cors).

## Tech Stack

**Client:** ![](https://skillicons.dev/icons?i=react,html,tailwind&perline=4)

**Server:** ![](https://skillicons.dev/icons?i=nodejs,express&perline=4)

**Database:**
![](https://skillicons.dev/icons?i=mongodb&perline=4)

**Testing:**
![Google Chrome](https://img.shields.io/badge/Lighthouse-F44B21.svg?style=for-the-badge&logo=Lighthouse&logoColor=white) 

![Lighthouse](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`= 'mongodb+srv://Admin:Admin1@giftary-cluster.nhugekr.mongodb.net/Giftary?retryWrites=true&w=majority'

`DB_NAME` = "Giftary"

`DEV_URL` = "http://localhost:3001"


## Goal

The expected outcome is a fully functional product with the basic features. And hopefully some of the extra features I'm thinking about adding in the future.
 
How is the product/project expected to be used by the target audience?
They will be enabled to create an account to log in, save a product of their choice to their list. They can watch their list and edit it. Like removing a product or the whole list if they want. 

The companies will also have the feature to create account sign in/out. Then log in to see their current products that are online.  And create a new product with information like description, image, title etc. 

Then I will both for the consumer but also for the companies to have a database that keeps track of the accounts so I can verify the log- ins and not create multiple accounts consumers and companies with the same credentials.

## Site map/function analysis/technical breakdown
The app is very straight forward. Once you enter the site there is no confusion on where you should go next. And we will also try to highlight why it's so good and why people should use it. Even if it speaks for itself. 

I hope that both the user as well as the companies can really see the true power in it and why they should use it. 

The front side of the app will have a more minimalist type of style both for accessibility and also for the less technical people. 

On the back i will have the generator that depending on the answer that user gives it either adds or subtracts a point. And depending on the result of each question what type of question they will ask next. 

And the result of all questions will display a product that hopefully the user will like.

The user always has the option to not login. However then the user won't be available to use all the functionally like save items.  If the user doesn't have an account they can always create one same goes for companies. 

When logged in as a user you can either use the generator, see your list with saved products, add or remove items from the list.

When you as a company are logged in you can see your products, create a new product, or remove product. Can also see how many people that have “liked” your product. 

I choose to use React because it's a modern framework with lots of good documentation and by the looks of it will continue to be used in future. 


## Database structure

#### ICategory
```bash

 ICategory {
  forHim: String;
  forher: String;
  forBoth: String;
  clothes: String;
  Christmas: String;
  ForLove: String;
  Alkohol: String;
  MomsDay: String;
  MadsDay: String;
}

INewCompany{
  name: String;
  orgNumber: String;
  products: any[];
  password: String;
  companyName: String;
}


 IProduct {
  name: String;
  summary: String;
  age: String;
  aimedFor: String;
  price: String;
  image: any;
  favorited: boolean;
  category: String;
  companyName: String;
  overAge: boolean;
}

INewUser {
  firstName: String;
  lastName: String;
  sex: String;
  phone: String;
  email: String;
  password: String;
  productList: any[];
}


```
    


## User stories 


### Persona 1: Experienced user 
#### Erik, 25. Technical level: High
Is looking for that last minute gift for his girlfriend, the one that he has known about for weeks. But here we are. So he wants ideas for gifts for what he can buy. And he wants something that he knows his girlfriend is gonna like. And he wants the gift to give that feeling that he has thought about for several weeks and so it is not a give away that he is out at the last minute.


### Persona 2: Some other user type
#### Göran 45. Technical level: low
Göran Is a divorced father with a not so great relationship with his kids. He wants to buy something for a Christmas gift that they will appreciate and use. But not only does he have a strict relationship with his kids, he also doesn't know what is popular longer? He is hoping that maybe they can use the gift together and build their relationship stronger and better.

### Persona 3: Some other user type
#### Sara, 18, Technical level: medium
Sara Is looking for a gift for her brother. He is always super hard to buy because she feels that one he has everything and second what can you even buy for your brother? She is saying that her brother likes the same things as all their boys his age. She wishes that there was a list that said “this is what boys age XXXX likes”. So she can stop this endless search for the gift.

### Persona 4: Some other user type
#### Zara, 36, Technical level: high
Zara Is an entrepreneur with multi millions companies behind her name. All from cleaning companies to e-commerce. She was not born in Sweden but she is half Swedish but her father is swedish. Now one of her companies is trying to expand overseas. They have a really successful Amazon store in the UK-site. But they have tried launching it with the Amazon launch here in Sweden but it seems like it doesn't get the same attraction. So she hopes that with this site she can easily reach out to the customer and mostly get new traffic to their shop on Amazon.
Persona 5: Some other user type
Hasse, 27, Technical level: high
Hasse has just been given the task of taking over the local shop, the one that has been in his family for generations. But the store is suffering both financially and has steady costumerflow and if it continues like this the store won't make it. Hasse has the idea of selling their product online on the site. He has a lot already with the store so he dont have time to create a website. He just wants to be able to create a listing of his product and see how many people like it. That hopefully leads to new customers and more sales.

## Test plan

I did test on two people i was planning to do on three people but unfunctional one of my test people ending up sick so they couldn't attend. But with me following up with two people can me to get more insight and an better understanding when it came to improvements and removing. 


I created wireframes in Figma. And the test is going to contain me asking them to do some task XXXXXX. At this stage I just need to see that the structure and the “workflow” make sense for the user.  

Later on I wanna test the low-fi and high-fi with more of an interview type of test. What type of feelings the user experiences and the feeling of the site. Just because the impression is so important  both for me and the site. But also for the companies that showcase their products and the overall  look on Amazon.

I will test the login functionality both for creating, login/login out user or company. I will also remove the CSS and ses the structure of the site. I use semantic HTML and that you can also navigate through the site with the help of the keyboard. This will happen at the end of the project. 

 I will also try the screen reader test. I will do this under the project. It's going to be easier instead of doing in the end because it will be easier for me to miss them.

More things I will do under the project are things like icaniuseit and contrast picker. And then after every done “page” i will check in pageSpeed and Lighthouse.

And hopefully I have time to do one final test with a fully working prototype.

## 🔗 Links


[![Github](https://skillicons.dev/icons?i=github)](https://github.com/wahlstrommm) 

[![linkedin](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/magnus-vahlstrom/)

[Repo](https://github.com/wahlstrommm/Giftary)

[Front repo](https://github.com/wahlstrommm/Giftary/tree/main/front)

[Back repo](https://github.com/wahlstrommm/Giftary/tree/main/backend)