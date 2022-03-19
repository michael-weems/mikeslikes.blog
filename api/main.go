package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"

	"github.com/gin-gonic/gin"
	"github.com/sahilm/fuzzy"

	c "github.com/weems/mikeslikes-blog/config"

	"github.com/spf13/viper"
)

func main() {
	// Set the file name of the configurations file
	viper.SetConfigName("config")

	// Set the path to look for the configurations file
	viper.AddConfigPath(".")

	// Enable VIPER to read Environment Variables
	viper.AutomaticEnv()

	viper.SetConfigType("yml")
	var configuration c.Configurations

	if err := viper.ReadInConfig(); err != nil {
		fmt.Printf("Error reading config file, %s", err)
	}

	// Set undefined variables
	viper.SetDefault("database.dbname", "test_db")

	err := viper.Unmarshal(&configuration)
	if err != nil {
		fmt.Printf("Unable to decode into struct, %v", err)
	}

	fmt.Println("S3 ", configuration.S3.Region)

	posts := memoizedPosts()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/posts", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"posts": posts(),
		})
	})
	r.GET("/search", func(c *gin.Context) {
		query := c.Request.URL.Query()["query"]

		c.JSON(200, gin.H{
			"posts": fuzzy.Find(query[0], posts()),
		})
	})
	r.GET("/article-html", func(c *gin.Context) {
		article := c.Request.URL.Query()["article"][0]

		c.JSON(200, gin.H{
			"article": string(getArticle(article)),
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func getArticle(article string) []byte {
	// Directory we want to get all files from.
	md, err := ioutil.ReadFile("../posts/" + article + ".md")
	if err != nil {
		log.Fatal(err)
	}

	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	return markdown.ToHTML(md, nil, renderer)
}

type FuncPosts func() []string

func memoizedPosts() FuncPosts {
	cache := []string{}
	return func() []string {
		if len(cache) != 0 {
			return cache
		}
		// Directory we want to get all files from.
		directory := "../posts"

		// Open the directory.
		outputDirRead, _ := os.Open(directory)

		// Call Readdir to get all files.
		outputDirFiles, _ := outputDirRead.Readdir(0)

		// Loop over files.
		for outputIndex := range outputDirFiles {
			outputFileHere := outputDirFiles[outputIndex]
			name := strings.ReplaceAll(outputFileHere.Name(), ".md", "")

			cache = append(cache, name)
		}
		return cache
	}
}

func contains(needle int, haystack []int) bool {
	for _, i := range haystack {
		if needle == i {
			return true
		}
	}
	return false
}
