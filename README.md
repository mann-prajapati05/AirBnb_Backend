# AirBnb Clone - Property Rental Platform

A full-stack web application built with Node.js, Express, MongoDB, and EJS that mimics core functionalities of Airbnb. This platform allows users to browse properties, book accommodations, manage favorites, and for hosts, list and manage their properties.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### For Guests (Renters)

- **User Authentication**: Secure signup and login system with password hashing
- **Property Browsing**: Browse available properties with details, ratings, and photos
- **Property Details**: View detailed information about properties including pricing and descriptions
- **Favorites Management**: Add/remove properties to personal favorites list
- **Booking System**: View booking history and reserve properties
- **Session Management**: Persistent login sessions using MongoDB sessions

### For Hosts (Property Owners)

- **Host Authentication**: Sign up as a host with dedicated account type
- **Add Properties**: List new properties with photos, descriptions, pricing, and location
- **Manage Listings**: View, edit, and delete property listings
- **Photo Upload**: Upload property images with file validation
- **Property Management**: Edit existing property details (name, price, location, rating, description)

### General Features

- **Responsive Design**: Built with Tailwind CSS for mobile-friendly UI
- **Image Upload**: Multer integration for secure file uploads
- **Password Security**: Bcryptjs for encrypted password storage
- **Input Validation**: Express-validator for server-side validation
- **Error Handling**: Comprehensive error pages and messages

---

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose ODM (v9.1.5)
- **Session Management**: express-session with MongoDB store
- **File Upload**: Multer (v2.0.2)
- **Security**: bcryptjs (v3.0.3) for password hashing
- **Validation**: express-validator (v7.3.1)

### Frontend

- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS (v4.1.18)
- **CSS Processing**: PostCSS and Autoprefixer

### Development Tools

- **Development Server**: Nodemon (v3.1.11)
- **Package Manager**: npm

---

## 📁 Project Structure

```
AirBnb/
├── app.js                          # Main application entry point
├── package.json                    # Project dependencies and scripts
├── tailwind.config.js             # Tailwind CSS configuration
│
├── controllers/                    # Request handlers and business logic
│   ├── authController.js          # Authentication logic (login, signup, logout)
│   ├── storeController.js         # Guest/Store operations (browsing, favorites, bookings)
│   ├── hostController.js          # Host operations (add, edit, delete properties)
│   └── errors.js                  # Error handling middleware
│
├── routes/                         # Route definitions
│   ├── authRouter.js              # Authentication routes
│   ├── storeRouter.js             # Store/Guest routes
│   └── hostRouter.js              # Host management routes
│
├── models/                         # Database schemas
│   ├── user.js                    # User schema (guests and hosts)
│   └── home.js                    # Property/Home schema
│
├── views/                          # EJS template files
│   ├── 404.ejs                    # 404 error page
│   ├── input.css                  # Raw CSS for Tailwind processing
│   ├── auth/                      # Authentication pages
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── host/                      # Host management pages
│   │   ├── add-home.ejs
│   │   ├── edit-home.ejs
│   │   ├── home-added.ejs
│   │   └── host-home-list.ejs
│   ├── store/                     # Guest browsing pages
│   │   ├── index.ejs              # Home/landing page
│   │   ├── home-list.ejs          # Properties list
│   │   ├── home-detail.ejs        # Property details page
│   │   ├── bookings.ejs           # Booking history
│   │   ├── favourite-list.ejs     # Favorites page
│   │   └── reserve.ejs            # Reservation/booking page
│   └── partials/                  # Reusable template components
│       ├── head.ejs               # HTML head section
│       ├── nav.ejs                # Navigation bar
│       ├── errors.ejs             # Error display component
│       └── favourite.ejs          # Favorite icon component
│
├── public/                         # Static files
│   ├── output.css                 # Compiled Tailwind CSS
│   ├── home.css                   # Custom styles
│   └── images/                    # Static images
│
├── uploads/                        # User-uploaded property images
│
├── utils/                          # Utility functions
│   └── pathUtil.js                # Path utilities for directory references
│
├── data/                           # Data files
│   ├── homes.json                 # Sample home data
│   └── fav.json                   # Favorites data
│
└── node_modules/                   # Project dependencies (auto-generated)
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: v14.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v6.0.0 or higher (comes with Node.js)
- **MongoDB**: v4.4 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git**: For cloning the repository

---

## 📥 Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/airbnb-clone.git
   cd airbnb-clone
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install all required packages listed in `package.json`

3. **Create uploads Directory** (if not exists)
   ```bash
   mkdir uploads
   ```

---

## ⚙️ Configuration

### Environment Setup

1. **Database Configuration**
   - Open [app.js](app.js#L13)
   - Update the MongoDB connection string with your credentials:

   ```javascript
   const DBpath =
     "keep your DB string here";
   ```

2. **Session Configuration**
   - The session secret is currently set to `"this is airBnb"` in [app.js](app.js#L70)
   - For production, use a strong, random secret string

3. **Port Configuration**
   - Default port is `3030` (defined in [app.js](app.js#L97))
   - To change, modify the `PORT` variable

4. **Tailwind CSS Configuration**
   - Review [tailwind.config.js](tailwind.config.js) for CSS settings
   - Customize theme colors, spacing, and fonts as needed

---

## 🚀 Running the Application

### Development Mode (with auto-reload and CSS watch)

```bash
npm start
```

This command runs two processes simultaneously:

- **Nodemon**: Automatically restarts the server when files change
- **Tailwind CSS Watch**: Watches for CSS changes and recompiles

### Start Only the Server (without Tailwind watch)

```bash
nodemon app.js
```

### Start Only Tailwind CSS Watch (in separate terminal)

```bash
npm run tailwind
```

### Access the Application

Once running, open your browser and navigate to:

```
http://localhost:3030
```

---

## 🛣️ API Routes

### Authentication Routes (`/`)

| Method | Route     | Controller                | Description               |
| ------ | --------- | ------------------------- | ------------------------- |
| GET    | `/login`  | authController.getLogin   | Display login form        |
| POST   | `/login`  | authController.postLogin  | Process user login        |
| GET    | `/signup` | authController.getSignup  | Display signup form       |
| POST   | `/signup` | authController.postSignup | Process user registration |
| POST   | `/logout` | authController.postLogout | Logout user               |

### Guest/Store Routes (`/`)

| Method | Route                 | Controller                          | Description               |
| ------ | --------------------- | ----------------------------------- | ------------------------- |
| GET    | `/`                   | storeController.getIndex            | Home/landing page         |
| GET    | `/homes`              | storeController.getHomes            | List all properties       |
| GET    | `/homes/:homeId`      | storeController.getHomesDetails     | View property details     |
| GET    | `/bookings`           | storeController.getBookings         | View user bookings        |
| GET    | `/favourites`         | storeController.getFavouriteList    | View favorite properties  |
| POST   | `/favourites`         | storeController.postAddToFavourite  | Add property to favorites |
| POST   | `/dltfav-home/:favId` | storeController.postDeleteFavourite | Remove from favorites     |

### Host Routes (`/host`)

| Method | Route                       | Controller                    | Description                |
| ------ | --------------------------- | ----------------------------- | -------------------------- |
| GET    | `/host/add-home`            | hostController.getAddHome     | Display add property form  |
| POST   | `/host/add-home`            | hostController.postAddHome    | Create new property        |
| GET    | `/host/host-home-list`      | hostController.getHostHomes   | View host's properties     |
| GET    | `/host/edit-home/:homeId`   | hostController.getEditHome    | Display edit property form |
| POST   | `/host/edit-home`           | hostController.postUpdateHome | Update property details    |
| POST   | `/host/delete-home/:homeId` | hostController.getDeleteHome  | Delete property            |

---

## 🗄️ Database Models

### User Model

**File**: [models/user.js](models/user.js)

```javascript
{
  firstName: String (required),
  lastName: String,
  email: String (required, unique),
  password: String (required, hashed),
  userType: String (enum: 'guest', 'host'),
  favourites: [ObjectId] // References to Home documents
}
```

**Features**:

- Email is unique across the database
- Password is encrypted using bcryptjs before storage
- User type differentiates between guests and hosts
- Favorites array stores references to saved properties

### Home Model

**File**: [models/home.js](models/home.js)

```javascript
{
  houseName: String (required),
  price: Number (required),
  location: String (required),
  rating: Number (required),
  photo: String (file path),
  description: String
}
```

**Features**:

- Stores property information
- Photo field contains path to uploaded image
- Rating field for user ratings

---

## 💻 Usage Guide

### For New Users (Guests)

1. **Sign Up**
   - Navigate to `/signup`
   - Fill in your first name, last name, email, and password
   - Select "Guest" as user type
   - Submit the form

2. **Browse Properties**
   - Go to `/homes` to see all available properties
   - Click on any property to view detailed information

3. **Add to Favorites**
   - While viewing a property, click the favorite/heart icon
   - View all your favorites at `/favourites`

4. **Make a Booking**
   - From property details, click "Reserve"
   - Bookings are saved to your account

5. **View Bookings**
   - Navigate to `/bookings` to see your reservation history

### For Host Users

1. **Sign Up as Host**
   - Navigate to `/signup`
   - Fill in your details and select "Host" as user type
   - Complete registration

2. **Add a Property**
   - Go to `/host/add-home`
   - Fill in property details:
     - House name/title
     - Price per night
     - Location
     - Initial rating
     - Description
     - Upload a property photo
   - Submit to list the property

3. **Manage Properties**
   - Visit `/host/host-home-list` to see all your properties
   - **Edit**: Click edit button, modify details, and save
   - **Delete**: Click delete button to remove property listing
   - Upload new photos for properties

4. **Upload Property Images**
   - Supported formats: JPEG, JPG, PNG
   - Maximum recommended size: 5MB (validation handled by Multer)
   - Images are stored in `/uploads` directory

---

## 🔐 Security Features

- **Password Hashing**: All passwords encrypted with bcryptjs (salt rounds: 12)
- **Session Management**: Secure session storage in MongoDB
- **File Validation**: Multer validates file type (images only) and size
- **Input Validation**: Express-validator sanitizes and validates all inputs
- **Protected Routes**: Host routes require authentication (login redirect)
- **CORS Ready**: Static file serving configured for uploads and public files

---

## 📋 File Upload Details

**Configuration**: Defined in [app.js](app.js#L26-L45)

- **Upload Directory**: `uploads/`
- **Supported Formats**: `image/jpeg`, `image/jpg`, `image/png`
- **Filename Pattern**: `{randomString(10)}-{originalFilename}`
- **Storage**: Disk storage (files saved locally)

---

## 🧪 Testing the Application

### Manual Testing Workflow

1. **Test Guest Registration**
   - Sign up as a guest
   - Verify email validation works

2. **Test Host Workflow**
   - Sign up as a host
   - Add a property with an image
   - Edit property details
   - Delete a property

3. **Test Favorite Feature**
   - Add/remove properties from favorites
   - Verify data persistence

4. **Test Sessions**
   - Login and logout
   - Verify protected routes redirect to login

---

## 📂 Environment Variables (Future Enhancement)

For production deployment, consider using `.env` file:

```bash
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/airbnb
SESSION_SECRET=your-secret-key
PORT=3030
NODE_ENV=production
```

---

## 🚀 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email verification on signup
- [ ] Reviews and ratings system
- [ ] Search and filter properties
- [ ] Map integration for location display
- [ ] Real booking/reservation system
- [ ] Host earnings dashboard
- [ ] Email notifications
- [ ] User profile management
- [ ] Database backup automation
- [ ] API authentication with JWT
- [ ] Rate limiting for API routes

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify MongoDB connection string is correct
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure MongoDB server is running locally (if using local DB)

### Port Already in Use

```bash
# Windows (PowerShell)
Get-Process -Id (Get-NetTcpConnection -LocalPort 3030).OwningProcess

# Kill process on port 3030
Stop-Process -Id <PID> -Force
```

### CSS Not Updating

- Ensure Tailwind watch is running: `npm run tailwind`
- Clear browser cache (Ctrl+Shift+Del)
- Rebuild CSS: `npm run tailwind`

### File Upload Not Working

- Check `uploads/` directory exists
- Verify file format is JPEG, JPG, or PNG
- Check file permissions on uploads directory

### Session Not Persisting

- Verify MongoDB is connected
- Check MongoDB session collection exists
- Clear browser cookies and retry login

---

## 📝 Scripts

| Script         | Command            | Description                               |
| -------------- | ------------------ | ----------------------------------------- |
| Start          | `npm start`        | Run server + watch Tailwind (development) |
| Tailwind Watch | `npm run tailwind` | Watch and compile Tailwind CSS            |
| Test           | `npm test`         | Run tests (not configured)                |

---

## 📜 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🎉 Acknowledgments

- Express.js documentation
- MongoDB/Mongoose guides
- Tailwind CSS framework
- Open-source community contributions

---

**Last Updated**: February 9, 2026  
**Version**: 1.0.0

For the latest updates and documentation, visit the project repository.
