# Gardenbook server

![HOME](./Home-page.png)

### **Project Overview**

The **Gardenbook** is a comprehensive full-stack web application designed for gardening enthusiasts and professionals to share, discover, and engage with gardening knowledge. It will provide users with insightful tips, plant care advice, seasonal guides, and techniques to enhance their gardening experiences. Additionally, users can share their gardening knowledge, interact with others, and explore premium content through a seamless payment integration.

The platform aims to foster a vibrant community where users can post gardening advice, upvote content, comment, follow other users, and share their experiences. Key features **rich text editor** for content creation, **user authentication**, **premium content access via payments**, and **social interaction tools**. It will blend informative gardening content with an interactive community-focused experience.

---

### **Core Project Objectives**

1. **Full-stack web application** using Next.js, Typescript, MongoDB, Express,, Node.js.
2. **JWT-based user authentication**, ensuring secure login, registration, and profile management.
3. **Responsive user interface** that works across devices—mobile, and desktop.
4. **Social features**, including upvoting posts, commenting, following other users, and displaying the most popular content. online and offline user's facility.
5. **Rich text editor** to allow users to create, edit, and share gardening tips and guides, supporting multimedia content (images, videos, etc.).
6. **Payment Integration**: Integrate payment gateways like **AAMARPAY or Stripe** to access premium gardening contents.
7. **Advanced Search and Filter:** Implement search and filtering features that allow users to find relevant gardening content based on category, popularity, and other parameters.
8. **Admin dashboard** for managing users, posts, payments, and community moderation.

#### Required Pages:

- **Login/Registration Page:** Forms for user sign-up and login with secure authentication.
- **User Dashboard:** A personalized dashboard displaying user-specific content, and followed users and followers.
- **Admin Dashboard:** A control panel for administrators to manage content, users, and payment history, with graphs for monthly payments, posts, and user activity
- **Profile Page:** A section for users and admins to view and edit their profiles, including a display of their posts, followers, and followed users.
- **News-feed:** A page listing all gardening posts, with filtering options by category and other relevant properties.
- **About Us Page:** Information about the team or organization behind the project, outlining the mission and vision.
- **Contact Us Page:** A contact form or details for user inquiries and support.
- **Image gallery Section:** Add an image gallery section to showcase recent gardening images.

### **API endpoints**

> ### Auth
>
> - POST: api/auth/signup
> - POST: api/auth/login
> - POST: api/auth/change-password
> - POST: api/auth/refresh-token

> ### User
>
> - GET: api/users
> - GET: api/users/:userId
> - GET: api/users/active/get-all-users
> - GET: api/users/online/all-online-users
> - PATCH: api/users/update-user/:userId
> - PATCH: api/users/update-profile/:userId
> - PATCH: api/users/update-cover/:userId
> - DELETE: api/users/:userId'

> ### Posts
>
> - GET: api/posts
> - GET: api/posts/:postId
> - DELETE: api/posts/:postId
> - POST: api/posts/crate-post
> - GET: api/posts/user/:userId
> - GET: api/posts/get-monthly-posts
> - PATCH: api/posts/update-post/:postId

> ### Vote
>
> - POST: api/vote/upvote
> - POST: api/vote/downvote
> - GET: api/vote/:postId

> ### Comment
>
> - GET: api/comment/:postId
> - POST: api/comment/create
> - POST: api/comment/vote/:commentId'
> - POST: api/comment/vote/:commentId
> - PATCH: api/comment/update/:commentId
> - DELETE: api/comment/:commentId

> ### Follow
>
> - GET: api/follow/followers-following/:userId
> - POST: api/follow/follow-user
> - POST: api/follow/unfollow-user

> ### Payment
>
> - GET: api/payment
> - GET: api/payment/get-monthly-payments
> - POST: api/payment
> - PATCH: api/payment/:id
> - PATCH: api/payment/confirmation

---

### Sample Request

**Create User:**
`/api/auth/signup`(POST)

```
{
    "password": "nurullah",
  "name": {
    "firstName": "John",
    "middleName": "K.",
    "lastName": "Doe"
  },
  "email": "mdnurullah.ptk@gmail.com",
  "phone": "+1234567890",
  "address": "123 Main Street, Cityville, USA",
  "plan": "basic"
}

```

**Login User:**
`/api/auth/login`(POST)

```
{
    "email": "web@meeting-spot.com",
    "password": "ms-password",
}
```

- Response model:

```
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "accessToken": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8"",
        "refreshToken": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8""

    }
}
```

## Local installation guideline

To run this project on your local machine. clone the repository and install dependency and env variables with your MongoDB database url. Then run the project. You will find env variable samples in .env.example file.

```
npm install
```

```
npm run start:dev
```

Then it will run on your localhost 5000 port.

> - Here is the Live link of front-end [Link](https://gardenbook-client.vercel.app)
> - Here is the Live link of front-code [Link](https://github.com/nurullah91/gardenbook-frontend)
> - Here is an explanation of frontend video [Link](https://drive.google.com/file/d/1I5kKOzEZyiRUMcxBxlrDMVn0W3SR14Hg/view?usp=drive_link)

## Live link of the Server: https://gardenbook-server.vercel.app
