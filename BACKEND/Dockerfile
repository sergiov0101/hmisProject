# Partimos de GOLANG 1.12
FROM golang:1.12

# Creamos una carpeta en el contenedor llamada "app"
RUN mkdir /app

# Indicamos que la carpeta "app" va a ser nuestro espacio de trabajo, por lo tanto
# no posicionamos dentro de ella
WORKDIR /app

# Copiamos todo lo que haya (incluido subdirectorios) en la ubicacion
# donde esté el dockerfile en la carpeta APP
COPY . .

# Ejecutamos los test del codigo que existan
RUN go test ./...
# Descargamos las dependencias e instalamos (creamos ejecutable) del programa
RUN go mod download && \
    go install ./cmd/hmis

# Exponemos la aplicación en el puerto 5002 
# (primer parametro el puerto a exponer fuera del contenedor y el segundo parametro el puerto en el que está expuesta en el contenedor)
EXPOSE 5002:5002

# Ahora, ejecutamos el compilado que hemos generado anteriormente con el comando go install ./cmd/hmis
CMD ["hmis"]

# Nota1: Los comandos que se ejecuten con RUN lo haran en tiempo de compilación
# Nota2: Los comandos que se ejecuten mediante CMD lo haran en tiempo de ejecución