package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lumaghg/dualis-crawler/crawler"
)

type MyEvent struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func HandleRequest(event MyEvent) (string, error) {
	start := time.Now()

	results, _ := crawler.GetDualisCrawlResults(event.Email, event.Password)
	fmt.Println(time.Since(start))
	fmt.Println(results)
	resultsBytes, err := json.Marshal(results)
	if err != nil {
		return "", err
	}
	return string(resultsBytes), nil
}

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/scrapedualis", func(c *gin.Context) {
		body, err := ioutil.ReadAll(c.Request.Body)
		if err != nil {
			c.JSON(400, gin.H{"err": err})
			return
		}
		var event MyEvent
		err = json.Unmarshal(body, &event)
		if err != nil {
			c.JSON(400, gin.H{"err": err})
			return
		}
		result, err := crawler.GetDualisCrawlResults(event.Email, event.Password)
		if err != nil {
			c.JSON(400, gin.H{"err": err})
			return
		}
		c.JSON(200, result)

	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
