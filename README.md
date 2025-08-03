# Wallie

Wallie is a small little personal project that lets you save images from multiple sources in one place, without needing to make separate albums or libraries on different websites. Just copy the image address, save it on Wallie, and it’ll keep your curated list of images all together

## Tech Stack

- Node.js + Express
- EJS
- MongoDB Atlas with Mongoose

## What it can do

- found a cool image on Reddit or Discord? Just copy the link and Wallie remembers it for you.
- no need to juggle through different websites or albums
- inbuilt download button to make life easier
- stored online on MongoDB Atlas to be accessed from any of your devices

## Setup Instructions
You have two options to use Wallie:

- **Use the live online version** — simply open the deployed app URL to start saving images right away. You can share this link with others, but keep in mind that all users access the same shared database. Since this project was designed for personal use, I didn’t include a multi-user system.

- **Run your own instance** — clone this repo and create your own MongoDB database. Add your connection string to a `.env` file as `MONGO_URI` for a private & exclusive space to save your images. (There's no need to make collections manually in your database. Mongoose will auto create all necessary collections in your database on the first run)

Steps to run locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/ArnavSaikia/wallie.git
   cd wallie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Open your browser at `http://localhost:3000`

## Notes

- images can only be saved by their image url. local images and drag and drop are not supported.

- most images uploaded should show up properly. however some sites may enforce CORS or other restriction that may interfere with the image previews. the link would however still be stored in the database and can still be downloaded

-because this app doesn't have multi-user system, you might see unrelated images appear or disappear on the live deployment as others use the shared database.

---


IDK Licenses -- do whatever?