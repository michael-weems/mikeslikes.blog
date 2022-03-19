package config

type Configuration struct {
	S3 S3Configuration
}

type S3Configuration struct {
	Bucket          string
	Region          string
	UserId          string
	AccessKeyId     string
	SecretAccessKey string
}
