package handlers

import (
	"errors"
	"fmt"

	_ "github.com/go-sql-driver/mysql"

	"github.com/antonioofdz/hmisProject/pkg/models"

	"github.com/antonioofdz/hmisProject/pkg/database"
)

func UpdateUser(user *models.User) error {
	sql := `UPDATE users set email=?, name=?, surname=? where id=?`
	db, err := database.Open()
	if err != nil {
		return errors.New("error opening the database")
	}
	defer db.Close()

	dbPrepare, err := db.Prepare(sql)
	if err != nil {
		return errors.New("error executing query")
	}

	_, err = dbPrepare.Exec(&user.Name, &user.Email, &user.Surname, &user.Id)
	if err != nil {
		err = errors.New("CANNOT PREPARE STATMENT")
		return err
	}

	return nil
}

func DeleteUser(id int64) error {
	sql := `delete from users where id=?`
	db, err := database.Open()
	if err != nil {
		return errors.New("error opening the database")
	}
	defer db.Close()

	dbPrepare, err := db.Prepare(sql)
	if err != nil {
		return errors.New("error executing query")
	}

	_, err = dbPrepare.Exec(id)
	if err != nil {
		err = errors.New("CANNOT PREPARE STATMENT")
		return err
	}

	return nil
}

func GetUserCredentials(userCredentials *models.UserDBCredentials) (*models.UserDBToken, error) {
	sqlGetUserCredentials := `SELECT users.token 
							FROM users 
									inner join users_credentials on users_credentials.id_user = users.id 
							WHERE users_credentials.user=? and users_credentials.password=?`
	db, err := database.Open()
	if err != nil {
		return nil, errors.New("error opening the database")
	}
	defer db.Close()

	var userDB models.UserDBToken
	err = db.QueryRow(sqlGetUserCredentials, &userCredentials.Username, &userCredentials.Password).Scan(&userDB.Token)
	if err != nil {
		return nil, errors.New("error executing query")
	}

	return &userDB, nil
}

func GetUserUserById(id int64) (*models.UserDB, error) {
	sqlGetUserCredentials := `SELECT users.id, users.name, 
									 users.surname, users.email, users.token 
								FROM users WHERE id=?`
	db, err := database.Open()
	if err != nil {
		return nil, errors.New("error opening the database")
	}
	defer db.Close()

	var userDB models.UserDB
	err = db.QueryRow(sqlGetUserCredentials, id).Scan(&userDB.Id, &userDB.Name, &userDB.Surname, &userDB.Email, &userDB.Token)
	if err != nil {
		return nil, errors.New("error executing query")
	}

	return &userDB, nil
}

func GetUsers() ([]models.User, error) {
	sql := `SELECT users.id, users.name, 
									 users.surname, users.email FROM users`

	db, err := database.Open()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	var users []models.User
	rows, err := db.Query(sql)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var b models.User
		//if err := rows.Scan(&b.Id, &b.Model, &b.Address, &b.Lat, &b.Lon, &b.Booked, &b.DateRent, &b.DateReturn); err != nil {
		if err := rows.Scan(&b.Id, &b.Name, &b.Surname, &b.Email); err != nil {
			continue
		}
		users = append(users, b)
	}

	return users, nil
}

func GetUserUserByToken(token string) (*models.UserDB, error) {
	fmt.Println(token)
	sqlGetUserCredentials := `SELECT users.id, users.name, 
									 users.surname, users.email, users.token 
								FROM users WHERE token=?`
	db, err := database.Open()
	if err != nil {
		return nil, errors.New("error opening the database")
	}
	defer db.Close()

	var userDB models.UserDB
	err = db.QueryRow(sqlGetUserCredentials, token).Scan(&userDB.Id, &userDB.Name, &userDB.Surname, &userDB.Email, &userDB.Token)
	if err != nil {
		return nil, errors.New("error executing query")
	}

	return &userDB, nil
}

func SignInUser(signInUser *models.SignInUserDB) error {
	sqlCheckIfExistsUser := `SELECT count(*) from users_credentials where user = ?`
	if !checkValidPassword(signInUser.Password) {
		err := errors.New("INVALID PASSWORD")
		return err
	}

	db, err := database.Open()
	if err != nil {
		return err
	}
	defer db.Close()

	var countUsers int
	err = db.QueryRow(sqlCheckIfExistsUser, signInUser.Username).Scan(&countUsers)
	if err != nil {
		return err
	}

	if countUsers > 0 {
		err = errors.New("USERNAME ALREADY EXISTS")
		return err
	}

	return insertUser(signInUser)
}

func insertUser(signInUser *models.SignInUserDB) error {
	db, err := database.Open()
	if err != nil {
		return err
	}
	defer db.Close()

	sqlInsertUser := `INSERT INTO users (name, surname, email, token) VALUES (?, ?, ?, UUID());`
	stmt, err := db.Prepare(sqlInsertUser)
	if err != nil {
		err = errors.New("CANNOT PREPARE STATMENT")
		return err
	}

	data, err := stmt.Exec(signInUser.Username, signInUser.Surname, signInUser.Email)
	if err != nil {
		err = errors.New("CANNOT PREPARE STATMENT")
		return err
	}
	signInUser.Id, err = data.LastInsertId()
	if err != nil {
		err = errors.New("ERROR GETTING LAST ID INSERT")
		return err
	}

	sqlInsertUserCredentials := `INSERT INTO users_credentials (user, password, id_user) VALUES (?, ?, ?);`
	stmt, err = db.Prepare(sqlInsertUserCredentials)
	if err != nil {
		err = errors.New("CANNOT PREPARE STATMENT INSERT USER CREDENTIALS")
		return err
	}

	data, err = stmt.Exec(signInUser.Username, signInUser.Password, signInUser.Id)
	if err != nil {
		err = errors.New("CANNOT PREPARE STATMENT INSERT USER CREDENTIALS")
		return err
	}

	return nil
}
