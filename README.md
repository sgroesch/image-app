## Getting Started
```bash
npm install
# then
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Approximate Time
~3.5 hours over one day

## API Endpoints
- GET `/api/images` to get all images 
- GET `/api/images?q=test` to get all images whose file name have the search text (test in this example)
- POST `/api/images` to upload a single image
- GET `/api/images/[id]` to get single image using the id
- DELETE `/api/images/[id]` to delete single image using the id

## Decisions
- Using in memory storage for ease of setup and teardown and to avoid issues with old files when changing the image schema. The issue from this is that the images do not survive a server restart
- Routing structure uses Next.js's built in folder structure for the routes. Not as pretty or as easy to search for files but works out of the box with no extra set up


## Next steps
- Add error handling for images failing to upload or be deleted, including messages to the user
- Add real image verifying, currently only using the input field's validation. Could add actual type and size checks in the browser
- Add confirmation screen for deleting images
- Add display name and description field that can be added to the images and updated after upload
- Better storage using S3 (or similar) for the image and a database for the details
- Full size view of the image in a modal on click
- Thumbnails for the images in the grid view
- Adding testing for the different functionality