package main

import (
	"fmt"

	di "github.com/AlgerDu/go-di/src"
)

func main() {
	container := di.New()
	app, err := di.Provider_GetService[string](container)
	if err != nil {
		panic(err)
	}
	fmt.Print(app)
}
