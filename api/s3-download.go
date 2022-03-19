import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/s3"
    "github.com/aws/aws-sdk-go/service/s3/s3manager"
    
    "fmt"
    "os"
)

func exitErrorf(msg string, args ...interface{}) {
    fmt.Fprintf(os.Stderr, msg+"\n", args...)
    os.Exit(1)
}

if len(os.Args) != 3 {
    exitErrorf("Bucket and item names required\nUsage: %s bucket_name item_name",
        os.Args[0])
}

bucket := os.Args[1]
item := os.Args[2]

sess, _ := session.NewSession(&aws.Config{
    Region: aws.String("us-west-2")},
)

downloader := s3manager.NewDownloader(sess)

numBytes, err := downloader.Download(file,
    &s3.GetObjectInput{
        Bucket: aws.String(bucket),
        Key:    aws.String(item),
    })
if err != nil {
    exitErrorf("Unable to download item %q, %v", item, err)
}

fmt.Println("Downloaded", file.Name(), numBytes, "bytes")

