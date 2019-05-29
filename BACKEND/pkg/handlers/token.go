package handlers

import (
	"errors"
	"net/http"

	_ "github.com/go-sql-driver/mysql"

	"github.com/antonioofdz/hmisProject/pkg/database"
)

func CheckToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("token")
		existTokenBD, err := checkTokenBD(token)
		if err != nil {
			http.Error(w, "{error: invalid token}", http.StatusUnauthorized)
			return
		}

		if !checkValidGuidRegExp(token) || !existTokenBD {
			http.Error(w, "{error: invalid token}", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func checkTokenBD(token string) (bool, error) {
	sqlCheckTokenBD := "SELECT count(*) from users WHERE token=?"
	db, err := database.Open()
	if err != nil {
		return false, errors.New("error opening the database")
	}
	defer db.Close()

	count := 0
	err = db.QueryRow(sqlCheckTokenBD, token).Scan(&count)
	if err != nil {
		return false, errors.New("error executing query")
	}

	return count > 0, nil
}
