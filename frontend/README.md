# HMIS EXPO
----
**Login User**
----
  Realiza el login y, en caso de ser satisfactorio, retorna el accessToken del usuario.

* **URL**

  /login

* **Method:**

  `POST`
  
* **Data Body**

  Se pasará por el cuerpo de la petición un objeto del tipo:
  ```javascript
    {
        "Username" : "example_user",
        "Password" : "example_password"
    }
  ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"Token":"a01bb83c-7f5g-5321-93e9-0242ac120003"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

----
**Register User**
----
  Realiza el proceso de registro del usuario. ¿DEVUELVE LOS DATOS DEL PROPIO USER?

* **URL**

  /signin

* **Method:**

  `POST`
  
* **Data Body**

  Se pasará por el cuerpo de la petición un objeto del tipo:
  ```javascript
    {
        "Username" : "example_user",
        "Password" : "example_password",
        "Name" : "example_name",
        "Surname" : "example_surname",
        "Email" : "example_email"
    }
  ```

    La contraseña deberá cumplir las siguientes condiciones:
    - Minimo 8 caracteres
	- Al menos una letra mayúscula
	- Al menos una letra minucula
	- Al menos un dígito

* **Success Response:**

  * **Code:** 200 <br />
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Username Already exists" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

----
**GET User**
----
  Obtiene los datos básicos de un usuario.

* **URL**

  /user

* **Method:**

  `GET`
* **Data header:**
    **Content:** `{"Token":"a01bb83c-7f5g-5321-93e9-0242ac120003"}`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
     ```javascript
    {
        "Username" : "example_user",
        "Password" : "example_password",
        "Name" : "example_name",
        "Surname" : "example_surname",
        "Email" : "example_email"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
