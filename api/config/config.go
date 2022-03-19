package config

import (
	"fmt"

	"github.com/tkanos/gonfig"
)

type Configuration struct {
	S3 S3Configuration
}

type S3Configuration struct {
	Bucket string
	UserId string
}

func GetConfig(params ...string) Configuration {
	configuration := Configuration{}
	env := "dev"
	if len(params) > 0 {
		env = params[0]
	}
	fileName := fmt.Sprintf("./%s_config.json", env)
	gonfig.GetConf(fileName, &configuration)
	return configuration
}
