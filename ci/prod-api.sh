cd ../api
docker build --rm -t mikeslikes-blog-api . 
docker run -p 8080:8080 mikeslikes-blog-api