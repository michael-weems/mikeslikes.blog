docker build --rm -t mikeslikes-blog-api .
docker run --env-file=.env -p 8080:8080 mikeslikes-blog-api