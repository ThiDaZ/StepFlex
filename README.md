# StepFlex - E-Commerce Shoe Store 👟

StepFlex is a full-stack e-commerce web application designed for buying and selling shoes online. The platform features a modern Next.js frontend with a robust Java backend, offering a seamless shopping experience with user authentication, product management, shopping cart, and integrated payment processing.

## 🚀 Features

### User Features
- **User Authentication** - Sign up, sign in, email verification, and session management
- **Product Browsing** - Browse shoes by categories, brands, and sizes
- **Advanced Search** - Search and filter products based on multiple criteria
- **Product Details** - Detailed product views with images, descriptions, and specifications
- **Shopping Cart** - Add, update, and remove items from cart
- **Checkout System** - Complete checkout process with address management
- **Payment Integration** - Integrated with PayHere payment gateway
- **User Account** - Manage profile, addresses, and view order history

### Admin/Seller Features
- **Product Management** - Add, update, and manage product listings
- **Inventory Management** - Track product quantities and status
- **Order Management** - View and process customer orders

### Frontend Features
- **Responsive Design** - Mobile-first responsive UI using Bootstrap 5
- **Image Zoom** - Product image zoom functionality with drift-zoom
- **Photo Gallery** - PhotoSwipe integration for image galleries
- **Modern UI** - Built with Next.js 15 and React 19
- **Hot Toast Notifications** - Real-time feedback using react-hot-toast
- **SASS Styling** - Organized and maintainable styling with SASS

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.0.3
- **UI Library**: React 19 (RC)
- **Styling**: 
  - Bootstrap 5.3.3
  - SASS 1.80.7
  - CSS Modules
- **UI Components**:
  - Swiper 11.1.14 (Carousel/Slider)
  - PhotoSwipe 5.4.4 (Image Gallery)
  - drift-zoom 1.5.1 (Image Zoom)
  - rc-slider 11.1.7 (Range Slider)
- **Notifications**: react-hot-toast 2.4.1
- **Language**: TypeScript 5

### Backend
- **Language**: Java
- **Server**: GlassFish Application Server
- **ORM**: Hibernate
- **Database**: MySQL 8.4.0
- **Architecture**: RESTful API with Servlets
- **Payment Gateway**: PayHere Integration
- **Build Tool**: Apache Ant (NetBeans project)

### Database
- **RDBMS**: MySQL 8.4.0
- **Schema**: stepflex
- **Tables**: Users, Products, Brands, Categories, Sizes, Cart, Orders, Addresses, etc.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### For Backend:
- Java Development Kit (JDK) 8 or higher
- GlassFish Server 4.x or higher
- MySQL Server 8.0 or higher
- NetBeans IDE (recommended) or any Java IDE
- Apache Ant (for building)

### For Frontend:
- Node.js 20.x or higher
- npm or yarn package manager

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ThiDaZ/StepFlex.git
cd StepFlex
```

### 2. Database Setup

1. Start MySQL server
2. Create the database and import the schema:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE stepflex;
USE stepflex;
SOURCE stepFlexData.sql;
```

3. Update database credentials in `backend/src/java/hibernate.cfg.xml`:

```xml
<property name="hibernate.connection.username">your_username</property>
<property name="hibernate.connection.password">your_password</property>
```

### 3. Backend Setup

#### Option A: Using NetBeans (Recommended)
1. Open NetBeans IDE
2. Go to `File > Open Project`
3. Navigate to `StepFlex/backend` and open the project
4. Configure GlassFish Server:
   - Go to `Tools > Servers`
   - Add GlassFish Server if not already configured
5. Add required libraries (if not auto-resolved):
   - Hibernate ORM
   - MySQL Connector/J
   - Gson
   - JavaMail API
   - PayHere SDK (if applicable)
6. Right-click on the project and select `Clean and Build`
7. Right-click on the project and select `Run`

The backend server will start on GlassFish (typically `http://localhost:8080/backend`)

#### Option B: Using Command Line
```bash
cd backend
ant clean
ant build
# Deploy the generated WAR file to GlassFish manually
```

### 4. Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure API endpoint (if needed):
   - Update API URLs in frontend configuration files to point to your backend server

4. Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

5. For production build:

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
StepFlex/
├── backend/                    # Java Backend Application
│   ├── src/
│   │   └── java/
│   │       ├── controller/     # Servlet controllers for API endpoints
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── entity/         # Hibernate entity classes
│   │       ├── model/          # Business logic and utilities
│   │       └── hibernate.cfg.xml
│   ├── web/                    # Web resources
│   │   └── WEB-INF/           # Web configuration
│   ├── lib/                    # Java libraries and dependencies
│   └── build.xml              # Ant build configuration
│
├── frontend/                   # Next.js Frontend Application
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── (cart)/            # Cart pages
│   │   ├── (logins)/          # Authentication pages
│   │   ├── (my-account)/      # User account pages
│   │   ├── (products)/        # Product pages
│   │   ├── (shop)/            # Shop pages
│   │   ├── api/               # API routes
│   │   └── components/        # React components
│   ├── public/                # Static assets
│   ├── context/               # React Context providers
│   ├── types/                 # TypeScript type definitions
│   └── package.json
│
├── stepFlexData.sql           # Database schema and sample data
├── ER.mwb                     # MySQL Workbench ER diagram
└── README.md                  # This file
```

## 🔌 API Endpoints

The backend provides RESTful API endpoints for:

### Authentication
- `POST /SignUp` - User registration
- `POST /SignIn` - User login
- `POST /SignOut` - User logout
- `POST /Verification` - Email verification
- `GET /SessionCheck` - Check user session

### Products
- `GET /LoadHomeProducts` - Get featured products for home page
- `GET /LoadShopData` - Get products with filters
- `GET /LoadSingleProduct` - Get product details
- `POST /SearchProducts` - Search products
- `GET /ProductListing` - Get product listings

### Cart
- `POST /AddToCart` - Add item to cart
- `GET /LoadCart` - Get cart items
- `POST /AddCartQty` - Increase cart item quantity
- `POST /RemoveCartQty` - Decrease cart item quantity
- `POST /RemoveCartItem` - Remove item from cart

### User
- `GET /LoadUserData` - Get user profile data
- `POST /UpdateUser` - Update user profile
- `GET /LoadUserProducts` - Get user's products

### Address
- `POST /AddAddress` - Add new address
- `GET /LoadAddress` - Get user addresses
- `GET /LoadAddressDetails` - Get specific address details

### Checkout & Payment
- `POST /Checkout` - Process checkout
- `GET /LoadCheckOut` - Load checkout data
- `POST /VerifyPayments` - Verify payment status

## 🎨 UI Components

The frontend includes several reusable components:

- **Header & Footer** - Navigation and footer sections
- **Hero Section** - Landing page hero with call-to-action
- **Product Cards** - Product display cards with images and details
- **Categories** - Product category navigation
- **Brands** - Brand showcase
- **Features** - Feature highlights
- **Cart Component** - Shopping cart interface
- **Checkout Flow** - Multi-step checkout process

## 🔧 Configuration

### Frontend Configuration

Edit `next.config.ts` for Next.js configuration:
- API routes
- Environment variables
- Image optimization settings

### Backend Configuration

Edit `hibernate.cfg.xml` for database configuration:
- Database connection URL
- Username and password
- Entity mappings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow Java naming conventions for backend code
- Use TypeScript for all frontend code
- Follow React best practices and hooks patterns
- Write clean, documented code
- Test your changes before committing
- Keep commits atomic and well-described

## 🔒 Security Notes

- Never commit sensitive credentials (database passwords, API keys) to version control
- Update the default database credentials in `hibernate.cfg.xml`
- Use environment variables for sensitive configuration
- Implement proper input validation and sanitization
- Use HTTPS in production
- Regularly update dependencies to patch security vulnerabilities

## 📄 License

This project is part of a learning/academic project. Please check with the repository owner for license details.

## 👥 Authors

- **ThiDaZ** - [GitHub Profile](https://github.com/ThiDaZ)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Bootstrap for the UI components
- Hibernate for ORM functionality
- PayHere for payment gateway integration
- All contributors and open-source libraries used in this project

## 📞 Support

For support, questions, or feedback:
- Open an issue in the GitHub repository
- Contact the repository owner

---

**Built with ❤️ using Next.js and Java**