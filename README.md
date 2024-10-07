# Gardenbook server

### **Project Overview**

The **Gardenbook** is a comprehensive full-stack web application designed for gardening enthusiasts and professionals to share, discover, and engage with gardening knowledge. It will provide users with insightful tips, plant care advice, seasonal guides, and techniques to enhance their gardening experiences. Additionally, users can share their gardening knowledge, interact with others, and explore premium content through a seamless payment integration.

The platform aims to foster a vibrant community where users can post gardening advice, upvote content, comment, follow other users, and share their experiences. Key features **rich text editor** for content creation, **user authentication**, **premium content access via payments**, and **social interaction tools**. It will blend informative gardening content with an interactive community-focused experience.

---

### **Core Project Objectives**

1. **Full-stack web application** using Next.js, Typescript, MongoDB, Express,, Node.js.
2. **JWT-based user authentication**, ensuring secure login, registration, and profile management.
3. **Responsive user interface** that works across devices—mobile, and desktop.
4. **Social features**, including upvoting posts, commenting, following other users, and displaying the most popular content.
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
> - PATCH: api/auth/user/:userId

> ### User
>
> - PATCH: api/users/:userId
> - PATCH: api/users/update-profile/:userId
> - PATCH: api/users/update-cover/:userId

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
