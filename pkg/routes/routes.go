package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/antonioofdz/hmisProject/pkg/handlers"
	"github.com/antonioofdz/hmisProject/pkg/models"
)

func LoadRoutes() {
	router := mux.NewRouter()

	router.HandleFunc("/login", loginUserController).Methods("POST")
	router.HandleFunc("/user", signInController).Methods("PUT")
	router.HandleFunc("/user", updateUserController).Methods("POST")
	router.HandleFunc("/user/{id}", getUserController).Methods("GET")
	router.HandleFunc("/user", getUsersController).Methods("GET")
	router.HandleFunc("/user", deleteUserController).Methods("DELETE")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST"},
	})

	log.Fatal(http.ListenAndServe(":5002", c.Handler(router)))
}

func getUserController(w http.ResponseWriter, req *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(req)
	idHeader := params["id"]
	fmt.Println("IDHEADER" + idHeader)
	if idHeader == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("CANT FIND ID PARAMETER IN QUERY"))
	}

	id, err := strconv.ParseInt(idHeader, 10, 64)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("ID PARAMTER WITH BAD FORMAT"))
	}

	data, err := handlers.GetUserUserById(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Something bad happened! [/user]"))
	}

	json.NewEncoder(w).Encode(data)
}

func getUsersController(w http.ResponseWriter, req *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")

	data, err := handlers.GetUsers()
	if err != nil {
		fmt.Print(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Something bad happened! [/user]"))
	}

	json.NewEncoder(w).Encode(data)
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

	if err := handlers.UpdateUser(userDB); err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Something bad happened! [/user]"))
	}
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

func deleteUserController(w http.ResponseWriter, req *http.Request) {
	var user *models.UserBasic
	if err := json.NewDecoder(req.Body).Decode(&user); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Error Parsing BODY! [/signin]"))
	}

	err := handlers.DeleteUser(user.Id)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Something bad happened! [/signin] \n" + err.Error()))
	}
	json.NewEncoder(w).Encode(http.StatusOK)
}
