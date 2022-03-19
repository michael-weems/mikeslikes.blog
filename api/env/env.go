package env

import (
	"log"

	"github.com/joho/godotenv"
)

func SetEnvironment() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}
}
