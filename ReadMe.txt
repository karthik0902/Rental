///////////////////////////////////////////////////////

Retrieve data from the MongoDB folder.


Seller Login Details:

Email: seller@gmail.com
Password: seller

Email: seller2@gmail.com
Password: seller2

Buyer Login Details:

Email: buyer@gmail.com
Password: buyer

Email: buyer2@gmail.com
Password: buyer2

/////////////////////////////////////////////////////////

### Choose Page
Users are prompted to select their login or signup type: Seller or Buyer.

### Seller Login Page
Upon successful authentication, sellers are directed to their home page where a JWT token is generated. 
If the password entered is incorrect, an error message is displayed. If the email used for signup already exists, a corresponding message is shown.

### Seller Home Page
Sellers are greeted with a "Post Ad" section where they can input basic property details. Additionally, 
the home page showcases a "Properties" section containing all ads posted by the seller. A "Logout" button allows users to return to the login selection page.

### Seller Properties Page
This page exhibits all ads posted by the seller in a complex grid format utilizing Material UI. 
Each ad is accompanied by an image, area, and plot details.

### Seller Ad Page
Sellers can preview their ads as they would appear to buyers. Additionally, they can view information about interested buyers.

### Buyer Home Page
Buyers can view all properties listed by various sellers. They have the option to filter properties by price (ascending or descending) and by budget range.
Clicking "I'm Interested" reveals the seller's details.

### Buyer Ad Page
Featuring a Material UI carousel, the buyer adpage automatically slides through images of the property.



////////////////////////////////////////////////////////////

Note: Please ensure that the seller uploads multiple images of the property.