package routes

import (
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/antonioofdz/hmisProject/pkg/handlers"
	"github.com/antonioofdz/hmisProject/pkg/models"
)

func LoadRoutes() {
	router := mux.NewRouter()

	router.HandleFunc("/login", loginUserController).Methods("POST", "OPTIONS")
	router.HandleFunc("/signin", signInController).Methods("POST")
	router.HandleFunc("/user", updateUserController).Methods("POST")
	router.Handle("/user", handlers.CheckToken(http.HandlerFunc(getUserByTokenController))).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},           // All origins
		AllowedMethods: []string{"GET", "POST"}, // Allowing only get, just an example
	})

	log.Fatal(http.ListenAndServe(":5002", c.Handler(router)))
}

func updateUserController(w http.ResponseWriter, req *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")

	var userDB *models.User
	if err := json.NewDecoder(req.Body).Decode(&userDB); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Error Parsing BODY! [/user/login]"))
	}

	dataResult, err := handlers.UpdateUser(userDB)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Something bad happened! [/user]"))
	}

	json.NewEncoder(w).Encode(dataResult)
}

// Controlador para logear a un usuario
func loginUserController(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	var userDB *models.UserDBCredentials
	if err := json.NewDecoder(req.Body).Decode(&userDB); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Error Parsing BODY! [/user/login]"))
	}

	token, err := handlers.GetUserCredentials(userDB)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Something bad happened! [/user/login]"))
	}

	dataResult, err := handlers.GetUserUserByToken(token.Token)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Something bad happened! [/user]"))
	}

	json.NewEncoder(w).Encode(dataResult)
}

// Controlador que obtiene un usuario por su Token
func getUserByTokenController(w http.ResponseWriter, req *http.Request) {
	data, err := handlers.GetUserUserByToken(req.Header.Get("token"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Something bad happened! [/user]"))
	}

	json.NewEncoder(w).Encode(data)
}

// Controlador para dar de alta a un nuevo usuario
func signInController(w http.ResponseWriter, req *http.Request) {
	var signInUserDB *models.SignInUserDB
	if err := json.NewDecoder(req.Body).Decode(&signInUserDB); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Error Parsing BODY! [/signin]"))
	}

	err := handlers.SignInUser(signInUserDB)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Something bad happened! [/signin] \n" + err.Error()))
	}
	json.NewEncoder(w).Encode(http.StatusOK)
}
